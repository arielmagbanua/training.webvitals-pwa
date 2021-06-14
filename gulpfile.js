const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');

const paths = {
  views: {
    src: 'src/views/*.html',
    dest: 'dist/views/'
  },
  scss: {
    src: 'src/css/*.scss',
    dest: 'dist/public/css/'
  }
};

const views = (cb) => {
  src(paths.views.src)
    .pipe(dest(paths.views.dest));

  cb();
}

const styles = (cb) => {
  src(paths.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(paths.scss.dest));

  cb();
}

exports.watch = () => {
  watch(['src/css/*', 'src/views/*.html'], {ignoreInitial: false}, series(styles, views));
}

exports.default = series(styles, views);
