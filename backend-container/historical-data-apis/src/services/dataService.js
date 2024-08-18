// src/services/dataService.js
const dataStore = {}; // In-memory data store for simplicity

exports.saveData = (data) => {
  const id = new Date().getTime().toString();
  dataStore[id] = data;
  return { id, ...data };
};

exports.updateData = (id, newData) => {
  if (dataStore[id]) {
    dataStore[id] = newData;
    return { id, ...newData };
  }
  return null;
};

exports.deleteData = (id) => {
  if (dataStore[id]) {
    delete dataStore[id];
    return true;
  }
  return false;
};