var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '../',

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha', 'kjhtml'],

    // Clearer stack traces that don't include things related to libraries and framework the tests are run on
    formatError(msg) {
      // filter out empty lines and node_modules
      if (!msg.trim() || /~/.test(msg) || /node_modules/.test(msg)) return '';
      // indent the error beneath the it() message
      let newLine = `  ${msg}`;
      if (newLine.includes('webpack:///')) {
        newLine = newLine.replace('webpack:///', '');
        // remove bundle location, showing only the source location
        newLine = newLine.slice(0, newLine.indexOf(' <- '));
      }

      return `${newLine}\n`
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'], // ['Chrome'],
    singleRun: false
  };

  config.set(_config);
};