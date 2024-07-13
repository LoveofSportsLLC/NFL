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

const { auth, requiresAuth } = pkg;

dotenv.config();

log('VITE_AUTH0_ISSUER_BASE_URL:', config.issuerBaseURL);
log('VITE_AUTH0_CLIENT_ID:', config.clientId);
log('VITE_AUTH0_SECRET:', config.secret);
log('AUTH0_CLIENT_ID:', config.clientId);
log('AUTH0_SECRET:', config.secret);
log('BASE_URL:', config.baseURL);
log('All environment variables:', process.env);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

const __dirname = fileURLToPath(new URL('.', import.meta.url));

log('Server.js', 'Running Server.js script');

let templateHtml = '';
let ssrManifest;

if (isProduction) {
  try {
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
    ssrManifest = JSON.parse(
      await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8'),
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
log('Auth0 Config - authRequired:', authConfig.authRequired);
log('Auth0 Config - auth0Logout:', authConfig.auth0Logout);
log('Auth0 Config - secret:', authConfig.secret);
log('Auth0 Config - baseURL:', authConfig.baseURL);
log('Auth0 Config - clientID:', authConfig.clientID);
log('Auth0 Config - issuerBaseURL:', authConfig.issuerBaseURL);
log(
  'Auth0 Config - authorizationParams.response_mode:',
  authConfig.authorizationParams.response_mode,
);
log(
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

      // Log the server-rendered HTML chunk
      const htmlStream = new Transform({
        transform(chunk, encoding, callback) {
          log(
            'Server.js',
            'Server rendered HTML chunk:',
            chunk.toString().slice(0, 500) + '...[truncated]',
          );
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
