const path = require('path');

module.exports = {
  entry: {
    index: './src/js/index.js',
    products: './src/js/products.js',
    vendor: [
      './node_modules/bootstrap/dist/js/bootstrap.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public/js'),
  },
};
