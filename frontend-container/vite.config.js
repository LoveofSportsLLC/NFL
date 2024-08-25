import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cdn from 'vite-plugin-cdn-import';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Inspect from 'vite-plugin-inspect';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import replace from '@rollup/plugin-replace';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig( async ( { command, mode } ) =>
{
  // Log the configuration variables
  console.log( 'Vite Configuration Variables:' );

  // Determine if Vite is in serve or build mode
  console.log( `Running Vite in ${command} mode` );

  // Log the directory name
  console.log( 'Directory Name (__dirname):', __dirname );

  // Set and Log Production/Development mode
  const isProduction = mode === 'production';
  console.log(
    'Prod/Dev (isProduction):',
    isProduction ? 'Production' : 'Development',
  );

  // Set and Log if Application is located in Docker/Local
  const isDocker = process.env.DOCKER_ENV === 'true';
  console.log(
    'Docker/Local (DOCKER_ENV):',
    process.env.DOCKER_ENV === 'true' ? 'Docker' : 'Local',
  );

  // Set and Log if Build is SSR/Client
  const isSSR = process.env.BUILD_TARGET === 'ssr';
  console.log( 'SSR/Client (isSSR):', isSSR ? 'SSR' : 'Client' );

  // Use path.join or path.resolve to create paths relative to the project root
  const outputDir = isDocker ? '/app/dist' : path.resolve( 'dist' );
  console.log( 'Build Output (outputDir):', outputDir );

  // Root path should contextually make sense - use process.cwd() or similar if possible
  const rootPath = isDocker ? '/app' : path.resolve();
  console.log( 'Directory Root (rootPath):', rootPath );

  // Ensure publicDir is using relative paths correctly
  const publicDir = isDocker ? '/app/public' : path.resolve( 'public' );
  console.log( 'Public Directory (publicDir):', publicDir );

  // Adjust inspecting output for clarity in local build
  const inspectOutput = isDocker
    ? '/app/.vite-inspect'
    : path.resolve( '.vite-inspect' );
  console.log( 'Inspect Output Directory (inspectOutput):', inspectOutput );

  const eslintConfig = await import( './eslint.config.js' );

  // Determine whether to use CDN for React/ReactDOM based on an environment variable or configuration
  const useCDN = process.env.USE_CDN === 'true';
  console.log( 'Using CDN for React and ReactDOM:', useCDN );

  console.log( 'Configuration:', {
    command,
    mode,
    isProduction,
    isDocker,
    isSSR,
    useCDN,
  } );
  
  const plugins = [
    //nodeExternals(),
    react(),
    !isSSR && useCDN
      ? cdn({
          modules: [
            {
              name: 'react',
              var: 'React',
              path: 'https://cdn.skypack.dev/react@18.3.1',
            },
            {
              name: 'react-dom',
              var: 'ReactDOM',
              path: 'https://cdn.skypack.dev/react-dom@18.3.1',
            },
            {
              name: 'react-router-dom',
              var: 'ReactRouterDOM',
              path: 'https://cdn.skypack.dev/react-router-dom@6.2.1',
            },
          ],
        })
      : null,
    nodePolyfills({ protocolImports: true }),
    svgrPlugin({ exportType: 'component' }),
    eslintConfig.default,
    ViteEjsPlugin(),
    Inspect({ build: true, outputDir: inspectOutput }),
    replace({ preventAssignment: true }),
  ].filter(Boolean);
  console.log(
    'Vite Plugins:',
    plugins.map( ( p ) => p.name || 'UnnamedPlugin' ),
  );
  console.log( 'Vite Plugin Configuration', plugins );

  const build = {
    manifest: true,
    sourcemap: isProduction && !isSSR,
    minify: isProduction ? 'esbuild' : false,
    outDir: `${outputDir}/${isSSR ? 'server' : 'client'}`,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 3000,
    ssrManifest: !isSSR,
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      external: useCDN && !isSSR ? ['react', 'react-dom'] : [],
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'entry-client': path.resolve(__dirname, 'src/entry-client.jsx'),
        'entry-server': path.resolve(__dirname, 'src/entry-server.jsx'),
        light: path.resolve(__dirname, 'src/assets/scss/light.scss'),
        dark: path.resolve(__dirname, 'src/assets/scss/dark.scss'),
        team: path.resolve(__dirname, 'src/assets/scss/team-theme.scss'),
      },
      output: {
        strict: false,
        format: 'esm',
        compact: true,
        entryFileNames: '[name].js', // Ensure unique file names
        chunkFileNames: '[name]-[hash].js', // Handle chunking
        assetFileNames: 'assets/[name][extname]',
        manualChunks: {
          apexcharts: ['apexcharts'],
          chartjs: ['chart.js', 'react-chartjs-2'],
          googlemaps: ['google-map-react'],
          vectormaps: [
            'jsvectormap',
            'src/vendor/us_aea_en.js',
            'src/vendor/world.js',
          ],
          fullcalendar: [
            '@fullcalendar/bootstrap',
            '@fullcalendar/daygrid',
            '@fullcalendar/react',
            '@fullcalendar/timegrid',
          ],
        },
        globals:
          useCDN && !isSSR
            ? {
                react: 'React',
                'react-dom': 'ReactDOM',
              }
            : {},
      },
    },
  };
  console.log( 'Vite Build Configuration:', build );

  const ssrConfig = {
    target: 'node',
    noExternal: [
      'apexcharts',
      'chart.js',
      'react-chartjs-2',
      'google-map-react',
      'jsvectormap',
      'src/vendor/us_aea_en.js',
      'src/vendor/world.js',
      '@fullcalendar/bootstrap',
      '@fullcalendar/daygrid',
      '@fullcalendar/react',
      '@fullcalendar/timegrid',
      'react-helmet-async',
    ],
    external: useCDN ? ['react', 'react-dom'] : [],
  };

  return {
    logLevel: 'error',
    base: '/',
    root: rootPath,
    publicDir: publicDir,
    server: {
      port: 3000,
      historyApiFallback: true,
      proxy: {
        ...(command === 'serve' && { '/@vite': 'http://localhost:3000' }),
        '/api': {
          target: 'https://newsapi.org/v2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/log': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
        '/assets': {
          target: 'http://localhost:3000', // Replace with your assets server URL
          changeOrigin: true,
        },
      },
      hmr: process.env.GIT_WORKFLOW !== '1' ? { overlay: true } : false,
    },
    define: {
      'process.env.SSR': JSON.stringify(isSSR),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DOCKER_ENV': JSON.stringify(process.env.DOCKER_ENV),
      'process.env.PORT': JSON.stringify(process.env.PORT || 3000),
      'process.env.BUILD_TARGET': JSON.stringify(process.env.BUILD_TARGET),
      'process.env.GIT_WORKFLOW': JSON.stringify(process.env.GIT_WORKFLOW),
      'import.meta.env.VITE_COMMAND': JSON.stringify(command),
    },
    plugins: plugins.filter(Boolean).filter((plugin) => plugin && plugin.name),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
    build,
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-bootstrap'],
    },
    ssr: isSSR ? ssrConfig : undefined,
  };
});
