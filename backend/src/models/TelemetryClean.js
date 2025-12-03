const mongoose = require('mongoose');

const TelemetryCleanSchema = new mongoose.Schema({
  ranger_id: String,
  timestamp: Date,
  metrics: mongoose.Schema.Types.Mixed, // e.g., { heart_rate: 80, engine_temp: 120 }
  anomaly_score: { type: Number, default: 0 },
  is_anomaly: { type: Boolean, default: false }
});

TelemetryCleanSchema.index({ ranger_id: 1, timestamp: 1 });
TelemetryCleanSchema.index({ timestamp: 1 });

module.exports = mongoose.model('TelemetryClean', TelemetryCleanSchema);