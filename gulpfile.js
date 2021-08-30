const {src, dest, series, watch, task} = require('gulp');
var del = require('del');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const paths = {
  views: {
    src: 'src/views/*.html',
    dest: 'dist/views/'
  },
  scss: {
    src: 'src/css/*.scss',
    dest: 'dist/public/css/'
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dist/public/js/',
    concat: {
      files: [
        './node_modules/bootstrap/dist/js/bootstrap.js'
      ]
    },
    files: {
      index: 'index.js',
      products: 'products.js'
    }
  },
  images: {
    src: [
      'src/images/*.jpg',
      'src/images/*.jpeg',
      'src/images/*.png',
      'src/images/**/*.jpg',
      'src/images/**/*.jpeg',
      'src/images/**/*.png'
    ],
    base: 'src/images/',
    dest: 'dist/public/images/'
  }
};

const scripts = (cb) => {
  // this include the compiling of css and sass files
  const webpackConfig = require('./webpack.config.js')(process.env);

  src([paths.js.src, paths.scss.src])
    .pipe(webpackStream(webpackConfig, webpack)) // pipe the webpack
    .pipe(dest(paths.js.dest));

  cb();
}

const webpImages = (cb) => {
  // the quality of compression.
  const quality = 100;
  const maxWidth = 1920;

  // 1920 resizing for desktops.
  imagemin([...paths.images.src], {
    destination: __dirname + '/dist/public/images/',
    plugins: [
      imageminWebp({
        quality: quality,
        resize: {
          width: maxWidth,
          height: 0
        }
      })
    ]
  });

  // 800 and 500 width resizing for mobile and tablets.
  [25, 50, 75].forEach((percent) => {
    const percentage = maxWidth * ((100 - percent) / 100);
    const width = Math.round(maxWidth - percentage);

    imagemin([...paths.images.src], {
      destination: __dirname + `/dist/public/images/${percent}`,
      plugins: [
        imageminWebp({
          quality: quality,
          resize: {
            width: width,
            height: 0
          }
        })
      ]
    });
  });

  cb();
}

const clean = (cb) => {
  // clean up the dist folder
  del([
    'dist/**'
  ])

  cb();
}

const tasks = series(clean, scripts, webpImages);

task('watch', () => {
  watch(
    ['src/css/*.css', paths.scss.src, paths.js.src, paths.views.src, ...paths.images.src],
    {ignoreInitial: false},
    tasks
  );
});

task('default', tasks);
task('scripts', scripts);
task('images', webpImages);
