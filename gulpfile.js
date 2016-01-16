'use strict'

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('browserify', () => {
  return browserify({ entries: ['./src/js/renderer/index.js']})
    .transform(babelify, { presets: ['es2015']})
    .bundle()
    .pipe(source('dist/bundle.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('build:js', () => {
  return gulp.src(['src/js/main.js'])
    .pipe(gulp.dest('dist'));
});
gulp.task('build:html', () => {
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
gulp.task('build', ['browserify', 'build:js', 'build:html']);