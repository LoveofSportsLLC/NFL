import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import Inspect from 'vite-plugin-inspect';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { resolve } from 'path';
import fs from 'fs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import rollupReplace from '@rollup/plugin-replace';

const __dirname = new URL('.', import.meta.url).pathname;
const isSSR = process.env.BUILD_TARGET === 'ssr';
const isProduction = process.env.NODE_ENV === 'production';

const excludeModules = ['stream', 'readable-stream'];

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const dependencies = Object.keys(packageJson.dependencies || {});

const excludeDeps = [
  '@fontsource/inter',
  'faker',
  'node',
  'realm',
  'serve',
  '@remix-run/react',
  'node:stream/web',
  'node:fs/promises',
  'memfs',
];

const filteredDependencies = dependencies.filter(
  (dep) => !excludeDeps.includes(dep),
);

export default defineConfig(({ command, mode }) => {
  const isDocker = process.env.DOCKER_ENV === 'true';

  const rootPath = isDocker ? '/app' : './';
  const outputDir = isDocker ? '/app/dist' : 'dist';
  const publicDir = isDocker ? '/app/public' : 'public';

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
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/log': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
      hmr: isProduction ? false : { overlay: true },
    },
    define: {
      'process.env.SSR': JSON.stringify(isSSR),
      __SSR__: JSON.stringify(isSSR),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      !isSSR &&
        nodePolyfills({
          include: [
            'path',
            'crypto',
            'os',
            'buffer',
            'url',
            'util',
            'stream',
            'events',
            'http',
            'https',
            'net',
            'zlib',
            'tty',
            'vm',
            'timers',
            'querystring',
            'constants',
            'assert',
          ],
          globals: {
            Buffer: true,
            global: true,
            process: true,
          },
          overrides: {
            fs: 'memfs',
          },
          protocolImports: true,
        }),
      nodeResolve({
        browser: !isSSR,
        preferBuiltins: isSSR,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({
        include: /node_modules/,
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
        ignoreDynamicRequires: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.SSR': JSON.stringify(isSSR),
        preventAssignment: true,
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules\/(?!memfs)/,
      }),
      isProduction &&
        terser({
          compress: true,
          mangle: true,
          format: { comments: false },
        }),
      Inspect({ build: true, outputDir: '.vite-inspect' }),
      svgrPlugin({ exportType: 'component', svgrOptions: { icon: true } }),
      ViteEjsPlugin(),
      rollupReplace({
        include: 'node_modules/node-fetch/src/utils/referrer.js',
        preventAssignment: true,
        values: {
          isIP: '() => false', // Fallback function for `isIP`
        },
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '~/runtimeConfig': resolve(__dirname, './runtimeConfig.browser'),
        'react/jsx-runtime': resolve(
          __dirname,
          './node_modules/react/jsx-runtime.js',
        ),
        'react/jsx-dev-runtime': resolve(
          __dirname,
          './node_modules/react/jsx-dev-runtime.js',
        ),
        warning: resolve(__dirname, 'src/shims/warning.js'),
        // Use isomorphic-fetch rather than node-fetch for compatibility
        'node-fetch': 'isomorphic-fetch',
      },
      mainFields: isSSR ? ['module', 'main'] : ['browser', 'module', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    build: {
      ssr: isSSR,
      minify: isProduction ? 'terser' : false,
      outDir: `${outputDir}/${isSSR ? 'server' : 'client'}`,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 3000,
      ssrManifest: isSSR,
      inlineDynamicImports: isSSR,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          'entry-client': resolve(__dirname, 'src/entry-client.jsx'),
          'entry-server': resolve(__dirname, 'src/entry-server.jsx'),
          light: resolve(__dirname, 'src/assets/scss/light.scss'),
          dark: resolve(__dirname, 'src/assets/scss/dark.scss'),
          team: resolve(__dirname, 'src/assets/scss/team-theme.scss'),
        },
        output: {
          assetFileNames: 'assets/[name][extname]',
          format: 'es',
          compact: true,
          entryFileNames: '[name].js',
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
        },
        external: isSSR ? ['path', 'https', 'net', 'fs'] : [], // Added 'fs' for SSR build
      },
      target: ['es2020', 'chrome80', 'edge80', 'firefox78', 'safari13'], // Specific browser targets
      sourcemap: !isProduction,
      commonjsOptions: {
        include: ['warning', /node_modules/],
      },
    },
    optimizeDeps: {
      include: [
        ...filteredDependencies,
        'react-router',
        '@remix-run/router',
        'warning',
        'crypto-browserify',
        'stream-browserify',
        'path-browserify',
        'browserify-zlib',
        'log4js',
        'util',
      ],
      exclude: [
        '@react-bootstrap',
        '@restart',
        '@fontsource/inter',
        'faker',
        'node',
        'realm',
        'serve',
        '@remix-run/react',
        'node:stream/web',
        'node:fs/promises',
        'memfs',
        'https', // exclude node-only modules from optimizeDeps
        'path', // exclude node-only modules from optimizeDeps
      ],
    },
    ssr: {
      target: 'node',
      noExternal: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-helmet-async',
        'react-apexcharts',
        '@microsoft/applicationinsights-react-js',
        '@microsoft/applicationinsights-web',
        'google-map-react',
        'apexcharts',
        'chart.js',
        'react-chartjs-2',
        'jsvectormap',
        '@fullcalendar/bootstrap',
        '@fullcalendar/daygrid',
        '@fullcalendar/react',
        '@fullcalendar/timegrid',
        '@kurkle/color',
        'scheduler',
        '@restart/ui',
        'warning',
      ],
    },
  };
});
