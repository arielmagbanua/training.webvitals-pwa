const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');
const axios = require('axios').default;
require('dotenv').config();

const router = express.Router();

// presentation layer main directory
const viewsDir = '../dist/views';

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, viewsDir, 'index.html'));
});

router.get('/products', (req, res, next) => {
  res.sendFile(path.join(rootDir, viewsDir, 'products.html'));
});

router.get('/products/:sku', async (req, res, next) => {
  const sku = req.params.sku;

  const appUrl = process.env.APP_URL ?? 'http://127.0.0.1/';

  // grab the product
  const productUrl = appUrl + 'api/products/' + sku;
  const product = await axios.get(productUrl);

  res.render('product', {
    layout: 'product',
    product: product.data
  });
});

module.exports = router;
