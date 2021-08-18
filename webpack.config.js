const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: {
      index: [
        './src/js/index.styles.js',
        './src/js/index.js'
      ],
      products: [
        './src/js/products.styles.js',
        './src/js/products.js'
      ],
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
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  '@babel/transform-runtime', {'regenerator': true}
                ]
              ]
            }
          }
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        }
      ]
    },
    output: {
      filename: argv.mode == 'development' ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist/public/js'),
      clean: true,
    },
  };
}
