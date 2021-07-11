const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const webp = require('gulp-webp');

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

const views = (cb) => {
  src(paths.views.src)
    .pipe(dest(paths.views.dest));

  cb();
}

const styles = (cb) => {
  src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.scss.dest));

  cb();
}

const scripts = (cb) => {
  const bootstrap = 'node_modules/bootstrap/dist/js/bootstrap.js';
  const indexJsPath = 'src/js/index.js';
  const productsJsPath = 'src/js/products.js';

  src([...paths.js.concat.files, indexJsPath])
    .pipe(sourcemaps.init())
    .pipe(concat(bootstrap))
    .pipe(concat(paths.js.files.index))
    .pipe(babel({
      presets: ['@babel/env']
     }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.js.dest));

  src([...paths.js.concat.files, productsJsPath])
      .pipe(sourcemaps.init())
      .pipe(concat(bootstrap))
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(sourcemaps.write("."))
      .pipe(dest(paths.js.dest));

  cb();
}

const images = (cb) => {
  src([...paths.images.src])
    .pipe(flatten())
    .pipe(webp())
    .pipe(dest(paths.images.dest));

  cb();
}

exports.watch = () => {
  watch(
    ['src/css/*.css', paths.scss.src, paths.js.src, paths.views.src, ...paths.images.src],
    {ignoreInitial: false},
    series(styles, scripts, images, views)
  );
}

exports.default = series(styles, scripts, images, views);
