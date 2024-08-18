// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// Import controllers
const helloController = require('../controllers/helloController');
const dataController = require('../controllers/dataController');

// Define routes
router.get('/hello', helloController.sayHello);
router.post('/data', dataController.createData);
router.put('/update/:id', dataController.updateData);
router.delete('/delete/:id', dataController.deleteData);

module.exports = router;