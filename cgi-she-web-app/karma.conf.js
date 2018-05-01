module.exports = function (config) {
  config.set({

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'mocha', 'chai'],

    files: [
      'tests/**/*.spec.js'
    ],

    preprocessors: {
      'tests/**/*.spec.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    mochaReporter: {
      colors: {
        success: 'blue',
        info: 'bgGreen',
        warning: 'cyan',
        error: 'bgRed'
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0&optional=runtime&plugins=typecheck'},
          { test: /\.less$/, loader: 'style!css!less' }
        ]
      },
      resolve: {
        modulesDirectories: [
          'lib',
          'node_modules'
        ],
        extensions: ['.json', '.js']
      },
      plugins: [
        require('karma-webpack'),
        'karma-mocha-reporter'
      ]
    }
  });
};
