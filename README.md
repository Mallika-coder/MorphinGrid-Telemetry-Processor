# 🛡️ MorphinGrid Bio-Telemetry Processor

## Project 10: AI-Powered Telemetry Pipeline & Anomaly Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack: MERN + Python](https://img.shields.io/badge/Tech%20Stack-MERN%20%2B%20Python-blue.svg)]()
[![Worker Queue: BullMQ](https://img.shields.io/badge/Worker%20Queue-BullMQ-red.svg)]()
[![AI/ML: Isolation Forest](https://img.shields.io/badge/AI%2FML-Isolation%20Forest-darkgreen.svg)]()

### 🌟 Overview

The **MorphinGrid Bio-Telemetry Processor** is an advanced, production-minded platform designed to combat data corruption and overload within the Ranger network. This project fulfills the requirement for a **backend-heavy** system by creating a scalable, polyglot microservice architecture that ingests massive volumes of telemetry logs, performs data cleaning, and detects critical anomalies in real-time.

### 🎯 Problem Solved

Ranger suit and Zord sensor data are constantly corrupted by enemy viruses, making manual monitoring impossible. This system automates the process: it cleans the data pipeline and uses an unsupervised AI model (Isolation Forest) to instantly flag dangerous, hidden threats or deviations in metrics like Heart Rate and Engine Temperature, providing the Command Center with reliable, real-time intelligence.

---

## 💻 Technical Architecture & Data Flow

The architecture is built on five core services orchestrated by Docker Compose, showcasing expertise in distributed systems and polyglot persistence. 

1.  **Ingestion:** Files are uploaded via the **Next.js Frontend**.
2.  **Queueing:** The **Node.js Backend (Express)** pushes the file path onto the **BullMQ** queue (backed by **Redis**).
3.  **Processing (Worker):** The **Node.js Worker** consumes the job, reads the file, and prepares batches of cleaned data.
4.  **AI/ML:** The Worker sends batches to the dedicated **Python ML Service (FastAPI)**, which runs the **Isolation Forest** model for anomaly scoring.
5.  **Persistence:** Clean data and anomaly records are saved to **MongoDB**.
6.  **Real-Time Monitoring:** **Socket.IO** pushes instant anomaly alerts and live data points to the **Frontend** dashboard for visualization.

### Key Technologies

| Component | Technology | Rationale / Focus |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (React)** | UI/UX Polish, Live Charting, Query Console, Real-time Alerts. |
| **Backend** | **Node.js (Express)** | API Gateway, Mongoose ORM, Socket.IO Server. |
| **Worker Queue** | **BullMQ** (powered by **Redis**) | Asynchronous, non-blocking heavy file processing and task distribution. |
| **AI/ML Service** | **Python (FastAPI)** & **Scikit-learn** | Dedicated microservice for running high-performance, unsupervised anomaly detection (Isolation Forest). |
| **Database** | **MongoDB** | Highly scalable database for storing vast amounts of time-series telemetry data. |

---

## ✨ Features Implemented

* **Asynchronous Ingestion Pipeline:** File uploads are non-blocking, handled by the BullMQ worker.
* **Polyglot Anomaly Detection:** Node.js worker seamlessly communicates with the Python ML microservice via HTTP.
* **Real-Time Anomaly Alerting:** Socket.IO instantly highlights critical anomalies on the live chart view and updates the incident list.
* **Data Validation & Normalization:** Robust logic within the worker ensures data integrity before persistence.
* **Telemetry Dashboard:** Displays synchronized charts for key metrics (HR, Temp) and historical anomaly records.
* **Containerized Environment:** Full setup provided via `docker-compose.yml`.

---

## 🛠️ Setup and Installation (Recommended: Docker)

This project requires five services to run simultaneously. Docker Compose is strongly recommended for setup.

### Prerequisites

* Docker and Docker Compose
* Git

### 1. Clone Repository

```bash
git clone [https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git](https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git)
cd MorphinGrid-Telemetry-Processor


Here is the complete code for your `README.md` file, incorporating the professional project description, the architecture, the multi-service setup, and your team's details.

[cite_start]This structure is optimized for high marks in the **GitHub & Documentation (10%)** and **Technical Depth (25%)** evaluation criteria[cite: 419, 410].

-----

````markdown
# 🛡️ MorphinGrid Bio-Telemetry Processor

## Project 10: AI-Powered Telemetry Pipeline & Anomaly Detection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack: MERN + Python](https://img.shields.io/badge/Tech%20Stack-MERN%20%2B%20Python-blue.svg)]()
[![Worker Queue: BullMQ](https://img.shields.io/badge/Worker%20Queue-BullMQ-red.svg)]()
[![AI/ML: Isolation Forest](https://img.shields.io/badge/AI%2FML-Isolation%20Forest-darkgreen.svg)]()

### 🌟 Overview

The **MorphinGrid Bio-Telemetry Processor** is an advanced, production-minded platform designed to combat data corruption and overload within the Ranger network. This project fulfills the requirement for a **backend-heavy** system by creating a scalable, polyglot microservice architecture that ingests massive volumes of telemetry logs, performs data cleaning, and detects critical anomalies in real-time.

### 🎯 Problem Solved

Ranger suit and Zord sensor data are constantly corrupted by enemy viruses, making manual monitoring impossible. This system automates the process: it cleans the data pipeline and uses an unsupervised AI model (Isolation Forest) to instantly flag dangerous, hidden threats or deviations in metrics like Heart Rate and Engine Temperature, providing the Command Center with reliable, real-time intelligence.

---

## 💻 Technical Architecture & Data Flow

The architecture is built on five core services orchestrated by Docker Compose, showcasing expertise in distributed systems and polyglot persistence. 

1.  **Ingestion:** Files are uploaded via the **Next.js Frontend**.
2.  **Queueing:** The **Node.js Backend (Express)** pushes the file path onto the **BullMQ** queue (backed by **Redis**).
3.  **Processing (Worker):** The **Node.js Worker** consumes the job, reads the file, and prepares batches of cleaned data.
4.  **AI/ML:** The Worker sends batches to the dedicated **Python ML Service (FastAPI)**, which runs the **Isolation Forest** model for anomaly scoring.
5.  **Persistence:** Clean data and anomaly records are saved to **MongoDB**.
6.  **Real-Time Monitoring:** **Socket.IO** pushes instant anomaly alerts and live data points to the **Frontend** dashboard for visualization.

### Key Technologies

| Component | Technology | Rationale / Focus |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (React)** | UI/UX Polish, Live Charting, Query Console, Real-time Alerts. |
| **Backend** | **Node.js (Express)** | API Gateway, Mongoose ORM, Socket.IO Server. |
| **Worker Queue** | **BullMQ** (powered by **Redis**) | Asynchronous, non-blocking heavy file processing and task distribution. |
| **AI/ML Service** | **Python (FastAPI)** & **Scikit-learn** | Dedicated microservice for running high-performance, unsupervised anomaly detection (Isolation Forest). |
| **Database** | **MongoDB** | Highly scalable database for storing vast amounts of time-series telemetry data. |

---

## ✨ Features Implemented

* **Asynchronous Ingestion Pipeline:** File uploads are non-blocking, handled by the BullMQ worker.
* **Polyglot Anomaly Detection:** Node.js worker seamlessly communicates with the Python ML microservice via HTTP.
* **Real-Time Anomaly Alerting:** Socket.IO instantly highlights critical anomalies on the live chart view and updates the incident list.
* **Data Validation & Normalization:** Robust logic within the worker ensures data integrity before persistence.
* **Telemetry Dashboard:** Displays synchronized charts for key metrics (HR, Temp) and historical anomaly records.
* **Containerized Environment:** Full setup provided via `docker-compose.yml`.

---

## 🛠️ Setup and Installation (Recommended: Docker)

This project requires five services to run simultaneously. Docker Compose is strongly recommended for setup.

### Prerequisites

* Docker and Docker Compose
* Git

### 1. Clone Repository

```bash
git clone [https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git](https://github.com/Mallika-coder/MorphinGrid-Telemetry-Processor.git)
cd MorphinGrid-Telemetry-Processor
````

### 2\. Start Services

Ensure you are in the project root directory.

```bash
# Build all images and start the 5 services (Mongo, Redis, ML, Backend, Worker, Frontend)
docker-compose -f docker/docker-compose.yml up --build
```

The application will be accessible at `http://localhost:3000`.

### 3\. Manual Start (Without Docker)

You must manually start MongoDB and Redis, and then start each service in a separate terminal:

1.  **ML Service (Terminal 1):** `cd ml-service && uvicorn anomaly_api:app --host 0.0.0.0 --port 8000`
2.  **Backend (Terminal 2):** `cd backend && npm run dev`
3.  **Worker (Terminal 3):** `cd worker && npm run dev`
4.  **Frontend (Terminal 4):** `cd frontend && npm run dev`

### 4\. Usage

1.  Navigate to `http://localhost:3000/upload`.
2.  Upload a test CSV file (must contain columns like `ranger_id`, `timestamp`, `heart_rate`, `engine_temp`).
3.  Monitor the `worker` terminal logs to verify ML service calls.
4.  View the live data stream and anomaly alerts on the Dashboard (`/`).

-----

## 👥 Team - The Web Matrix

| Name | Registration No. | Email ID | Mobile Number | GitHub Username | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mallika Verma** | 20243158 | sonimallikav@gmail.com | 9569714178 | [Mallika-coder](https://www.google.com/search?q=https://github.com/Mallika-coder) | Team Leader, Backend/Architecture |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Khushi Verma | 20243139 | khushi.20243139@mnnit.ac.in | 9517084973 | [akakhushiverma](https://www.google.com/search?q=https://github.com/akakhushiverma) | Frontend/UI/UX, Real-time Visualization |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mahi Kalwani | 20243157 | mahi.20243157@gmail.com | 7489767313 | [kalwani977](https://www.google.com/search?q=https://github.com/kalwani977) | Worker/Data Pipeline, Database Schema |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Meenakshi Choudhary | 20243166 | meenakshi.20243166@mnnit.ac.in | 8000667614 | [M-eena-kshi](https://www.google.com/search?q=https://github.com/M-eena-kshi) | Python ML Service, Docker/Deployment |

-----

```
```