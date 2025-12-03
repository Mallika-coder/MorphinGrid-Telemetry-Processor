const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/summary', dataController.summary);
router.get('/query', dataController.query);
router.get('/anomalies', dataController.anomalies);

module.exports = router;