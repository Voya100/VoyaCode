var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    'app': './app/main-aot.ts' // AoT compilation
  },

  output: {
    path: __dirname + '/public/',
    filename: 'js-aot/[name]-[hash:8].bundle.js',
    chunkFilename: 'js-aot/[id].-[hash:8].chunk.js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },

  module: {
    rules: [
        {
          test: /\.ts$/,
          use: [
            'awesome-typescript-loader',
            'angular-router-loader?aot=true&genDir=aot/',
            'angular2-template-loader',
          ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader'
        },
        {
          test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
          loader: 'file-loader?name=assets/[name]-[hash:6].[ext]',
        },
        {
          test: /\.(css|scss)$/,
          loaders: ['to-string-loader', 'css-loader', 'sass-loader']
        }
    ],
    exprContextCritical: false
  },
  plugins: [
    new CleanWebpackPlugin(
        [
          './public/js-aot/'
        ]
    ),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
        sourceMap: false
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'index-template.html'
    }),
    new CopyWebpackPlugin([{from: './app/styles.css'}]),
  ]
};