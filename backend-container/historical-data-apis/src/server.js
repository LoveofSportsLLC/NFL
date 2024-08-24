// src/server.js
const express = require('express');
const app = express();
const port = 3000;

const { ClientSecretCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Error handler middleware
const errorHandler = require('./middleware/errorHandler');

// Use the error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});