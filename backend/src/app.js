require('dotenv').config(); 
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ingestRoutes = require('./routes/ingest.routes');
const dataRoutes = require('./routes/data.routes');
require('./config/db')();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/ingest', ingestRoutes);
app.use('/api/data', dataRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;