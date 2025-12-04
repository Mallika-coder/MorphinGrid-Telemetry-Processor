const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const connection = new Redis(process.env.REDIS_URL);

const ingestQueue = new Queue('ingest', { connection });
module.exports = { ingestQueue, connection };