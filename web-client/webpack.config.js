/* global require, module, __dirname */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATH_SRC = path.resolve(__dirname, 'src')
const PATH_DIST = path.resolve(__dirname, 'dist')

module.exports = (env, options) => {
  const mode = options.mode
  const isProd = mode === 'production'

  return {
    entry: path.resolve(PATH_SRC, 'index.js'),
    output: {
      path: PATH_DIST,
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: {
      all: false,
      assets: true,
      timings: true,
      performance: true,
      warnings: true,
      errors: true,
    },
    performance: {
      hints: false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(PATH_SRC, 'index.html'),
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
    ],
    devServer: {
      contentBase: PATH_DIST,
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  }
}
