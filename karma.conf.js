// Karma configuration
// Generated on Wed Jan 28 2015 15:22:27 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
     // angular source
      'client/lib/angular/angular.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/lib/angular-ui-router/src/**.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/lib/lumx/dist/js/**.js',
      
      //our app code
      'client/app/*.js',
      'client/app/**/*.js',

      //our spec files
      'node_modules/expect.js/index.js',
      'specs/client/**.js'
    ],


    // list of files to exclude
    exclude: [
        'karma.conf.js',
        'client/app/emulators'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/app/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
