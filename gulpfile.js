const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const rollup = require('gulp-rollup');
const concat = require('gulp-concat');

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
  src([...paths.js.concat.files, paths.js.src])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.js.files.index))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.js.dest));

  cb();
}

exports.watch = () => {
  watch(
    ['src/css/*.css', paths.scss.src, paths.js.src, paths.views.src],
    {ignoreInitial: false},
    series(styles, scripts, views)
  );
}

exports.default = series(styles, scripts, views);
