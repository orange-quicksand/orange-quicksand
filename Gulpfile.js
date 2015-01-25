'use strict';
var gulp    = require('gulp');
var watch   = require('gulp-watch');
var sass    = require('gulp-sass');
var jshint  = require('gulp-jshint');


// The paths to our app files
var paths = {
  scripts: [
    './client/app/**/*.js',
    './server/**/*.js'
    ],
  styles: ['./client/styles/*.scss'],
  html: [],
  test: ['./specs/*.js']
};

gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('./client/styles/'));
});

gulp.task('jshint', function () {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch when files change
gulp.task('watch', function () {
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.scripts, ['jshint']);  
});
