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
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isSSR = process.env.BUILD_TARGET === 'ssr';
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
      hmr: isProduction
        ? false
        : {
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
        '~/runtimeConfig': resolve(rootPath, './runtimeConfig.browser'),
        'react/jsx-runtime': resolve(
          rootPath,
          './node_modules/react/jsx-runtime.js',
        ),
        'react/jsx-dev-runtime': resolve(
          rootPath,
          './node_modules/react/jsx-dev-runtime.js',
        ),
        '@': resolve(rootPath, './src'),
      },
    },
    build: {
      minify: isProduction ? 'terser' : false,
      outDir: isSSR ? `${outputDir}/server` : `${outputDir}/client`,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 300,
      ssrManifest: !isSSR,
      rollupOptions: {
        input: {
          main: resolve(rootPath, 'index.html'),
          'entry-client': resolve(rootPath, 'src/entry-client.jsx'),
          'entry-server': resolve(rootPath, 'src/entry-server.jsx'),
          light: resolve(rootPath, 'src/assets/scss/light.scss'),
          dark: resolve(rootPath, 'src/assets/scss/dark.scss'),
          team: resolve(rootPath, 'src/assets/scss/team-theme.scss'),
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
        '@microsoft.applicationinsights-react-js',
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
