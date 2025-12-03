const mongoose = require('mongoose');

const AnomalySchema = new mongoose.Schema({
  ranger_id: String,
  timestamp: Date,
  metric: String,
  value: Number,
  score: Number,
  severity: String,
  raw: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Anomaly', AnomalySchema);