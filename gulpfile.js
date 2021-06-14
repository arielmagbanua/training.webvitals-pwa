const { src, dest, watch, series } = require('gulp');

const paths = {
  views: {
    src: 'src/views/*.html',
    dest: 'dist/views/'
  },
  css: {
    src: 'src/css/*',
    dest: 'dist/public/css/'
  }
};

const views = (cb) => {
  src(paths.views.src)
    .pipe(dest(paths.views.dest));

  cb();
}

const styles = (cb) => {
  src(paths.css.src)
    .pipe(dest(paths.css.dest));

  cb();
}

exports.watch = () => {
  watch(['src/css/*', 'src/views/*.html'], series(styles, views));
}

exports.default = series(styles, views);
