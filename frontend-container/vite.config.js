import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { nodePolyfills } from 'vite-plugin-node-polyfills';
import nodeExternals from 'rollup-plugin-node-externals';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
//import { nodeResolve } from '@rollup/plugin-node-resolve';
import Inspect from 'vite-plugin-inspect';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
//import builtins from 'module';
//aimport preserveDirectives from 'rollup-plugin-preserve-directives';
import path from 'path';
import replace from '@rollup/plugin-replace';

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
    nodeExternals(),
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    svgrPlugin({ exportType: 'component' }),
    eslintConfig.default,
    ViteEjsPlugin(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    replace({
      preventAssignment: true,
    }),
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
    ssrManifest: isSSR ? false : true,
    emptyOutDir: true,
    rollupOptions: {
      external: isSSR
        ? ['https', 'net', 'fs', 'tls', 'http', 'url', 'path', 'dns']
        : [],
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
    },
  };
  console.log( 'Vite Build Configuration:', build );
  
  return {
    logLevel: 'error',
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
      },
      extensions: [ '.js', '.jsx', '.json' ],
    },
    build,
    ssr: {
      target: 'node',
      noExternal: ['react', 'react-dom', '@react-bootstrap', 'got', 'openid-client'],
    },
  };
} );
