const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const distPath = path.join(__dirname, '/public')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        type: 'asset/resource',
      }
    ]
  },
  output: {
    path: distPath,
    filename: 'index_bundle.js'
  },
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, './src/assets/fonts'),
      styles: path.resolve(__dirname, './src/assets/styles'),
      images: path.resolve(__dirname, './src/assets/images'),
      configs: path.resolve(__dirname, './config'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    port: 9009,
    //open: true
  }
}