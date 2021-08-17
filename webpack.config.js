const path = require('path');

module.exports = {
  entry: {
    index: './src/js/index.js',
    products: './src/js/products.js',
    vendor: [
      './node_modules/bootstrap/dist/js/bootstrap.js'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public/js'),
  },
};
