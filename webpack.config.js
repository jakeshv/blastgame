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
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  output: {
    path: distPath,
    filename: 'index_bundle.js'
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/assets/styles'),
      images: path.resolve(__dirname, './src/assets/images'),
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