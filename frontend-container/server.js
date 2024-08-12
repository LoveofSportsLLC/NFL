// server.js
import fs from 'node:fs';
import express from 'express';
import { Transform } from 'node:stream';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';
import mime from 'mime-types';
import logger from './src/utils/logger.js'; // Import the log function

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.DOCKER_ENV === 'true';
const port = process.env.PORT || 3000;
const base = process.env.BASE || './';
const ABORT_DELAY = 10000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// logger.debug('Server.js', 'Configuration Values:', '', {
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

logger.debug('Server.js', 'Running Server.js script', '');

const isSSR =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.SSR
    : process.env.SSR === 'true';

const isLocal =
  isSSR &&
  (process.env.GIT_WORKFLOW === '0' || process.env.DOCKER_ENV === 'false');
const isCluster = isSSR && process.env.GIT_WORKFLOW === '1';

if (isSSR) {
  if (isLocal) {
    logger.debug('', 'Running in local server environment (isLocal).', '');
  } else if (isCluster) {
    logger.debug('', 'Running in cluster server environment (isCluster).', '');
  } else {
    logger.debug('', 'Running in unknown server environment.', '');
  }
} else {
  logger.debug('', 'Running in client environment (browser).', '');
}

// Dynamic imports for server-specific modules
let dns, tls, net;
if (typeof window === 'undefined') {
  dns = await import('dns');
  tls = await import('tls');
  net = await import('net');
}

let templateHtml = '';
let ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.promises.readFile(
      path.join(__dirname, 'dist/client/index.html'),
      'utf-8',
    );
    ssrManifest = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, 'dist/client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
    logger.debug('Server.js', 'Loaded production files', '', {
      templateHtmlLength: templateHtml.length,
      ssrManifestKeys: Object.keys(ssrManifest),
    });
  } catch (error) {
    logger.debug('Server.js', 'Error loading production files:', '', error);
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
  logger.debug('Server.js', 'Incoming request', '/');
  res.redirect(base);
});

app.use((req, res, next) => {
  logger.debug('Server.js', 'Incoming request', req.url);
  next();
});

app.post('/log', (req, res) => {
  logger.debug('Received log:', req.body);
  const { fileName, functionName, messages, logCount, logType } = req.body;
  logger.debug(fileName, functionName, '', ...messages);
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  logger.debug('Server.js', 'Unhandled error:', '', err);
  res.status(500).send('Internal Server Error');
});

async function setupServer() {
  try {
    let vite;
    if (!isProduction) {
      const { createServer } = await import('vite');
      vite = await createServer({
        server: { middlewareMode: 'ssr' },
        base,
        appType: 'custom',
      });
      app.use(vite.middlewares);
      logger.debug('Server.js', 'Vite server created in SSR mode', '');
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
      logger.debug('Server.js', 'Compression and Sirv middleware added', '');
    }

    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/client/index.html'), (err) => {
        if (err) {
          logger.debug('Server.js', 'Error sending index.html:', '', err);
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
          template = await fs.promises.readFile('./index.html', 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
          logger.debug(
            'Server.js',
            'Loaded index.html and SSR module in dev mode',
            '',
            {
              templateLength: template.length,
            },
          );
        } else {
          template = templateHtml;
          render = (await import('./dist/server/entry-server.js')).render;
          logger.debug(
            'Server.js',
            'Loaded template and SSR module in production mode',
            '',
            {
              templateLength: template.length,
            },
          );
        }

        let didError = false;

        const onShellReady = (pipe) => {
          logger.debug('Server.js', 'onShellReady called', '');
          res.status(didError ? 500 : 200);
          res.set({ 'Content-Type': 'text/html' });

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              callback(null, chunk);
            },
          });

          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
          const initialStateScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(
            initialData,
          )}</script>`;

          res.write(htmlStart + initialStateScript);

          transformStream.on('finish', () => {
            logger.debug('Server.js', 'HTML fully sent', '');
            res.end(htmlEnd);
          });

          pipe(transformStream);
        };

        const onShellError = () => {
          logger.debug('Server.js', 'onShellError called', '');
          res.status(500);
          res.set({ 'Content-Type': 'text/html' });
          res.send('<h1>Something went wrong</h1>');
        };

        const onError = (error) => {
          didError = true;
          logger.debug('Server.js', 'Render error:', '', error);
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
          logger.debug('Server.js', 'Server rendered HTML fully sent', '');
        });

        pipe(htmlStream);

        setTimeout(() => {
          abort();
        }, ABORT_DELAY);
      } catch (e) {
        if (vite) {
          vite.ssrFixStacktrace(e);
        }
        logger.debug('Server.js', e.stack, '');
        res.status(500).end(e.stack);
      }
    });

    app.listen(port, () => {
      logger.debug(
        'Server.js',
        `Server started at http://localhost:${port}`,
        '',
      );
    });
  } catch (error) {
    logger.debug('Server.js', 'Error setting up server:', '', error);
    process.exit(1);
  }
}

setupServer().catch((error) => {
  logger.debug('Server.js', 'Error setting up server:', '', error);
  process.exit(1);
});
