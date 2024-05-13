const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const distPath = path.join(__dirname, "dist");
const publicPath = path.join(__dirname, "public");
const wellKnownPath = path.join(__dirname, ".well-known");

// Serve ACME Challenge files with detailed logging
app.use(
  "/.well-known/acme-challenge",
  express.static(wellKnownPath, { dotfiles: "allow" }),
  (req, res, next) => {
    const challengeFilePath = path.join(wellKnownPath, req.path);
    console.log(
      `Attempting to serve ACME challenge file: ${challengeFilePath}`,
    );

    if (!fs.existsSync(challengeFilePath)) {
      console.log("ACME challenge file not found.");
      if (fs.existsSync(wellKnownPath)) {
        console.log("Listing directory contents:");
        fs.readdirSync(wellKnownPath).forEach((file) => {
          console.log(file);
        });
      }
      return res.status(404).send("Challenge file not found");
    }

    next();
  },
);

// Serve static files from the public and dist directories
app.use(express.static(publicPath));
app.use(express.static(distPath));

// Ensure that images and other assets have the right Content-Type headers
app.get("*", (req, res, next) => {
  res.setHeader("Content-Type", getContentTypeByPath(req.path));
  next();
});

app.get("*", (req, res) => {
  const requestedPath = path.join(distPath, req.path);

  if (fs.existsSync(requestedPath) && fs.lstatSync(requestedPath).isFile()) {
    return res.sendFile(requestedPath);
  }

  return res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function getContentTypeByPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".html":
      return "text/html";
    default:
      return "application/octet-stream";
  }
}
