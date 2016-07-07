const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const lockFile = require('lockfile');
const install = require("gulp-install");
const vfs = require('vinyl-fs');
const symlink = require('gulp-sym');
const bump = require('gulp-bump');

gulp.task('default', ['lock', 'transpile', 'copy-assets', 'link-shattered-lib', 'link-rot-js', 'link-jcson', 'install-node-modules'], () => {
  // lockFile.unlockSync('gulpfile.lock');
});

gulp.task('lock', ()=> {
  // if (lockFile.checkSync('gulpfile.lock')) {
  //   console.log('Gulp already running, exiting!');
  //   process.exit(0);
  // }
  // lockFile.lockSync('gulpfile.lock');
});

gulp.task('transpile', () =>
  [
    gulp.src(['**/*.js', '!{node_modules,node_modules/**}'])
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('../npm-link/shattered-game/')),

    gulp.src(['**/*.js', '!{node_modules,node_modules/**}'])
      .pipe(watch('src/**/*.js'))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('../npm-link/shattered-game/'))
  ]
);

gulp.task('copy-assets', ['bump'], () =>
  [
    gulp.src(['**/*', '!**/*.js', '!{node_modules,node_modules/**}'])
      .pipe(watch(['**/*', '!**/*.js', '!{node_modules,node_modules/**}']))
      .pipe(plumber())
      .pipe(gulp.dest('../npm-link/shattered-game/')),

    gulp.src(['**/*', '!**/*.js', '!{node_modules,node_modules/**}'])
      .pipe(gulp.dest('../npm-link/shattered-game/'))
  ]
);

gulp.task('bump', () => gulp.src('package.json')
  .pipe(bump({ type: 'prerelease' })));

gulp.task('link-shattered-lib', () =>
  gulp.src(['../shattered-lib'])
    .pipe(symlink('../npm-link/shattered-game/node_modules/shattered-lib'))
);

gulp.task('link-rot-js', () =>
  gulp.src(['../../roguelikes/rot.js/node-deploy'])
    .pipe(symlink('../npm-link/shattered-game/node_modules/rot-js'))
);

gulp.task('link-jcson', () =>
  gulp.src(['../../personal/jsonc'])
    .pipe(symlink('../npm-link/shattered-game/node_modules/jcson'))
);

gulp.task('install-node-modules', () =>
    gulp.src('../npm-link/shattered-game/package.json')
    // .pipe(watch('src/**/*.js'))
      .pipe(install({ production: true }))
  // .pipe(gulp.dest('../npm-link/shattered-game/node_modules'))
);
