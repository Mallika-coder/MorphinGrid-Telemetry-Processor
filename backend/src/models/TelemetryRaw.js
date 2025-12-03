const mongoose = require('mongoose');

const TelemetryRawSchema = new mongoose.Schema({
  file_id: String,
  row_index: Number,
  data: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TelemetryRaw', TelemetryRawSchema);