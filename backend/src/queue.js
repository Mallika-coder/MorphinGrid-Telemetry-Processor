const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL || 'redis://redis:6379');

// Optional: agar tum queue yahin create karna chahte ho
const ingestQueue = new Queue('ingest', { connection });

module.exports = {
  connection,
  ingestQueue,
};
