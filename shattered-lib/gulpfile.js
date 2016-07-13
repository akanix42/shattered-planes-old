const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const install = require("gulp-install");
const vfs = require('vinyl-fs');
const symlink = require('gulp-sym');
const bump = require('gulp-bump');
const beautify = require('gulp-beautify');
const path = require('path');
const transform = require('gulp-transform');

require("babel-register");

const dirName = path.basename(process.cwd());

gulp.task('default', [
  'transpile',
  'copy-assets',
  // 'link-rot-js', 'link-jcson',
]);

gulp.task('everything', [
  'default',
  'install-node-modules']);

gulp.task('transpile', () =>
  [
    gulp.src(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}'])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(beautify({ indentSize: 2 }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`../npm-link/${dirName}/`)),

    gulp.src(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}'])
      .pipe(watch(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}']))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(beautify({ indentSize: 2 }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`../npm-link/${dirName}/`))
  ]
);

gulp.task('copy-assets', ['bump'], () =>
  [
    gulp.src(['**', '!**.js', '!{node_modules,node_modules/**}'])
      .pipe(watch(['**', '!**.js', '!{node_modules,node_modules/**}']))
      .pipe(plumber())
      .pipe(gulp.dest(`../npm-link/${dirName}/`)),

    gulp.src(['**', '!**.js', '!{node_modules,node_modules/**}'])
      .pipe(gulp.dest(`../npm-link/${dirName}/`))
  ]
);

gulp.task('bump', () => gulp.src('package.json')
  // .pipe(transform(contents=>contents.replace('jcson')))
  .pipe(bump({ type: 'prerelease' }))
  .pipe(gulp.dest('./'))
);
//
// gulp.task('link-rot-js', () =>
//   gulp.src(['../../roguelikes/rot.js/node-deploy'])
//     .pipe(symlink(`../npm-link/${dirName}/node_modules/rot-js`))
// );
//
// gulp.task('link-jcson', () =>
//   gulp.src(['../../personal/jsonc'])
//     .pipe(symlink(`../npm-link/${dirName}/node_modules/jcson`))
// );

gulp.task('install-node-modules', ['copy-assets'], () =>
  gulp.src(`../npm-link/${dirName}/package.json`)
    .pipe(install({ production: true }))
);

