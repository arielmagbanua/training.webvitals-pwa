require('dotenv').config();
const path = require('path');
const fs = require('fs');
const faker = require('faker');
const lodash = require('lodash');

const DIR_PATH = path.join(__dirname, '../../src/images/bags');
const DB_PATH = path.join(__dirname, 'db.json');
const BASE_URL = process.env.APP_URL || 'http://localhost:8080/';

// passing directoryPath and callback function
fs.readdir(DIR_PATH, function (err, files) {
  // handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const products = [];

  // listing all files using forEach
  files.forEach(function (filename) {
    // do whatever you want to do with the file
    const [_, brand, categorySegment] = filename.split('-');

    // extract the categories of the product
    const categories = categorySegment.split(/[\s.,;()]+/i);
    categories.pop();
    categories.shift();

    const productName = faker.name.firstName() + ' Bag';
    const sku = faker.datatype.uuid();
    const productDescription = 'Amazing ' + faker.commerce.productAdjective() + ' Bag';
    const productPrice = faker.commerce.price();

    const product = {
      "id": sku,
      "sku": sku,
      "name": productName,
      "description": productDescription,
      "url": BASE_URL + 'products/' + sku,
      "category": categories,
      "brand": brand,
      "price": productPrice,
      "featureType": lodash.random(1, 3)
    };

    products.push(product);
  });

  // write it as db.json for json server
  const productsData = JSON.stringify(products, null, 2);

  fs.writeFile(DB_PATH, productsData, (err) => {
    if (err) {
      throw err;
    }

    console.log('seeding done.');
  });
});
