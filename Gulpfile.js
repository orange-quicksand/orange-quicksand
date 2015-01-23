'use strict';
var gulp  = require('gulp');
var sass  = require('gulp-sass');
var watch = require('gulp-watch');

// The paths to our app files
var paths = {
  scripts: ['./client/app/*.js'],
  html: [],
  styles: ['./client/styles/*.scss'],
  test: ['./specs/*.js']
};

// Sass
gulp.task('sass', function () {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('./client/styles/'));
});

// Watch when files change
gulp.task('watch', function () {
  gulp.watch('./client/styles/*.scss', ['sass']);
});
