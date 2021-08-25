const express = require('express');
const path = require('path');
const findFiles = require('file-regex');
const axios = require('axios').default;
require('dotenv').config();
const router = express.Router();

const rootDir = require('../utils/path');
const publicJsDir = path.join(rootDir, '../dist/public/js');

async function findAsset(directory, regexPattern) {
  return await findFiles(directory, regexPattern)
    .then((result) => {
      return result[0].file;
    })
    .catch((_) => {
      return 'index.bundle.js';
    });
}

router.get('/', async (req, res, next) => {
  // resolve the correct index js bundle
  const pageJs = await findAsset(publicJsDir, /index\.([a-zA-Z0-9]+)\.bundle\.js$/);
  const vendorJs = await findAsset(publicJsDir, /vendor\.([a-zA-Z0-9]+)\.bundle\.js$/);

  res.render('index', {
    layout: 'index',
    jsPath: '/js/' + pageJs,
    vendorJsPath: '/js/' + vendorJs,
  });
});

router.get('/products', async (req, res, next) => {
  const sku = req.query.sku;

  if (!sku) {
    // resolve the correct products js bundle
    const pageJs = await findAsset(publicJsDir, /products\.([a-zA-Z0-9]+)\.bundle\.js$/);
    return res.render('products', {
      layout: 'products',
      jsPath: '/js/' + pageJs
    });
  }

  const baseUrl = process.env.APP_URL ?? 'http://127.0.0.1';
  const appUrl = baseUrl + ':' + process.env.PORT;

  // grab the product
  const productUrl = appUrl + '/api/products/' + sku;
  const product = await axios.get(productUrl);

  // resolve the correct product js bundle
  const pageJs = await findAsset(publicJsDir, /products\.([a-zA-Z0-9]+)\.bundle\.js$/);

  res.render('product', {
    layout: 'product',
    product: product.data,
    jsPath: '/js/' + pageJs
  });
});

module.exports = router;
