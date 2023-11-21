const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Put all your API routes here

// The "catchall" handler: for any request that doesn't match any routes above, send back the React index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Error starting server:', error);
});
process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    // Close your server here (if applicable)
    process.exit();
});

process.on('SIGTERM', function() {
    console.log("Caught termination signal");
    // Close your server here (if applicable)
    process.exit();
});