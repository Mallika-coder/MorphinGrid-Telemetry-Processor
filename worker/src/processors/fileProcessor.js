const { parseCSV } = require('../utils/fileParser');
const axios = require("axios");
const { detectAnomaliesForBatch } = require('./anomalyDetection');
const fs = require('fs');

const BACKEND_URL = "http://morphin-backend:4000";  // docker backend hostname

async function process(data) {
  const { filePath, originalName, jobId } = data;

  return new Promise((resolve, reject) => {
    const batch = [];
    let rowIndex = 0;

    parseCSV(
      filePath,
      row => {
        const normalized = {
          ranger_id: row.ranger_id || row.RangerID || "unknown",
          timestamp: new Date(row.timestamp || row.time || Date.now()),
          metrics: {
            heart_rate: parseFloat(row.heart_rate || row.hr || 0),
            engine_temp: parseFloat(row.engine_temp || row.temp || 0)
          },
          index: rowIndex++
        };

        batch.push(normalized);

        if (batch.length >= 500) {
          processBatch(batch.splice(0)); // async batch
        }
      },
      async count => {
        if (batch.length) {
          await processBatch(batch);
        }

        try { fs.unlinkSync(filePath); } catch (e) {}

        resolve({ ok: true, processed: count });
      }
    );
  });
}

async function processBatch(batch) {
  // 1. ML service call
  const anomalies = await detectAnomaliesForBatch(batch);
  const anomalyMap = new Map();
  anomalies.forEach(a => anomalyMap.set(a.index, a));

  for (const item of batch) {
    const anomalyData = anomalyMap.get(item.index);
    const isAnomaly = !!anomalyData;

    // 2. Send clean data to backend
    await axios.post(`${BACKEND_URL}/api/telemetry`, {
      ...item,
      is_anomaly: isAnomaly,
      anomaly_score: isAnomaly ? anomalyData.score : 0
    });

    // 3. If anomaly → send anomaly record to backend
    if (isAnomaly) {
      await axios.post(`${BACKEND_URL}/api/anomaly`, {
        ranger_id: item.ranger_id,
        timestamp: item.timestamp,
        metric: "Multi-Metric",
        value: item.metrics.heart_rate,
        score: anomalyData.score,
        severity: anomalyData.score > 0.9 ? "CRITICAL" : "HIGH",
        raw: item.metrics
      });

      // 4. Emit SSE/Socket event (backend will handle)
      await axios.post(`${BACKEND_URL}/api/events/anomaly_alert`, {
        metric: "Multi-Metric",
        timestamp: item.timestamp,
        score: anomalyData.score
      });
    }

    // 5. Live chart feed event
    await axios.post(`${BACKEND_URL}/api/events/new_data_point`, item);
  }
}

module.exports = { process };
