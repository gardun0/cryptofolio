const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  mode: 'development',

  target: 'web',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: ['webpack-extract-css-hot-reload'].concat(ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })),
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
    ]
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'cryptofolio.bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    }),
    new ExtractTextPlugin("app.css")
  ]
}