const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const distPath = path.join(__dirname, "dist");
const publicPath = path.join(__dirname, "public");
const wellKnownPath = path.join(__dirname, ".well-known");

// Serve ACME Challenge files with detailed logging
app.use("/.well-known/acme-challenge", express.static(wellKnownPath, { dotfiles: "allow" }), (req, res, next) => {
    const challengeFilePath = path.join(wellKnownPath, req.path);
    console.log(`Attempting to serve ACME challenge file: ${challengeFilePath}`);

    if (!fs.existsSync(challengeFilePath)) {
        console.log("ACME challenge file not found.");
        if (fs.existsSync(wellKnownPath)) {
            console.log("Listing directory contents:");
            fs.readdirSync(wellKnownPath).forEach(file => {
                console.log(file);
            });
        }
        return res.status(404).send("Challenge file not found");
    }

    next();
});

// Serve static files from the public and dist directories
app.use(express.static(publicPath));
app.use(express.static(distPath));

// Handler for all requests
app.get("*", (req, res) => {
  const publicRequestedPath = path.join(publicPath, req.path);
  const distRequestedPath = path.join(distPath, req.path);

  console.log(`Received request for: ${req.path}`);

  if (fs.existsSync(publicRequestedPath) && fs.lstatSync(publicRequestedPath).isFile()) {
    console.log(`Serving from public directory: ${publicRequestedPath}`);
    return res.sendFile(publicRequestedPath);
  } else if (fs.existsSync(distRequestedPath) && fs.lstatSync(distRequestedPath).isFile()) {
    console.log(`Serving from dist directory: ${distRequestedPath}`);
    return res.sendFile(distRequestedPath);
  }

  console.log(`Defaulting to index.html for path: ${req.path}`);
  return res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});