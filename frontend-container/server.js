import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { log } from './src/utils/logs.js';
import dotenv from 'dotenv';
import pkg from 'express-openid-connect';
import mime from 'mime-types';
import * as config from './src/config.js';
import logger from './src/utils/logger.js'; // Import the log function

const { auth, requiresAuth } = pkg;

dotenv.config();

logger.debug('VITE_AUTH0_ISSUER_BASE_URL:', config.issuerBaseURL);
logger.debug('VITE_AUTH0_CLIENT_ID:', config.clientId);
logger.debug('VITE_AUTH0_SECRET:', config.secret);
logger.debug('AUTH0_CLIENT_ID:', config.clientId);
logger.debug('AUTH0_SECRET:', config.secret);
logger.debug('BASE_URL:', config.baseURL);
logger.debug('All environment variables:', process.env);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

const __dirname = fileURLToPath(new URL('.', import.meta.url));

logger.debug('Server.js', 'Running Server.js script');

let templateHtml = '';
let ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
    ssrManifest = JSON.parse(
      await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8'),
    );
  } catch (error) {
    logger.debug('Server.js', 'Error loading production files:', error);
  }
}

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/log', (req, res) => {
  logger.debug('Received log:', req.body);
  const { fileName, functionName, messages, logCount, logType } = req.body;
  logger.debug(fileName, functionName, '', ...messages);
  res.sendStatus(200);
});

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: config.secret,
  baseURL: config.baseURL,
  clientID: config.clientId,
  issuerBaseURL: config.issuerBaseURL,
  authorizationParams: {
    redirect_uri: config.baseURL + '/dashboard/default',
  },
};
logger.debug('Auth0 Config - authRequired:', authConfig.authRequired);
logger.debug('Auth0 Config - auth0Logout:', authConfig.auth0Logout);
logger.debug('Auth0 Config - secret:', authConfig.secret);
logger.debug('Auth0 Config - baseURL:', authConfig.baseURL);
logger.debug('Auth0 Config - clientID:', authConfig.clientID);
logger.debug('Auth0 Config - issuerBaseURL:', authConfig.issuerBaseURL);
logger.debug(
  'Auth0 Config - authorizationParams.response_mode:',
  authConfig.authorizationParams.response_mode,
);
logger.debug(
  'Auth0 Config - authorizationParams.redirect_uri:',
  authConfig.authorizationParams.redirect_uri,
);

app.use(auth(authConfig));

// Middleware to handle correct MIME types
app.use((req, res, next) => {
  const ext = path.extname(req.url);
  const mimeType = mime.lookup(ext);
  if (mimeType) {
    res.setHeader('Content-Type', mimeType);
  }
  next();
});

// Middleware to serve static files
app.use(
  '/src/assets/img',
  express.static(path.join(__dirname, 'src/assets/img')),
);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect('/dashboard/default');
  } else {
    res.redirect(config.baseURL);
  }
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
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
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/client', 'index.html'));
  });

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');

      let template;
      let render;
      const initialData = {
        user: req.oidc.user || null,
        authConfig: authConfig,
      };

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
        logger.debug('Server.js', 'onShellReady called');
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
          logger.debug('Server.js', 'HTML fully sent');
          res.end(htmlEnd);
        });

        pipe(transformStream);
      };

      const onShellError = () => {
        logger.debug('Server.js', 'onShellError called');
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>Something went wrong</h1>');
      };

      const onError = (error) => {
        didError = true;
        logger.debug('Server.js', 'Render error:', error);
      };

      const { pipe, abort } = render(
        url,
        ssrManifest,
        onShellReady,
        onShellError,
        onError,
        initialData,
      );

      // Log the server-rendered HTML chunk
      const htmlStream = new Transform({
        transform(chunk, encoding, callback) {
          logger.debug(
            'Server.js',
            'Server rendered HTML chunk:',
            chunk.toString().slice(0, 500) + '...[truncated]',
          );
          callback(null, chunk);
        },
      });

      htmlStream.on('finish', () => {
        logger.debug('Server.js', 'Server rendered HTML fully sent');
      });

      pipe(htmlStream);

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      logger.debug('Server.js', e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    logger.debug('Server.js', `Server started at http://localhost:${port}`);
  });
}

setupServer();
