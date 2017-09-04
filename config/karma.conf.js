module.exports = function (config) {
    var webpackConfig = require('./webpack.test.js');

    var configuration = {

      basePath: '',

      frameworks: ['jasmine'],

      files: [
          { pattern: './spec.bundle.js', watched: false }
      ],

      preprocessors: {
          './spec.bundle.js': ['webpack', 'sourcemap']
      },

      webpack: webpackConfig,

      webpackServer: {
          noInfo: false
      },

      reporters: ['progress', 'kjhtml'],

      client: {
        clearContext: false
      },

      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,


      browsers: ['Chrome'],
      singleRun: false

    };

    config.set(configuration);
};