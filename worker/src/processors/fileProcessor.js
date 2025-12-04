const { parseCSV } = require('../../backend/src/utils/fileParser');
const TelemetryClean = require('../../backend/src/models/TelemetryClean');
const Anomaly = require('../../backend/src/models/Anomaly');
const { detectAnomaliesForBatch } = require('./anomalyDetection');
const fs = require('fs');
const path = require('path');
const { emit } = require('../../backend/src/socket');

async function process(data) {
  const { filePath, originalName, jobId } = data;
  return new Promise((resolve, reject) => {
    const batch = [];
    let rowIndex = 0;
    parseCSV(filePath, row => {
      // Basic normalization placeholder: map CSV columns to expected structure
      const normalized = {
        ranger_id: row.ranger_id || row.RangerID || 'unknown',
        timestamp: new Date(row.timestamp || row.time || Date.now()),
        metrics: {
          heart_rate: parseFloat(row.heart_rate || row.hr || 0),
          engine_temp: parseFloat(row.engine_temp || row.temp || 0)
        },
        index: rowIndex++
      };
      batch.push(normalized);

      if (batch.length >= 500) {
        // Process batch asynchronously
        processBatch(batch.splice(0)); // Pass a copy and clear batch
      }
    }, async (count) => {
      // process remaining
      if (batch.length) {
        await processBatch(batch);
      }
      // optional: remove file
      try { fs.unlinkSync(filePath); } catch(e){}
      resolve({ ok: true, processed: count });
    });
  });
}

async function processBatch(batch) {
    // 1. Call Python ML Service
    const anomalies = await detectAnomaliesForBatch(batch); 
    const anomalyMap = new Map();
    anomalies.forEach(a => anomalyMap.set(a.index, a));
    
    // 2. Insert Clean Data and Anomaly Records
    for (const item of batch) {
        const anomalyData = anomalyMap.get(item.index);
        const isAnomaly = !!anomalyData;

        await TelemetryClean.create({ 
            ...item, 
            is_anomaly: isAnomaly, 
            anomaly_score: isAnomaly ? anomalyData.score : 0 
        });

        if (isAnomaly) {
            await Anomaly.create({
                ranger_id: item.ranger_id,
                timestamp: item.timestamp,
                metric: 'Multi-Metric', // Isolation Forest looks at all metrics
                value: item.metrics.heart_rate, // Use HR as representative value
                score: anomalyData.score,
                severity: anomalyData.score > 0.9 ? 'CRITICAL' : 'HIGH',
                raw: item.metrics
            });
            emit('anomaly_alert', { metric: 'Multi-Metric', timestamp: item.timestamp, score: anomalyData.score });
        }
        
        // Emit one data point for the live chart feed
        emit('new_data_point', item);
    }
}

module.exports = { process };