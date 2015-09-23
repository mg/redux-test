var path = require('path')
var webpack = require('webpack');
var srcPath = path.join(__dirname + '/../', 'client');
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.jsx'
  ],

  output: {
    path: './builds/dev',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules', 'client']
  },

  module: {
    loaders: [
      { test: /\.(js|jsx|es6)$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/ },
    ],
  },
  node: {
    __filename: true
  },

  devServer: {
    contentBase: './builds/dev',
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],

  devtool: 'eval-cheap-module-source-map',
}
