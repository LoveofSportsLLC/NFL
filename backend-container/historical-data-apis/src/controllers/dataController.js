// src/controllers/dataController.js
const dataService = require('../services/dataService');
const { ClientSecretCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');


// Azure AD credentials
const tenantId = "your-tenant-id";
const clientId = "your-client-id";
const clientSecret = "your=client-secret";

// Storage account details
const accountName = "nflake";
const containerName = "loff-datalake-nfl-bronze-dev";

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credential);

exports.getBlobData = async (req, res) => {
    const blobName = req.params.blobName;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        const downloadResponse = await blockBlobClient.download();
        const blobData = await streamToString(downloadResponse.readableStreamBody);
        res.send(blobData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}
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