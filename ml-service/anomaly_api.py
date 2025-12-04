# python -m venv venv && source venv/bin/activate && pip install -r requirements.txt
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import json

app = FastAPI(title="Anomaly Detection Microservice")

# Pydantic model for input data validation
class TelemetryData(BaseModel):
    data: list # List of objects containing metrics

# Isolation Forest Model Initialization (Train on startup/dummy data)
# In a real app, this model would be pre-trained and loaded from disk.
def train_dummy_model():
    # Dummy data for demonstration: normal values clustered around (80, 120)
    X_normal = np.random.normal(loc=[80, 120], scale=[5, 10], size=(1000, 2))
    df = pd.DataFrame(X_normal, columns=['heart_rate', 'engine_temp'])
    
    # contamination=0.01 means we expect 1% of data to be anomalies
    model = IsolationForest(contamination=0.01, random_state=42)
    model.fit(df)
    print("Isolation Forest Model Trained on Dummy Data.")
    return model

IF_MODEL = train_dummy_model()

@app.post("/predict")
async def predict_anomalies(telemetry: TelemetryData):
    try:
        # 1. Convert list of dicts to Pandas DataFrame
        df = pd.DataFrame(telemetry.data)
        
        # 2. Select features used for training
        features = df[['heart_rate', 'engine_temp']]
        
        # 3. Predict: -1 for anomaly, 1 for normal
        predictions = IF_MODEL.predict(features)
        
        # 4. Extract anomaly scores (lower score is more anomalous)
        # Note: We invert the decision function output to get a positive 'score' for anomalies
        anomaly_scores = IF_MODEL.decision_function(features)
        
        results = []
        # 5. Compile results
        for idx, (pred, score) in enumerate(zip(predictions, anomaly_scores)):
            is_anomaly = bool(pred == -1)
            # Use 1 - score for a score closer to 1 being anomalous
            normalized_score = 1 - (score / np.min(anomaly_scores))
            
            if is_anomaly:
                results.append({
                    "index": idx,
                    "is_anomaly": True,
                    "score": float(normalized_score),
                    "metrics": df.iloc[idx].to_dict()
                })
        
        return {"anomalies": results}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))