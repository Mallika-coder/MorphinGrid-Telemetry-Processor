# 🛡️ MorphinGrid Bio-Telemetry Processor

## Project 10: AI-Powered Telemetry Pipeline & Anomaly Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack: MERN + Python](https://img.shields.io/badge/Tech%20Stack-MERN%20%2B%20Python-blue.svg)]()
[![Worker Queue: BullMQ](https://img.shields.io/badge/Worker%20Queue-BullMQ-red.svg)]()
[![AI/ML: Isolation Forest](https://img.shields.io/badge/AI%2FML-Isolation%20Forest-darkgreen.svg)]()

---

## 1. 🌟 Project Overview

The **MorphinGrid Bio-Telemetry Processor** is an advanced, production-minded platform designed to combat data corruption and overload within the Ranger network. This project creates a **scalable, polyglot microservice architecture** that ingests massive volumes of telemetry logs, performs data cleaning, and detects critical anomalies in real-time.

This system moves beyond simple data storage to provide intelligent, verified, and real-time intelligence for high-stakes operational environments.

---

## 2. 🎯 Problem Statement (PS Number 10)

* **Problem:** Ranger suit and Zord sensor data are constantly corrupted by enemy viruses, making manual monitoring impossible. The massive volumes of telemetry logs are unreliable and unusable due to corruption and overload.
* **Objective:** To build a robust, scalable backend pipeline capable of serving clean, verified telemetry data and detecting hidden threats or anomalies.
* **Selected Idea:** Project 10: Build a backend pipeline that ingests real telemetry data, validates it, processes it, stores it, and exposes analysis APIs.

---

## 3. 💻 System Architecture / High-level Design

The architecture is built on **five core microservices** orchestrated by Docker Compose, showcasing expertise in distributed systems and polyglot persistence. 

| Service | Technology | Role in Pipeline |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (React)** | UI/UX, Live Charting, Real-time Alerts. |
| **Backend** | **Node.js (Express)** | API Gateway, pushes file paths onto the BullMQ queue. |
| **Worker Queue** | **BullMQ / Redis** | Manages asynchronous, non-blocking heavy file processing. |
| **Processing Worker** | **Node.js Worker** | Consumes jobs, performs data cleaning/validation, and sends data to the ML Service. |
| **AI/ML Service** | **Python (FastAPI)** | Dedicated microservice for high-performance anomaly detection. |
| **Database** | **MongoDB** | Highly scalable storage for time-series telemetry data. |

---

## 4. 🧠 AI/ML Integration Details

* **Model:** Unsupervised **Isolation Forest** (Scikit-learn).
* **Process:** The Node.js Worker sends batches of cleaned data to the dedicated Python ML Service (FastAPI). The model instantly flags dangerous, hidden threats or deviations (anomalies) in metrics like Heart Rate and Engine Temperature.
* **Implementation:** Achieved via **Polyglot Anomaly Detection**, where the Node.js worker seamlessly communicates with the Python ML microservice via HTTP.

---

## 5. ✨ Features Implemented

The following core features have been successfully implemented:

* **Asynchronous Ingestion Pipeline:** File uploads are non-blocking, managed by the BullMQ worker.
* **Polyglot Anomaly Detection:** Node.js worker communicates with the Python ML microservice over HTTP.
* **Real-Time Anomaly Alerting:** **Socket.IO** instantly highlights critical anomalies on the live chart view and updates the incident list.
* **Data Validation & Normalization:** Robust logic within the worker ensures data integrity before persistence.
* **Telemetry Dashboard:** Displays synchronized charts for key metrics (HR, Temp) and historical anomaly records.
* **Containerized Environment:** Full setup provided via `docker-compose.yml` for simplified deployment and environment parity.

---

## 6. 📚 API Documentation (Key Endpoints)

| Endpoint | Method | Service | Description | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `/api/upload-telemetry` | `POST` | Node.js Backend | Secure API for uploading CSV/JSON files. Pushes job to BullMQ queue. | Non-blocking heavy file ingestion. |
| `/api/query-logs` | `GET` | Node.js Backend | Retrieves processed logs based on time-range, Ranger ID, and summary statistics. | Front-end data querying and filtering. |
| `/ml/predict-anomaly` | `POST` | Python ML Service | Receives a batch of data from the Worker and returns anomaly scores. | Dedicated, high-performance ML scoring. |

**Real-Time Channel:** Socket.IO is used to stream `telemetry_alert` events for live visualization.

---

## 7. 🛠️ Setup and Installation (Recommended: Docker)

This project requires five services to run simultaneously.

### Prerequisites

* Docker and Docker Compose
* Git

### 1. Clone Repository

```bash
git clone [https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git](https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git)
cd MorphinGrid-Telemetry-Processor
2. Start Services
Ensure you are in the project root directory.

Bash

# Build all images and start the 5 services (Mongo, Redis, ML, Backend, Worker, Frontend)
docker-compose -f docker/docker-compose.yml up --build
The application will be accessible at http://localhost:3000.

8. 🛑 Error Handling & Reliability Considerations
Asynchronous Resilience: Using BullMQ ensures that if any worker process fails during heavy computation, the job can be automatically retried or failed gracefully, preventing data loss.

Microservice Isolation: Docker containerization ensures that a catastrophic failure in one service (e.g., the ML service) does not affect the stability of the API Gateway or the Frontend.

Data Validation: Logic is implemented to manage corrupted or suspicious data points flagged by the virus, ensuring only clean data is persisted.

9. 🔭 Future Improvements
To elevate this to a true startup-grade product, the next steps include:

Blockchain Integration: Implement a Smart Contract on a network like Polygon to store immutable hash proofs (e.g., Merkle Root) of the processed data batches. This guarantees verifiable data integrity and non-tampering.

Advanced ML Models: Integrate a more sophisticated time-series model like an Autoencoder or LSTM for complex pattern detection.

User Authentication & Authorization: Implement JWT-based security to protect API endpoints.

Deployment: Deploy the Frontend to Vercel/Netlify and the Backend services to AWS/GCP using Docker.

-----

10. 👥 Team - The Web Matrix

| Name | Registration No. | Email ID | Mobile Number | GitHub Username | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mallika Verma** | 20243158 | sonimallikav@gmail.com | 9569714178 | [Mallika-coder](https://www.google.com/search?q=https://github.com/Mallika-coder) | Team Leader, Backend/Architecture |
| Khushi Verma | 20243139 | khushi.20243139@mnnit.ac.in | 9517084973 | [akakhushiverma](https://www.google.com/search?q=https://github.com/akakhushiverma) | Frontend/UI/UX, Real-time Visualization |
| Mahi Kalwani | 20243157 | mahi.20243157@gmail.com | 7489767313 | [kalwani977](https://www.google.com/search?q=https://github.com/kalwani977) | Worker/Data Pipeline, Database Schema |
| Meenakshi Choudhary | 20243166 | meenakshi.20243166@mnnit.ac.in | 8000667614 | [M-eena-kshi](https://www.google.com/search?q=https://github.com/M-eena-kshi) | Python ML Service, Docker/Deployment |
```
```
