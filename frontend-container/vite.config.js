import { defineConfig, splitVendorChunkPlugin } from "vite";
import Inspect from "vite-plugin-inspect";
import svgrPlugin from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";
import checker from "vite-plugin-checker";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    root: "./",
    publicDir: "public",
    server: {
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://newsapi.org/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      hmr: {
        overlay: true,
      },
    },
    plugins: [
      react({ jsxRuntime: "automatic" }),
      svgrPlugin({ exportType: "component", svgrOptions: { icon: true } }),
      Inspect({ build: true, outputDir: ".vite-inspect" }),
      ViteEjsPlugin(),
      nodePolyfills({ protocolImports: true }),
      splitVendorChunkPlugin(),
      checker(),
      isProduction &&
        replace({
          "process.env.NODE_ENV": JSON.stringify("production"),
          preventAssignment: true,
        }),
      isProduction && commonjs(),
      isProduction && terser(),
      sentryVitePlugin({
        org: "loveofsportsllc",
        project: "javascript-react",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser",
        "realm-web": resolve(__dirname, "./node_modules/realm-web"),
      },
    },
    build: {
      minify: isProduction ? "terser" : false,
      outDir: "dist",
      cssCodeSplit: true,
      chunkSizeWarningLimit: 300,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          light: resolve(__dirname, "src/assets/scss/light.scss"),
          dark: resolve(__dirname, "src/assets/scss/dark.scss"),
          team: resolve(__dirname, "src/assets/scss/team-theme.scss"),
        },
        output: {
          assetFileNames: "assets/[name][extname]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("apexcharts")) return "apexcharts";
              if (id.includes("chart.js") || id.includes("react-chartjs-2"))
                return "chartjs";
              if (id.includes("google-map-react")) return "googlemaps";
              if (
                id.includes("jsvectormap") ||
                id.includes("src/vendor/us_aea_en.js") ||
                id.includes("src/vendor/world.js")
              )
                return "vectormaps";
              if (id.includes("@fullcalendar")) return "fullcalendar";
              return "vendor";
            }
          },
        },
      },
      sourcemap: true,
    },
  };
});
