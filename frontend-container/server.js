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
const isLocal =  process.env.GIT_WORKFLOW === '0' 
const isCluster = process.env.GIT_WORKFLOW === '1';


console.log('Server.js', 'Running Server.js script', '');
console.log('Environment Info:', {
  isProduction,
  isInDocker,
  isSSR,
  isLocal,
  isCluster,
} );

console.log(
  'Path to template HTML:',
  path.resolve(rootPath, './dist/client/index.html'),
);
console.log(
  'Path to SSR manifest:',
  path.resolve(rootPath, './dist/client/.vite/ssr-manifest.json'),
);

async function startServer() {
  console.log('Server.js', 'Starting server...');
  let ssrManifest;
  let templateHtml;
  // Load template HTML and SSR manifest
  // Use rootPath when constructing paths for template HTML and SSR manifest
  try {
    console.log('Server.js', 'Loading template HTML...');
    templateHtml = await fs.promises.readFile(
      path.resolve(rootPath, './dist/client/index.html'),
      'utf-8',
    );
    console.log('Server.js', 'Template HTML loaded successfully');

    console.log('Server.js', 'Loading SSR manifest...');
    ssrManifest = JSON.parse(
      await fs.promises.readFile(
        path.resolve(rootPath, './dist/client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
    console.log('Server.js', 'SSR manifest loaded successfully');

    console.log('Server.js', 'Loaded template HTML and SSR manifest');
  } catch (err) {
    console.error('Error loading template HTML or SSR manifest:', err);
    return;
  }

  // Initialize Express app
  const app = express();

  // Middleware for JSON and URL-encoded payloads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Middleware for compression
  app.use(compression());

  // Serve static files from the public directory
  app.use(express.static(path.join(rootPath, 'public')));
  console.log(
    'Server.js',
    'Express app configured with JSON, URL encoding, and compression',
  );

  // Import and configure sirv to serve static files
  console.log('Server.js', 'Serving static files from public directory');

  // Serve static files from dist/client using sirv
  app.use(
    sirv(path.resolve(rootPath, 'dist/client'), {
      dev: !isProduction,
      maxAge: isProduction ? 31536000 : 0, // Cache for 1 year in production
      immutable: isProduction, // Cache-control header: immutable
      etag: isProduction, // Use ETag header for cache validation
      setHeaders: (res, pathname) => {
        if (pathname.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
      },
    }),
  );
  console.log('Server.js', 'Serving static files from dist/client');

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
  console.log('Server.js', 'MIME type middleware set up');

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
  console.log('Server.js', 'API routes set up');

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
  console.log('Server.js', 'Catch-all route for non-API requests set up');

  // Serve HTML in CATCHALL ROUTE
  app.use('*', async (req, res) => {
    try {
      const isApiRequest = req.path.startsWith('/api');
      if (isApiRequest) {
        res.status(404).send('API route not found');
        return;
      }

      const url = req.originalUrl.replace(base, '');

      // Use rootPath to resolve the path to entry-server.js
      const entryServerPath = path.resolve(
        rootPath,
        'dist/server/entry-server.js',
      );
      const render = ( await import( entryServerPath ) ).render;

      let template = templateHtml; // Using preloaded templateHtml

      const initialData = {};

      // If render is not a function, log the error and return a 500 response
      if (typeof render !== 'function') {
        console.error('Render is not a function:', render);
        res.status(500).send('Server Error');
        return;
      }

      console.log(
        'Server.js',
        'Loaded template and SSR module in production mode',
        { templateLength: template.length },
      );

      let didError = false;

      const { pipe, abort } = render(url, ssrManifest, initialData, {
        onShellError() {
          res.status(500);
          res.set({ 'Content-Type': 'text/html' });
          res.send('<h1>Something went wrong during SSR</h1>');
        },
        onShellReady() {
          res.status(didError ? 500 : 200);
          res.set({ 'Content-Type': 'text/html' });
          if (typeof pipe !== 'function') {
            console.error('onShellReady: pipe is not a function');
            res.status(500).send('Internal Server Error');
            return;
          }

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding);
              callback();
            },
          });

          const [htmlStart, htmlEnd] = template.split('<!--app-html-->');

          res.write(htmlStart);

          transformStream.on('finish', () => {
            res.end(htmlEnd);
          });

          pipe(transformStream);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      });

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (error) {
      console.error('Server.js - Catch Error:', error.stack);
      if (!res.headersSent) {
        res.status(500).end('Internal Server Error');
      }
    }
  });

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

// Invoke the function to start the server
startServer();