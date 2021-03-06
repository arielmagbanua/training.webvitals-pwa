require('dotenv').config();
const path = require('path');
const fs = require('fs');
const faker = require('faker');
const lodash = require('lodash');

const DIR_PATH = path.join(__dirname, '../../src/images/bags');
const DB_PATH = path.join(__dirname, 'db.json');
const BASE_URL = process.env.APP_URL || '/';

// changes the file extension of the image
const changeFileExtension = (filename, extension = '.webp') => {
  if (filename) {
    let pos = filename.lastIndexOf(".");
    return filename.substr(0, pos < 0 ? filename.length : pos) + extension;
  }

  return null;
}

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
    const productDescription = 'Amazing ' + faker.commerce.productAdjective() + ' Bag.';
    const productPrice = faker.commerce.price();

    const additionalDescription = feature === 3 ? ' Imported and newly arrived from ' + lodash.sample([
      'Italy', 'France', 'Spain', 'USA'
    ]) + '!' : '';

    const product = {
      "id": sku,
      "sku": sku,
      "name": productName,
      "description": productDescription + additionalDescription,
      "images": {
        "original": BASE_URL + 'images/' + changeFileExtension(filename),
        "small": BASE_URL + 'images/25/' + changeFileExtension(filename),
        "medium": BASE_URL + 'images/50/' + changeFileExtension(filename),
        "large": BASE_URL + 'images/75/' + changeFileExtension(filename)
      },
      "url": BASE_URL + 'products?sku=' + sku,
      "category": categories,
      "brand": brand,
      "price": productPrice,
      "featureType": feature
    };

    products.push(product);
  });

  const db = {
    "products": products
  }

  // write it as db.json for json server
  const dbStr = JSON.stringify(db, null, 2);

  fs.writeFile(DB_PATH, dbStr, (err) => {
    if (err) {
      throw err;
    }

    console.log('seeding done.');
  });
});
