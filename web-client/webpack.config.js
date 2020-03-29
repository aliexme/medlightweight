/* global require, module, __dirname */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATH_SRC = path.resolve(__dirname, 'src')
const PATH_DIST = path.resolve(__dirname, 'dist')

module.exports = (env, options) => {
  const mode = options.mode
  const isProd = mode === 'production'

  return {
    entry: path.resolve(PATH_SRC, 'index.tsx'),
    devtool: isProd ? 'source-map' : 'inline-source-map',
    output: {
      path: PATH_DIST,
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [PATH_SRC, 'node_modules'],
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
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
      }),
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
      historyApiFallback: true,
      proxy: {
        '/api/': {
          target: 'http://localhost:8000',
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[name]--[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  }
}
