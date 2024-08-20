import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import Inspect from 'vite-plugin-inspect';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
//aimport preserveDirectives from 'rollup-plugin-preserve-directives';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(async ({ mode }) => {
  // Log the configuration variables
  console.log('Vite Configuration Variables:');
  console.log('Directory Name (__dirname):', __dirname);
  const isProduction = mode === 'production';
  console.log(
    'Prod/Dev (isProduction):',
    isProduction ? 'Production' : 'Development',
  );

  const isSSR = process.env.BUILD_TARGET === 'ssr';
  console.log('SSR/Client (isSSR):', isSSR ? 'SSR' : 'Client');

  const outputDir = process.env.DOCKER_ENV === 'true' ? '/app/dist' : 'dist';
  console.log(
    'Docker/Local (DOCKER_ENV):',
    process.env.DOCKER_ENV === 'true' ? 'Docker' : 'Local',
  );
  console.log('Build Output (outputDir):', outputDir);

  const rootPath = process.env.DOCKER_ENV === 'true' ? '/app' : './';
  console.log('Directory Root (rootPath):', rootPath);

  const publicDir =
    process.env.DOCKER_ENV === 'true' ? '/app/public' : 'public';
  const eslintConfig = await import('./eslint.config.js');

  const plugins = [
    react({ jsxRuntime: 'automatic' }),
    eslintConfig.default,
    nodeResolve({
      browser: !isSSR,
      preferBuiltins: isSSR,
      extensions: ['.js', '.jsx', '.json'],
    }),
    nodePolyfills(),
    // nodePolyfills({
    //   include: [
    //     'path',
    //     'crypto',
    //     'url',
    //     'util',
    //     'stream',
    //     'events',
    //     'http',
    //     'https',
    //     'buffer',
    //     'querystring',
    //     'constants',
    //   ],
    //override: { fs: 'memfs' },
    //protocolImports: true,
    // }),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    svgrPlugin({ exportType: 'component', svgrOptions: { icon: true } }),
    ViteEjsPlugin(),
    //preserveDirectives(),
  ];
  console.log(
    'Vite Plugins:',
    plugins.map((p) => p.name || 'UnnamedPlugin'),
  );
    console.log('Vite Plugin Configuration', plugins);

  const build = {
    manifest: true,
    target: isSSR ? 'node20' : 'esnext',
    sourcemap: true,
    minify: isProduction ? 'esbuild' : false,
    outDir: `${outputDir}/${isSSR ? 'server' : 'client'}`,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 3000,
    ssrManifest: true,
    inlineDynamicImports: isSSR,
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'entry-client': path.resolve(__dirname, 'src/entry-client.jsx'),
        'entry-server': path.resolve(__dirname, 'src/entry-server.jsx'),
        light: path.resolve(__dirname, 'src/assets/scss/light.scss'),
        dark: path.resolve(__dirname, 'src/assets/scss/dark.scss'),
        team: path.resolve(__dirname, 'src/assets/scss/team-theme.scss'),
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        format: 'esm',
        compact: true,
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
      external: isSSR ? ['net', 'fs', 'tls', 'node-fetch'] : ['builtins'],
    },
  };
  console.log( 'Vite Build Configuration:', build );
  
  return {
    base: './',
    root: rootPath,
    publicDir: publicDir,
    server: {
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'https://newsapi.org/v2',
          changeOrigin: true,
          rewrite: ( path ) => path.replace( /^\/api/, '' ),
        },
        '/log': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
      hmr: isProduction ? false : { overlay: true },
    },
    define: {
      'process.env.SSR': JSON.stringify( isSSR ),
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
      'process.env.DOCKER_ENV': JSON.stringify( process.env.DOCKER_ENV ),
      'process.env.PORT': JSON.stringify( process.env.PORT || 3000 ),
      'process.env.BASE': JSON.stringify( process.env.BASE || './' ),
      'process.env.BUILD_TARGET': JSON.stringify( process.env.BUILD_TARGET ),
    },
    plugins: plugins.filter( Boolean ).filter( ( plugin ) => plugin && plugin.name ),
    resolve: {
      alias: {
        '@': path.resolve( __dirname, 'src' ),
        '~/runtimeConfig': path.resolve( rootPath, './runtimeConfig.browser' ),
        'react/jsx-runtime': path.resolve(
          rootPath,
          './node_modules/react/jsx-runtime.js',
        ),
        'react/jsx-dev-runtime': path.resolve(
          rootPath,
          './node_modules/react/jsx-dev-runtime.js',
        ),
        warning: path.resolve( __dirname, 'src/shims/warning.js' ),
        'node-fetch': 'isomorphic-fetch',
        string_decoder: 'string_decoder',
        'rollup-shim': path.resolve( __dirname, 'src/shims/rollup-shim.js' ),
        https: 'https-browserify',
        react: path.resolve( __dirname, 'node_modules/react' ),
        'react-dom': path.resolve( __dirname, 'node_modules/react-dom' ),
      },
      mainFields: isSSR ? [ 'module', 'main' ] : [ 'browser', 'module', 'main' ],
      extensions: [ '.js', '.jsx', '.json' ],
    },
    build,
    optimizeDeps: {
      include: [
        'react-router',
        'react-dom',
        'react',
        '@remix-run/router',
        'warning',
        'crypto-browserify',
        'stream-browserify',
        'path-browserify',
        'browserify-zlib',
        'util',
        'buffer',
        'http',
        'https',
      ],
      exclude: [
        '@react-bootstrap',
        'express',
        '@restart',
        '@fontsource/inter',
        'net',
        'http',
        'path',
        'crypto',
        'zlib',
        'stream',
        'pg',
      ],
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    },
    ssr: {
      target: 'node',
      noExternal: [
        '@react-bootstrap',
        'react',
        'react-dom',
        'react-router-dom',
        'react-helmet-async',
        '@microsoft/applicationinsights-react-js',
        '@microsoft/applicationinsights-web',
        '@kurkle/color',
        'scheduler',
        '@restart/ui',
        'warning',
        'buffer',
        'openid-client',
        'got',
        'https',
      ],
    },
  };
} );
