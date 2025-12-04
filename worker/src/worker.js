require('dotenv').config();
const mongoose = require('mongoose');
const { Worker } = require('bullmq');
const { connection } = require('./queue');
const fileProcessor = require('./processors/fileProcessor');

// Note: Re-using the models file from the backend/src/models directory is common in microservice architectures
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Worker connected to Mongo'));

const worker = new Worker('ingest', async job => {
  if (job.name === 'process-file') {
    return await fileProcessor.process(job.data);
  }
}, { connection });

worker.on('completed', job => console.log('Job completed', job.id));
worker.on('failed', (job, err) => console.error('Job failed', err));