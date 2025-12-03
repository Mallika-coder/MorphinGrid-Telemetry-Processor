const TelemetryClean = require('../models/TelemetryClean');
const Anomaly = require('../models/Anomaly');

exports.summary = async (req, res) => {
  const total = await TelemetryClean.countDocuments();
  const anomalies = await Anomaly.countDocuments();
  const lastAnomaly = await Anomaly.findOne().sort({ timestamp: -1 });
  res.json({ total, anomalies, lastAnomaly });
};

exports.query = async (req, res) => {
  const { start, end, rangerId, limit = 100 } = req.query;
  const q = {};
  if (rangerId) q.ranger_id = rangerId;
  if (start || end) q.timestamp = {};
  if (start) q.timestamp.$gte = new Date(start);
  if (end) q.timestamp.$lte = new Date(end);
  const data = await TelemetryClean.find(q).limit(parseInt(limit)).sort({ timestamp: -1 });
  res.json({ data });
};

exports.anomalies = async (req, res) => {
  const list = await Anomaly.find().sort({ timestamp: -1 }).limit(500);
  res.json({ anomalies: list });
};