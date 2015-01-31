'use strict';
var gulp    = require('gulp');
var watch   = require('gulp-watch');
var sass    = require('gulp-ruby-sass');
var jshint  = require('gulp-jshint');
var docco   = require('gulp-docco');
var shell   = require('gulp-shell');
var concat  = require('gulp-concat');
var del     = require('del');


// The paths to our app's files
var paths = {
  scripts: [
          './client/app/**/*.js',
          './server/**/*.js'
  ],
  styles : ['.client/styles'],
  scss: ['./client/styles/**/*.scss'],
  test:   ['./specs/**/*.js']
};

gulp.task('clean', function() {
  del(['./client/styles/**/*.css']);
  del(['./client/styles/**/*.css.map']);
});

gulp.task('sass', ['clean'], function() {
    return sass('./client/styles/main.scss') 
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('./client/styles'));
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
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.scripts, ['jshint']);  
});

// Run karma in terminal
gulp.task('karma', shell.task([
  'karma start'
]));
