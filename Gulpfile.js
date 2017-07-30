var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  babel = require('gulp-babel');

gulp.task('scripts', function() {
  gulp
    .src(['app/main.js'])
    .pipe(
      browserify({
        debug: true,
        transform: ['reactify']
      })
    )
    .pipe(gulp.dest('./public/assets/js/'));
});

gulp.task('default', ['scripts']);
