const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  // resolve the mode
  let mode = 'development';
  if (!argv && !env.NODE_ENV) {
    mode = 'development'
  } else {
    mode = argv ? argv.mode : env.NODE_ENV;
  }

  return {
    mode: mode,
    entry: {
      indexStyles: [
        './src/js/index.styles.js'
      ],
      index: [
        './src/js/addToHomeScreen.js',
        './src/js/index.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
      ],
      productsStyles: [
        './src/js/products.styles.js'
      ],
      products: [
        './src/js/products.js',
        './node_modules/bootstrap/dist/js/bootstrap.js'
      ],
      serviceWorker: {
        import: './src/js/sw.js',
        filename: '../sw.js'
      }
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
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: './src/js/manifest.json',
            to: '../'
          },
        ],
      }),
    ],
    output: {
      filename: mode == 'development' ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist/public/js'),
      clean: true,
    },
  };
}
