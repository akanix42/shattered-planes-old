const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('transpile', () =>
  gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
);
