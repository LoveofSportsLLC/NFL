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
import * as diff from 'diff'; // Import diff for HTML comparison

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.DOCKER_ENV === 'true';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';
console.log(base);
const ABORT_DELAY = 10000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = isInDocker ? '/app' : __dirname; // Use rootPath as determined by the environment
const isSSR = process.env.SSR === 'true';
const isLocal = process.env.GIT_WORKFLOW === '0';
const isCluster = process.env.GIT_WORKFLOW === '1';

console.log('Server.js', 'Running Server.js script', '');
console.log('Environment Info:', {
  isProduction,
  isInDocker,
  isSSR,
  isLocal,
  isCluster,
});

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
  console.log(
    'Server.js',
    'Express app configured with JSON, URL encoding, and compression',
  );

  // Import and configure sirv to serve static files

  // Serve static files from the public directory
  app.use(express.static(path.join(rootPath, 'public')));
  console.log('Server.js', 'Serving static files from public directory');

  // Serve static files from dist/client using sirv
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
  console.log('Server.js', 'Serving static files from dist/client');

  // Middleware for MIME type handling
  // const setCorrectMimeType = (req, res) => {
  //   const ext = path.extname(req.url);
  //   const mimeType = mime.getType(ext); // Get the correct MIME type for the extension
  //   if (mimeType) {
  //     res.setHeader('Content-Type', mimeType);
  //     console.log(`Set MIME type for ${req.url} as ${mimeType}`);
  //   }
  // };
  // app.use((req, res, next) => {
  //   setCorrectMimeType(req, res);
  //   next();
  // });
  // console.log('Server.js', 'MIME type middleware set up');

  // ROUTE LOGGER
  app.use((req, res, next) => {
    console.log('Server.js', 'Incoming request', req.url);
    next();
  });

  // ROUTE /
  // app.get('/', (req, res) => {
  //   console.log('Server.js', 'Incoming request', '/');
  //   res.redirect(base);
  // });

  // ROUTE /LOG
  app.post('/log', (req, res) => {
    console.log('Received log:', req.body);
    const { fileName, functionName, messages } = req.body;
    console.log(fileName, functionName, '', ...messages);
    res.sendStatus(200);
  });

  // ROUTES /API/*
  // app.get('/api/*', (req, res) => {
  //   res.json({ message: 'API response' });
  // });

  // ROUTE /API/GAME/:GAMEID
  // app.get('/api/game/:gameId', async (req, res) => {
  //   const { gameId } = req.params;
  //   const apiKey = process.env.SPORTRADAR_API_KEY;
  //   const url = `https://api.sportradar.us/nfl/official/trial/v7/en/games/${gameId}/timeline.json?api_key=${apiKey}`;
  //   try {
  //     const response = await axios.get(url);
  //     const gameData = response.data.timeline.map((event) => ({
  //       time: event.clock,
  //       momentum: event.momentum,
  //       score: `${event.home_points}-${event.away_points}`,
  //       play: event.description,
  //       keyPlayer: event.keyPlayer,
  //       gameContext: {
  //         down: event.down,
  //         distance: event.distance,
  //         redZone: event.redZone,
  //       },
  //     }));
  //     res.json(gameData);
  //   } catch (error) {
  //     console.error('Error fetching game data:', error);
  //     res.status(500).json({ error: 'Failed to fetch game data' });
  //   }
  // });
  // console.log('Server.js', 'API routes set up');

  // ROUTE /NON API ROUTE
  // app.get(/^(?!\/api).*/, (req, res) => {
  //   res.sendFile(path.resolve(rootPath, 'dist/client/index.html'), (err) => {
  // Updated to use rootPath
  //     if (err) {
  //       console.log('Server.js', 'Error sending index.html:', '', err);
  //       res.status(500).send('Server Error');
  //     }
  //   });
  // });
  // console.log('Server.js', 'Catch-all route for non-API requests set up');

app.use('*', async (req, res) => {
  try {
    const isApiRequest = req.path.startsWith('/api');
    if (isApiRequest) {
      res.status(404).send('API route not found');
      return;
    }

    const url = req.originalUrl.replace(base, '');
    const entryServerPath = path.resolve(
      rootPath,
      'dist/server/entry-server.js',
    );
    const { render } = await import(entryServerPath);

    const initialData = {};
    let didError = false;

    if (typeof render !== 'function') {
      console.error('Render is not a function:', render);
      res.status(500).send('Server Error');
      return;
    }

    const { pipe, abort, helmetContext } = render(
      url,
      ssrManifest,
      initialData,
    );

    const onShellReady = (htmlStart, htmlEnd) => {
      try {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        // Inject the Helmet data collected on the server
        const { helmet } = helmetContext;

        if (!helmet || !helmet.title || !helmet.title.toString().trim()) {
          throw new Error('Helmet title is not set correctly.');
        }

        const helmetTags = `
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        `;

        const finalHtmlStart = htmlStart + helmetTags;
        const finalHtml = finalHtmlStart + htmlEnd;

        // Compare server-side rendered HTML with the initial HTML template
        const templateContent = templateHtml;
        const diffResult = diff.diffLines(templateContent, finalHtml);

        let mismatchFound = false;

        diffResult.forEach((part, index) => {
          if (part.added || part.removed) {
            mismatchFound = true;
            const source = part.added ? 'Server' : 'Template';
            console.log(`Mismatch at difference ${index + 1}:`);
            console.log(`Source: ${source}`);
            console.log(`Difference: ${part.value}`);
            console.log('-----------------------------------');

            // Optionally, log the specific element or line causing the mismatch
            const match = part.value.match(/<(\w+)(\s|>)/);
            if (match) {
              console.log(`Element: <${match[1]}>`);
            }
          }
        });

        if (!mismatchFound) {
          console.log('Server-generated HTML matches template HTML');
        } else {
          console.warn(
            'Mismatch found between server-generated and template HTML',
          );
        }

        res.write(finalHtmlStart);
        res.write(
          `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}</script>`,
        );

        transformStream.on('finish', () => {
          res.end(htmlEnd);
        });

        pipe(transformStream);
      } catch (error) {
        onShellError(error);
      }
    };

    const onShellError = (error) => {
      console.error('Shell Error:', error);
      res.status(500).send('<h1>Something went wrong during SSR</h1>');
    };

    const onError = (error) => {
      didError = true;
      console.error('SSR Error:', error);
    };

    setTimeout(() => {
      abort();
    }, ABORT_DELAY);

    onShellReady(); // Call onShellReady when ready to send the response
  } catch (error) {
    console.error('Server.js - Catch Error:', error.stack);
    if (!res.headersSent) {
      res.status(500).end('Internal Server Error');
    }
  }
});


  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

startServer();