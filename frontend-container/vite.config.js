import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import Inspect from 'vite-plugin-inspect';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isSSR = process.env.BUILD_TARGET === 'ssr';

  return {
    root: './', // Ensure this points to the directory containing index.html
    publicDir: 'public',
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
      hmr: {
        overlay: true,
      },
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      commonjs({
        include: /node_modules/,
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
      }),
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      nodePolyfills({
        protocolImports: true,
      }),
      splitVendorChunkPlugin(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true,
      }),
      isProduction &&
        terser({
          compress: true,
          mangle: true,
          module: true,
          format: {
            comments: false,
          },
        }),
      Inspect({ build: true, outputDir: '.vite-inspect' }),
      svgrPlugin({ exportType: 'component', svgrOptions: { icon: true } }),
      ViteEjsPlugin(),
    ].filter(Boolean),
    define: {
      'process.env': process.env,
    },
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
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: isProduction ? 'terser' : false,
      outDir: isSSR ? 'dist/server' : 'dist/client',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 300,
      ssrManifest: !isSSR,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'), // Ensure this points to the correct file
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
        },
        external: [],
      },
      target: 'esnext',
      sourcemap: true,
      commonjsOptions: {
        include: ['warning'],
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-apexcharts',
        '@microsoft/applicationinsights-react-js',
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
      exclude: ['@react-bootstrap', '@restart'],
    },
    ssr: {
      noExternal: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-helmet-async',
        'react-apexcharts',
        '@microsoft/applicationinsights-react-js',
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
