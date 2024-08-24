import fs from 'node:fs';
import express from 'express';
import { Transform } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import compression from 'compression';
import sirv from 'sirv';
import mime from 'mime';
import axios from 'axios';

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.DOCKER_ENV === 'true';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';
console.log(base);
const ABORT_DELAY = 10000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = isInDocker ? '/app' : __dirname; // Use rootPath as determined by the environment
const isSSR =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.SSR
    : process.env.SSR === 'true';
const isLocal =
  isSSR &&
  (process.env.GIT_WORKFLOW === '0' || process.env.DOCKER_ENV === 'false');
const isCluster = isSSR && process.env.GIT_WORKFLOW === '1';
console.log('Server.js', 'Running Server.js script', '');
const sirvOptions = {
  dev: !isProduction,
  etag: isProduction,
  maxAge: isProduction ? 31536000 : 0, // 1 year in production, 0 in development
  immutable: isProduction,
};
console.log(
  'Path to template HTML:',
  path.resolve(rootPath, './dist/client/index.html'),
);
console.log(
  'Path to SSR manifest:',
  path.resolve(rootPath, './dist/client/.vite/ssr-manifest.json'),
);

let templateHtml;

async function startServer() {
  console.log('Server.js', 'Starting server...');
  // Load template HTML and SSR manifest
  // Use rootPath when constructing paths for template HTML and SSR manifest
  try {
    templateHtml = await fs.promises.readFile(
      path.resolve(rootPath, './dist/client/index.html'),
      'utf-8',
    );
    const ssrManifest = JSON.parse(
      await fs.promises.readFile(
        path.resolve(rootPath, './dist/client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
    console.log('Server.js', 'Loaded template HTML and SSR manifest');
  } catch (err) {
    console.error('Error loading template HTML or SSR manifest:', err);
    return;
  }

  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());

  // Serve static files using sirv
  app.use('/public', express.static(path.join(rootPath, 'public'))); // Updated to use rootPath
  app.use(
    sirv(path.resolve(rootPath, 'dist/client'), {
      dev: !isProduction,
      maxAge: isProduction ? 31536000 : 0,
      immutable: isProduction,
      etag: isProduction,
      setHeaders: (res, pathname) => {
        if (pathname.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      },
    }),
  );

  // Middleware for MIME type handling
  const setCorrectMimeType = (req, res) => {
    const ext = path.extname(req.url);
    const mimeType = mime.getType(ext); // Get the correct MIME type for the extension
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
      console.log(`Set MIME type for ${req.url} as ${mimeType}`);
    }
  };

  app.use((req, res, next) => {
    setCorrectMimeType(req, res);
    next();
  });

  // ROUTE LOGGER
  app.use((req, res, next) => {
    console.log('Server.js', 'Incoming request', req.url);
    next();
  });

  // ROUTE /
  app.get('/', (req, res) => {
    console.log('Server.js', 'Incoming request', '/');
    res.redirect(base);
  });

  // ROUTE /LOG
  app.post('/log', (req, res) => {
    console.log('Received log:', req.body);
    const { fileName, functionName, messages } = req.body;
    console.log(fileName, functionName, '', ...messages);
    res.sendStatus(200);
  });

  // ROUTES /API/*
  app.get('/api/*', (req, res) => {
    res.json({ message: 'API response' });
  });

  // ROUTE /API/GAME/:GAMEID
  app.get('/api/game/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const apiKey = process.env.SPORTRADAR_API_KEY;
    const url = `https://api.sportradar.us/nfl/official/trial/v7/en/games/${gameId}/timeline.json?api_key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const gameData = response.data.timeline.map((event) => ({
        time: event.clock,
        momentum: event.momentum,
        score: `${event.home_points}-${event.away_points}`,
        play: event.description,
        keyPlayer: event.keyPlayer,
        gameContext: {
          down: event.down,
          distance: event.distance,
          redZone: event.redZone,
        },
      }));
      res.json(gameData);
    } catch (error) {
      console.error('Error fetching game data:', error);
      res.status(500).json({ error: 'Failed to fetch game data' });
    }
  });

  // ROUTE /NON API ROUTE
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(rootPath, 'dist/client/index.html'), (err) => {
      // Updated to use rootPath
      if (err) {
        console.log('Server.js', 'Error sending index.html:', '', err);
        res.status(500).send('Server Error');
      }
    });
  });

  // Serve HTML in CATCHALL ROUTE
  app.use('*', async (req, res) => {
    const isApiRequest = req.path.startsWith('/api');
    if (!isApiRequest) {
      // Render application or serve index.html
      res.sendFile(path.resolve(rootPath, 'dist/client/index.html')); // Updated to use rootPath
    } else {
      res.status(404).send('API route not found'); // Handle API route not found
    }
    try {
      const url = req.originalUrl.replace(base, '');
      let initialData = {};
      const template = templateHtml; 
      const { render } = await import(
        path.resolve(rootPath, 'dist/server/entry-server.js')
      ).then((mod) => mod.render);
      console.log(
        'Server.js',
        'Loaded template and SSR module in production mode',
        '',
        { templateLength: template.length },
      );
      let didError = false;

      const onShellReady = (pipe) => {
        console.log('Server.js', 'onShellReady called', '');
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
          console.log('Server.js', 'HTML fully sent', '');
          res.end(htmlEnd);
        });

        pipe(transformStream);
      };

      const onShellError = () => {
        console.log('Server.js', 'onShellError called', '');
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>Something went wrong</h1>');
      };

      const onError = (error) => {
        didError = true;
        console.log('Server.js', 'Render error:', '', error);
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
        console.log('Server.js', 'Server rendered HTML fully sent', '');
      });

      pipe(htmlStream);

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

// Invoke the function to start the server
startServer();