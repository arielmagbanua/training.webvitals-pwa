const {src, dest, series, watch, task} = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
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

const views = (cb) => {
  src(paths.views.src)
    .pipe(dest(paths.views.dest));

  cb();
}

const styles = (cb) => {
  src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ // minify css
      compatibility: 'ie8',
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.scss.dest));

  cb();
}

const scripts = (cb) => {
  const indexJsPath = 'src/js/index.js';
  const productsJsPath = 'src/js/products.js';

  // for index.js
  src([...paths.js.concat.files, indexJsPath])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.js.files.index))
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.js.dest));

  // for products.js
  src([...paths.js.concat.files, productsJsPath])
    .pipe(sourcemaps.init())
    .pipe(concat(paths.js.files.products))
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.js.dest));

  // for bootstrap.js
  src([...paths.js.concat.files])
    .pipe(sourcemaps.init())
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write("."))
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

task('watch', () => {
  watch(
    ['src/css/*.css', paths.scss.src, paths.js.src, paths.views.src, ...paths.images.src],
    {ignoreInitial: false},
    series(styles, scripts, views, webpImages)
  );
});

task('default', series(styles, scripts, views, webpImages));
task('images', webpImages);
