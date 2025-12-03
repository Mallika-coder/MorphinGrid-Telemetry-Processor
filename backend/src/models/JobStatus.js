const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: String,
  fileName: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobStatus', JobSchema);