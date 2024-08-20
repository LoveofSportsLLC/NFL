import fs from 'node:fs/promises';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'node:path';
import dotenv from 'dotenv';
import compression from 'compression';
import sirv from 'sirv';
import { Transform } from 'node:stream'

// Load environment variables
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const isInDocker = process.env.DOCKER_ENV === 'true';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('Server.js', 'Starting up...', '');
const isSSR = process.env.BUILD_TARGET === 'ssr' || process.env.SSR === 'true';
const isLocal = (!isSSR || isSSR) && !isInDocker;
const isCluster = isInDocker;
console.log(
  'Server.js',
  `Environment: ${isLocal ? 'Local' : isCluster ? 'Cluster' : 'Unknown'}`,
  '',
);

//Dynamic imports for server-specific modules
async function loadServerModules() {
  let dns, tls, net, https;
  if (typeof window === 'undefined') {
    dns = await import('dns');
    tls = await import('tls');
    net = await import( 'net' );
    https = await import( 'https' );
    //fs = await import( 'fs' );
  }
  return { dns, tls, net, https };
}

let ssrManifest = {};
let templateHtml = '';

async function startServer() {
  console.log('Server.js', 'Starting server...');
  const { dns, tls, net, https } = await loadServerModules();

  //Load template HTML and SSR manifest
  try {
    templateHtml = await fs.readFile(
      path.resolve(__dirname, './dist/client/index.html'),
      'utf-8',
    );
    console.log('Server.js', 'Loaded template HTML', {
      templateHtmlLength: templateHtml.length,
    });

    ssrManifest = JSON.parse(
      await fs.readFile(
        path.resolve(__dirname, './dist/client/.vite/ssr-manifest.json'),
        'utf-8',
      ),
    );
    console.log('Server.js', 'Loaded SSR manifest', {
      ssrManifestLength: Object.keys(ssrManifest).length,
    });
  } catch (err) {
    console.error(
      'Server.js',
      'Error loading template HTML or SSR manifest',
      err,
    );
    return;
  }

  // Create Express app
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());
  app.use(
    sirv('dist/client', {
      maxAge: isProduction ? 31536000 : 0,
      immutable: isProduction,
      setHeaders: (res, pathname) => {
        if (pathname.endsWith('.js')) {
          res.setHeader(
            'Content-Type',
            'application/javascript; charset=utf-8',
          );
        }
      },
    }),
  );
  console.log('Server.js', 'Compression and Sirv middleware added');

  // Serving static files explicitly
  app.use(express.static(path.join(__dirname, 'dist/client')));
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.get(/^(?!\/api).*\.(js|css|png|jpg|jpeg|svg|ico)$/, (req, res) => {
    const filePath = path.join(__dirname, 'dist/client', req.path);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('File not found:', err);
        res.status(err.status || 404).send('File not found.');
      }
    });
  });
  console.log('Server.js', 'Static asset serving added');

  // Middleware to set Content-Type header with charset=utf-8 for specific file types
  app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (req.path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (req.path.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    }
    next();
  });
  console.log(
    'Server.js',
    'Middleware to set Content-Type header with charset=utf-8 for specific file types added',
  );

  // Middleware to set Mime Type header
  app.use((req, res, next) => {
    const ext = path.extname(req.url);
    const mimeType = mime.lookup(ext);
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }
    next();
  });
  console.log('Server.js', 'Middleware to set Mime Type header added');

  // Middleware for logging requests
  app.use((req, res, next) => {
    console.log('Server.js', `Incoming request to ${req.url}`);
    next();
  });
  console.log('Server.js', 'Middleware for logging requests added');

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Server.js - Unhandled Error:', err);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    } else {
      next(err);
    }
  });
  console.log('Server.js', 'Error handling middleware added');

  // ROUTES '/'
  app.get('/', (req, res) => {
    res.redirect(base);
  });

  // ROUTES '/log' send logs to console
  app.post('/log', (req, res) => {
    const { fileName, functionName, messages } = req.body;
    console.log(fileName, functionName, '', ...messages);
    res.sendStatus(200);
  });

  // ROUTES '/api/game/:gameID' Fetch game data from Sports Radar API
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
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to fetch game data' });
      }
    }
  });

  // Catch-all route for SSR rendering
  app.use( '*', async ( req, res ) =>
  {
    try
    {
      const url = req.originalUrl.replace( base, '' );
      const { render } = await import( './dist/server/entry-server.js' );
      const initialData = {};

      let didError = false;

      const { pipe, abort } = render( url, ssrManifest,  {
        onShellError ()
        {
          res.status( 500 )
          res.set( { 'Content-Type': 'text/html' } )
          res.send( '<h1>Error occurred during rendering</h1>' )
        },
        onShellReady ()
        {
          console.log( 'onShellReady called' );
          res.status( didError ? 500 : 200 );
          res.set( { 'Content-Type': 'text/html' } );

          const transformStream = new Transform( {
            transform ( chunk, encoding, callback )
            {
              res.write( chunk, encoding )
              callback()
            }
          } )
          
          const [ htmlStart, htmlEnd ] = templateHtml.split( '<!--app-html-->' );
          
          res.write( htmlStart +
            `<script>window.__INITIAL_DATA__ = ${JSON.stringify( initialData )}</script>`,
          );
          
          transformStream.on( 'finish', () =>
          {
            res.end( htmlEnd )
          } )
          pipe( transformStream )
        },
        onError ( error )
        {
          didEror = trun
          console.error(error)
        }
      } )
      
      setTimeout( () =>
      {
        abort()
      }, ABORT_DELAY )
    } catch ( e )
    {
      vite?.ssrFixStacktrace( e )
      console.error('Server.js', 'Error during server render:', e.stack )
      res.status( 500 ).end( e.stack )
    }
  } )

  // Start the server
  app.listen(port, () => {
    console.log(`Server.js`, `Server is running at http://localhost:${port}`);
  });
}

startServer();
