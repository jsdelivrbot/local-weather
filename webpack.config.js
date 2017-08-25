const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'jquery'  
]

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 400000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}

module.exports = config