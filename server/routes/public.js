const express = require('express');
const axios = require('axios').default;
require('dotenv').config();

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    layout: 'index'
  });
});

router.get('/products', async (req, res, next) => {
  const sku = req.query.sku;

  if (!sku) {
    return res.render('products', {
      layout: 'products'
    });
  }

  const baseUrl = process.env.APP_URL ?? 'http://127.0.0.1';
  const appUrl = baseUrl + ':' + process.env.PORT;

  // grab the product
  const productUrl = appUrl + '/api/products/' + sku;
  const product = await axios.get(productUrl);

  res.render('product', {
    layout: 'product',
    product: product.data
  });
});

module.exports = router;
