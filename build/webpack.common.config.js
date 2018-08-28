const path = require('path')
    , fs = require('fs')
    , mkdirp = require('mkdirp')
    , MiniCssExtractPlugin = require('mini-css-extract-plugin')
    , aotooConfigs = process.aotooConfigs
    , generateVendorsDftsFile = require('./util/generateVendors')

module.exports = function (asset, envAttributs) {
  const { startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT } = asset
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)
  
  const commonFile = path.join(SRC, 'js/vendors', 'index.js')
  generateVendorsDftsFile(asset)

  return {
    mode: envAttributs('mode'),
    entry: {
      vendors: [
        'babel-polyfill',
        commonFile
      ]
    },
    devtool: envAttributs('devtool'),
    output: envAttributs('output', 'vendors'),
    optimization: {
      minimizer: envAttributs('minimizerCss')
    },
    module: {
      rules: [{
          test: /\.js(x?)$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ["env", "react", "stage-0"],
            }
          },
          exclude: /node_modules/,
        },
        {
          test: /\.styl$/,
          use: envAttributs('styl', [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            'stylus-loader'
          ])
        }
      ]
    },
    resolve: {
      alias: alias,
      extensions: ['.js', '.styl', '.stylus', '.css', '.jsx', '.json', '.md']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? "css/common.css" : "css/common__[hash:10].css",
        chunkFilename: isDev ? "css/[id].css" : "css/[id]__[hash:10].css"
      })
    ]
  }
}
