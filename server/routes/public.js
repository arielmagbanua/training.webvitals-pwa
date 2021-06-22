const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');

const router = express.Router();

// presentation layer main directory
const viewsDir = '../dist/views';

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, viewsDir, 'index.html'));
});

router.get('/products', (req, res, next) => {
  res.sendFile(path.join(rootDir, viewsDir, 'products.html'));
});

module.exports = router;
