const { Queue } = require('bullmq');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const redis = require('ioredis');
const connection = new redis(process.env.REDIS_URL);

const ingestQueue = new Queue('ingest', { connection });

exports.enqueueFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const jobId = uuidv4();
    // Update JobStatus here
    await ingestQueue.add('process-file', { filePath: file.path, originalName: file.originalname, jobId });
    res.json({ ok: true, jobId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};