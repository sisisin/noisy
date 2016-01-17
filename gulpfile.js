'use strict'

const gulp = require('gulp');
const babel = require('gulp-babel');
const watchify = require('gulp-watchify');

const rendererProcPath = ['src/js/renderer/*.js'];
const mainProcPath = ['src/js/main.js'];
const htmlPath = ['src/index.html'];
const fontsPath = ['src/fonts/*.*'];
const lessPath = ['src/less/*.*'];

gulp.task('build:rendererProc'
  , () => gulp.src(rendererProcPath, { base: 'src/js' })
    .pipe(babel())
    .pipe(gulp.dest('_tmp')));

gulp.task('build:mainProc'
  , () => gulp.src(mainProcPath)
    .pipe(babel())
    .pipe(gulp.dest('dist')));

gulp.task('static:html', () => gulp.src(htmlPath).pipe(gulp.dest('dist')));
gulp.task('static:fonts', () => gulp.src(fontsPath, { base: 'src'}).pipe(gulp.dest('dist')));
gulp.task('build:css', () => gulp.src(lessPath).pipe(gulp.dest('dist/css')));

let watching = false;
gulp.task('enable-watch-mode', () => watching = true);

gulp.task('browserify', watchify((watchify) => {
  return gulp.src('_tmp/renderer/index.js')
    .pipe(watchify({ watch: watching }))
    .pipe(gulp.dest('dist'));
}));

gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('watch', ['build', 'enable-watch-mode', 'watchify'], () => {
  gulp.watch([...htmlPath, ...fontsPath, ...lessPath], ['build:static']);
  gulp.watch(mainProcPath, ['build:mainProc']);
  return gulp.watch(rendererProcPath, ['build:rendererProc']);
});

// TODO:buildしたあとじゃないとwatchがうまく動かない
gulp.task('default', ['build']);
gulp.task('build', ['build:rendererProc', 'build:mainProc', 'build:css', 'static:html', 'static:fonts']);
gulp.task('build:static', ['build:css', 'static:html', 'static:fonts']);
