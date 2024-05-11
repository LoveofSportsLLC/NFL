const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const distPath = path.join(__dirname, "dist");
const publicPath = path.join(__dirname, "public");
const wellKnownPath = path.join(__dirname, ".well-known");

// Serve ACME Challenge files
app.use('/.well-known/acme-challenge', express.static(wellKnownPath, {
  dotfiles: 'allow' // Important to allow dotfiles for ACME challenge
}));
// Serve static files from the public and dist directories
app.use(express.static(publicPath));
app.use(express.static(distPath));

// Handler for all requests
app.get("*", (req, res) => {
  const publicRequestedPath = path.join(publicPath, req.path);
  const distRequestedPath = path.join(distPath, req.path);

  console.log(`Received request for: ${req.path}`);

  // Check if the requested path matches a file in the public directory
  if (
    fs.existsSync(publicRequestedPath) &&
    fs.lstatSync(publicRequestedPath).isFile()
  ) {
    console.log(`Serving from public directory: ${publicRequestedPath}`);
    return res.sendFile(publicRequestedPath);
  }

  // Check if the requested path matches a file in the dist directory
  else if (
    fs.existsSync(distRequestedPath) &&
    fs.lstatSync(distRequestedPath).isFile()
  ) {
    console.log(`Serving from dist directory: ${distRequestedPath}`);
    return res.sendFile(distRequestedPath);
  }

  // Default to serving the index.html file for any other requests
  console.log(`Defaulting to index.html for path: ${req.path}`);
  return res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
