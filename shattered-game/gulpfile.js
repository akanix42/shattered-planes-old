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
const indexDirectory = require('../builder/index-directory');
const beautify = require('gulp-beautify');
const path = require('path');

require('babel-register');
require('app-module-path').addPath(`../npm-link`);

const dirName = path.basename(process.cwd());

gulp.task('default', [
  'transpile',
  'copy-assets',
  // 'link-shattered-lib', 'link-rot-js', 'link-jcson',
  'install-node-modules'
]);

gulp.task('transpile', ['watch-transpile', 'copy-assets', 'index-components', 'index-entity-templates', 'index-level-generators'], () =>
  [
    gulp.src(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}'])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(beautify({ indentSize: 2 }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`../npm-link/${dirName}/`)),

  ]
);
gulp.task('watch-transpile', ()=>
  gulp.src(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}'])
    .pipe(watch(['**/*.js', "!gulpfile.js", '!{node_modules,node_modules/**}']))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(beautify({ indentSize: 2 }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`../npm-link/${dirName}/`))
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
  .pipe(bump({ type: 'prerelease' }))
  .pipe(gulp.dest('./')));
//
// gulp.task('link-shattered-lib', () =>
//   gulp.src(['../npm-link/shattered-lib'])
//     .pipe(symlink('../npm-link/shattered-game/node_modules/shattered-lib'))
// );
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

gulp.task('index-components', ()=> {
  const indexComponents = ()=> indexDirectory('components', ['!*.js', '*.tests.js']);
  indexComponents();
  watch(['components/**/*.js', '!components/index.js'], ()=> {
    indexComponents();
  });
});

gulp.task('index-level-generators', ()=> {
  const indexLevelGenerators = ()=> indexDirectory('level-generators', ['!*.js', '*.tests.js']);
  indexLevelGenerators();
  watch(['level-generators/**/*.js', '!level-generators/index.js'], ()=> {
    indexLevelGenerators();
  });
});

gulp.task('index-entity-templates', ()=> {
  const indexTemplates = ()=> indexDirectory('data/entities', ['!*.js', '*.tests.js']);
  indexTemplates();
  watch(['data/entities/**/*.js', '!data/entities/index.js'], ()=> {
    try {
      indexTemplates();
    } catch (ex) {

    }
  });
});
