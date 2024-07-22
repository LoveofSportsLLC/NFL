import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { fileURLToPath } from 'url';
import path from 'path';
import { log } from './src/utils/logs.js';
import dotenv from 'dotenv';
import mime from 'mime-types';
import {
  baseURL,
  newsApiKey,
  HIGHLIGHTS_API_URL,
  INJURIES_API_URL,
  LATEST_NEWS_API_URL,
  YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_ID,
  domain,
  clientId,
  audience,
  YOUTUBE_CLIENT_ID,
  AZURE_ML_ENDPOINT,
  secret,
  issuerBaseURL,
  VITE_APP_INSIGHTS_CONNECTION_STRING,
  VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
} from './src/config.js';

dotenv.config();

log('Configuration Values:');
log('baseURL:', baseURL);
log('newsApiKey:', newsApiKey);
log('HIGHLIGHTS_API_URL:', HIGHLIGHTS_API_URL);
log('INJURIES_API_URL:', INJURIES_API_URL);
log('LATEST_NEWS_API_URL:', LATEST_NEWS_API_URL);
log('YOUTUBE_API_KEY:', YOUTUBE_API_KEY);
log('YOUTUBE_CHANNEL_ID:', YOUTUBE_CHANNEL_ID);
log('domain:', domain);
log('clientId:', clientId);
log('audience:', audience);
log('YOUTUBE_CLIENT_ID:', YOUTUBE_CLIENT_ID);
log('AZURE_ML_ENDPOINT:', AZURE_ML_ENDPOINT);
log('secret:', secret);
log('issuerBaseURL:', issuerBaseURL);
log(
  'VITE_APP_INSIGHTS_CONNECTION_STRING:',
  VITE_APP_INSIGHTS_CONNECTION_STRING,
);
log(
  'VITE_APP_INSIGHTS_INSTRUMENTATION_KEY:',
  VITE_APP_INSIGHTS_INSTRUMENTATION_KEY,
);

const __dirname = fileURLToPath(new URL('.', import.meta.url));

log('Server.js', 'Running Server.js script');

const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.IN_DOCKER === 'true'; // Check if running in Docker
const port = process.env.PORT || 3000;
const base = process.env.BASE || './';
const ABORT_DELAY = 10000;
// Define base paths dynamically based on the environment
const distBasePath = isInDocker ? '/app/dist' : path.join(__dirname, 'dist');
const publicBasePath = isInDocker ? '/app/public' : path.join(__dirname, 'public');

let templateHtml = '';
let ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.readFile(
      path.join(distBasePath, 'client/index.html'),
      'utf-8',
    );
    ssrManifest = JSON.parse(
      await fs.readFile(
        path.join(distBasePath, 'client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
  } catch (error) {
    log('Server.js', 'Error loading production files:', error);
  }
}

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/log', (req, res) => {
  const { fileName, functionName, messages, logCount } = req.body;
  console.log(
    `[LOG] [${fileName}:${functionName}] ${messages.join(' ')} (Log Count: ${logCount}) [CLIENT]`,
  );
  res.sendStatus(200);
});

// Middleware to handle correct MIME types
app.use((req, res, next) => {
  const ext = path.extname(req.url);
  const mimeType = mime.lookup(ext);
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  log(`[MIME TYPE] [${req.method}] ${req.url} - ${mimeType}`);
  next();
});

// Middleware to serve static files from the 'public' directory
app.use('/public', express.static(publicBasePath));

// Middleware to serve static files from the 'dist/client' directory
app.use(express.static(path.join(distBasePath, 'client')));

app.get('/', (req, res) => {
  res.redirect(baseURL);
});

// Log all incoming requests
app.use((req, res, next) => {
  log(`[LOG] [${req.method}] ${req.url}`);
  next();
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

  // Serve the main index.html for all routes except /api
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/client', 'index.html'), (err) => {
      if (err) {
        log(`Error sending index.html: ${err}`);
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
        log('Server.js', 'onShellReady called');
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
          log('Server.js', 'HTML fully sent');
          res.end(htmlEnd);
        });

        pipe(transformStream);
      };

      const onShellError = () => {
        log('Server.js', 'onShellError called');
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>Something went wrong</h1>');
      };

      const onError = (error) => {
        didError = true;
        log('Server.js', 'Render error:', error);
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
        log('Server.js', 'Server rendered HTML fully sent');
      });

      pipe(htmlStream);

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      log('Server.js', e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    log('Server.js', `Server started at http://localhost:${port}`);
  });
}

setupServer();
