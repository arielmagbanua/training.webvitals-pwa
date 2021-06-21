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
    let categories = categorySegment.split(/[\s.,;()]+/i);
    categories.pop();
    categories.shift();

    // get the feature
    let feature = lodash.findLast(categories, function (category) {
      return category === 'feature1' || category === 'feature2' || category === 'feature3';
    });

    categories = lodash.without(categories, 'feature1', 'feature2', 'feature3');

    switch (feature) {
      case 'feature1':
        feature = 1;
        break;
      case 'feature2':
        feature = 2;
        break;
      case 'feature3':
        feature = 3;
        break;
      default:
        feature = null;
    }

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
      "featureType": feature
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