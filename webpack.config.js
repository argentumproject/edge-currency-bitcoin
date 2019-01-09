const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/platform/react-native/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, './lib/react-native/'),
    filename: 'bitcoin-plugin.js'
  }
}
