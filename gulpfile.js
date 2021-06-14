const gulp = require('gulp');

const paths = {
  views: {
    src: 'src/views/*.html',
    dest: 'dist/views/'
  }
};

function defaultTask(cb) {
  // place code for your default task here
  cb();

  console.log('default task.')
}

exports.default = defaultTask

function views() {
  return gulp.src(paths.views.src)
    .pipe(gulp.dest(paths.views.dest))
}

exports.views = views;
