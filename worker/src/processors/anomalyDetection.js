const axios = require('axios');

async function detectAnomaliesForBatch(batch) {
    const mlInput = batch.map(item => item.metrics);
    
    try {
        const response = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, { data: mlInput });
        return response.data.anomalies || [];
    } catch (error) {
        console.error('ML Service Error:', error.message);
        // Fallback: If ML service fails, return no anomalies (or implement simple threshold check here)
        return [];
    }
}

module.exports = { detectAnomaliesForBatch };