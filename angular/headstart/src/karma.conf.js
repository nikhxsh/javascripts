// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'), 
      require('karma-spec-reporter')
    ],
    client: {
      clearContext: true,
      captureConsole: true
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/headstart'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    //reporters: ['progress', 'kjhtml'],
    reporters: ["spec"],
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: false,      // print the time elapsed for each spec
      failFast: true              // test would finish with error when a first fail occurs. 
    },
    //port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true,
    customLaunchers: {
      ChromeHeadless: {
          base: 'Chrome',
          flags: [
              '--headless',
              '--disable-gpu',
              '--no-sandbox',
              '--remote-debugging-port=9222',
          ]
      }
  }
  });
};
