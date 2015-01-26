'use strict';
var gulp    = require('gulp');
var watch   = require('gulp-watch');
var sass    = require('gulp-sass');
var jshint  = require('gulp-jshint');
var docco   = require('gulp-docco');


// The paths to our app's files
var paths = {
  scripts: [
    './client/app/**/*.js',
    './server/**/*.js'
    ],
  styles: ['./client/styles/*.scss'],
  html: [],
  test: ['./specs/*.js']
};

// Compile SASS to CSS
gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('./client/styles/'));
});

// Lint js files using JSHint
gulp.task('jshint', function () {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Build documentation using Docco
gulp.task('docco', function () {
  gulp.src(paths.scripts)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});


// Watch when files change
gulp.task('watch', function () {
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.scripts, ['jshint']);  
});
