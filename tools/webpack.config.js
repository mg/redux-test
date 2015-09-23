var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var srcPath = path.join(__dirname + '/../', 'client')

module.exports = {
  entry: './client/index.js',
  output: {
    path: './builds/prod',
    filename: 'bundle.js',
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules', 'client']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx|es6)$/, loader: 'babel?stage=0&optional[]=runtime', exclude: /node_modules/ },
    ],
  },
  node: {
    __filename: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'my app',
      templateContent: '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>my app</title><style>body{margin:0}</style></head><body><div id="app"></div></body></html>',
      filename: 'index.html',
      inject: true,
    }),
  ]
}
