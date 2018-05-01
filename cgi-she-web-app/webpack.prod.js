var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
        'app': './lib/index'
  },
  output: {
    filename: 'app.js',
    chunkFilename: "[id].js",
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      title: 'Spanish Healthcare Exam Admin Portal',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      { test: /\.html$/, loaders: ["html"] },
      {
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "lib"),
        ],

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
        
        

        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
         test: /\.less$/,
         loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
    alias: {
      /*
      'actions': __dirname + '/lib/actions',
      'assets': __dirname + '/assets',
      'components': __dirname + '/lib/components/',
      'decorators': __dirname + '/lib/decorators/',
      'middleware': __dirname + '/lib/middleware/',
      'persistence': __dirname + '/lib/persistence/',
      */
    }
  }
};
