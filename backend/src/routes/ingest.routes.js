const express = require('express');
const router = express.Router();
const multer = require('multer');
const { enqueueFile } = require('../controllers/ingest.controller');

const upload = multer({ dest: 'uploads/' });
router.post('/file', upload.single('file'), enqueueFile);

module.exports = router;