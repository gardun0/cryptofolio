const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index.js'),
    path.resolve(__dirname, 'src/styles.js')
  ],

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
            use: [
              { loader: 'css-loader', options: { minimize: true }}
            ]
        })),
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      normalize: path.join(__dirname, '/node_modules/normalize.css')
    }
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