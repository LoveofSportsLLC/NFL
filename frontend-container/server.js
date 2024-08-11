import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mime from 'mime-types';
import { log } from './src/utils/logs.js'; // Import the log function

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.IN_DOCKER === 'true';
const port = process.env.PORT || 3000;
const base = process.env.BASE || './';
const ABORT_DELAY = 10000;

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// log('Server.js', 'Configuration Values:', '', {
//   baseURL: process.env.BASE_URL,
//   newsApiKey: process.env.NEWS_API_KEY,
//   HIGHLIGHTS_API_URL: process.env.HIGHLIGHTS_API_URL,
//   INJURIES_API_URL: process.env.INJURIES_API_URL,
//   LATEST_NEWS_API_URL: process.env.LATEST_NEWS_API_URL,
//   YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
//   YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID,
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   audience: process.env.API_AUDIENCE,
//   YOUTUBE_CLIENT_ID: process.env.YOUTUBE_CLIENT_ID,
//   AZURE_ML_ENDPOINT: process.env.AZURE_ML_ENDPOINT,
//   secret: process.env.AUTH0_SECRET,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
//   VITE_APP_INSIGHTS_CONNECTION_STRING:
//     process.env.VITE_APP_INSIGHTS_CONNECTION_STRING,
//   VITE_APP_INSIGHTS_INSTRUMENTATION_KEY:
//     process.env.VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
// });

// log('Server.js', 'Running Server.js script', '');

// Environment checks
const isSSR = process.env.SSR === 'true';
const isServer = typeof process !== 'undefined' && process.env.NODE_ENV;
const isLocal =
  isServer &&
  (process.env.GIT_WORKFLOW === '0' || process.env.DOCKER_ENV === 'false');
const isCluster = isServer && process.env.GIT_WORKFLOW === '1';

// if (isServer) {
//   if (isLocal) {
//     log('', 'Running in local server environment (isLocal).', '');
//   } else if (isCluster) {
//     log('', 'Running in cluster server environment (isCluster).', '');
//   } else {
//     log('', 'Running in unknown server environment.', '');
//   }
// } else {
//   log('', 'Running in client environment (browser).', '');
// }

let templateHtml = '';
let ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.readFile(
      path.join(__dirname, 'dist/client/index.html'),
      'utf-8',
    );
    ssrManifest = JSON.parse(
      await fs.readFile(
        path.join(__dirname, 'dist/client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
  } catch (error) {
    log('Server.js', 'Error loading production files:', '', error);
    process.exit(1);
  }
}

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  const ext = path.extname(req.url);
  const mimeType = mime.lookup(ext);
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'dist/client')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  log('Server.js', 'Incoming request', '/');
  res.redirect(baseURL);
});

app.use((req, res, next) => {
  log('Server.js', 'Incoming request', req.url);
  next();
});

app.post('/log', (req, res) => {
  console.log('Received log:', req.body);
  const { fileName, functionName, messages, logCount, logType } = req.body;
  log(fileName, functionName, '', ...messages);
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  log('Server.js', 'Unhandled error:', '', err);
  res.status(500).send('Internal Server Error');
});

async function setupServer() {
  let vite;
  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: 'ssr' },
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(
      base,
      sirv('./dist/client', {
        extensions: ['html', 'js', 'css', 'png', 'jpg', 'jpeg', 'svg'],
      }),
    );
  }

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/client/index.html'), (err) => {
      if (err) {
        log('Server.js', 'Error sending index.html:', '', err);
        res.status(500).send('Server Error');
      }
    });
  });

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template;
      let render;
      const initialData = {};

      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      let didError = false;

      const onShellReady = (pipe) => {
        log('Server.js', 'onShellReady called', '');
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
        const initialStateScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`;

        res.write(htmlStart + initialStateScript);

        transformStream.on('finish', () => {
          log('Server.js', 'HTML fully sent', '');
          res.end(htmlEnd);
        });

        pipe(transformStream);
      };

      const onShellError = () => {
        log('Server.js', 'onShellError called', '');
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>Something went wrong</h1>');
      };

      const onError = (error) => {
        didError = true;
        log('Server.js', 'Render error:', '', error);
      };

      const { pipe, abort } = render(
        url,
        ssrManifest,
        onShellReady,
        onShellError,
        onError,
        initialData,
      );

      const htmlStream = new Transform({
        transform(chunk, encoding, callback) {
          callback(null, chunk);
        },
      });

      htmlStream.on('finish', () => {
        log('Server.js', 'Server rendered HTML fully sent', '');
      });

      pipe(htmlStream);

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      log('Server.js', e.stack, '');
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    log('Server.js', `Server started at http://localhost:${port}`, '');
  });
}

setupServer();
