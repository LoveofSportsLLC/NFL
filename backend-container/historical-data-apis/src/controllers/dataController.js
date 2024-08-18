// src/controllers/dataController.js
const dataService = require('../services/dataService');

exports.createData = (req, res) => {
  const data = req.body;
  const result = dataService.saveData(data);
  res.json({ received: result });
};

exports.updateData = (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const result = dataService.updateData(id, newData);
  res.json({ id, updated: result });
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  const result = dataService.deleteData(id);
  res.json({ message: `Record with id ${id} deleted`, result });
};