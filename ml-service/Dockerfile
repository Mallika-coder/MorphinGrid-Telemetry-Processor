FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY ml-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY ml-service/anomaly_api.py .

EXPOSE 8000

CMD ["uvicorn", "anomaly_api:app", "--host", "0.0.0.0", "--port", "8000"]