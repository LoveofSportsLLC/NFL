// frontend-container/server.js
import express from "express";
import { resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function createServer() {
  const app = express();

  // Serve static files from the Public directory directly from the root URL
  app.use(express.static(resolve(__dirname, "Public")));

  // Middleware to set correct MIME type for JavaScript files
  app.use((req, res, next) => {
    if (req.url.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
    next();
  });

  // Serve the dist directory
  app.use(express.static(resolve(__dirname, "dist")));

  // Catch-all route to serve the app
  app.use("*", async (req, res) => {
    try {
      // Read index.html from the dist directory
      const template = fs.readFileSync(
        resolve(__dirname, "dist/index.html"),
        "utf-8",
      );

      // Send the HTML back
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      console.error(e);
      res.status(500).end(e.stack);
    }
  });

  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
}

createServer();
