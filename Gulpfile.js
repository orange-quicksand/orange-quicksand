'use strict';
var gulp    = require('gulp');
var watch   = require('gulp-watch');
var sass    = require('gulp-ruby-sass');
var jshint  = require('gulp-jshint');
var docco   = require('gulp-docco');


// The paths to our app's files
var paths = {
  scripts: [
    './client/app/**/*.js',
    './server/**/*.js'
    ],
  styles: ['./client/styles/*.scss'],
  styleFolder: './client/styles/',
  html: [],
  test: ['./specs/*.js']
};

// Compile SASS to CSS
// OLD gulp-sass task
// gulp.task('sass', function () {
//   gulp.src(paths.styles)
//     .pipe(sass())
//     .pipe(gulp.dest('./client/styles/'));
// });

// Compile SASS to CSS
// NEW gulp-ruby-sass task
gulp.task('sass', function() {
    return sass(paths.styleFolder) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest(paths.styleFolder));
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
