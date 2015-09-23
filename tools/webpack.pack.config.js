var path = require('path')
var webpack = require('webpack')
var srcPath = path.join(__dirname + '/../', 'client');

module.exports = {
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
  ]
}
