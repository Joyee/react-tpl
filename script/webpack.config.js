const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { ProgressPlugin } = require('webpack')
const HotLoad = require('./HotLoad')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    stats: 'errors-only',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: require.resolve('babel-loader'),
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'tpl/index.html',
    }),
    new ProgressPlugin(),
    new HotLoad(),
  ],
}
