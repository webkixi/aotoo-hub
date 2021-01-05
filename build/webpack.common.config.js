const path = require('path')
    , fs = require('fs')
    , mkdirp = require('mkdirp')
    , MiniCssExtractPlugin = require('mini-css-extract-plugin')
    , aotooConfigs = process.aotooConfigs
    , generateVendorsDftsFile = require('./util/generateVendors')
    , VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function (asset, envAttributs) {
  const { startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT } = asset
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)
  
  const commonFile = [path.join(SRC, 'js/vendors', 'index.js')]
  generateVendorsDftsFile(asset)

  let commonCssFile = path.join(SRC, 'css/common.css')
  let commonStylusFile = path.join(SRC, 'css/common.styl')
  if (fs.existsSync(commonStylusFile)) {
    commonFile.push(commonStylusFile)
  }
  if (fs.existsSync(commonCssFile)) {
    commonFile.push(commonCssFile)
  }

  return {
    mode: envAttributs('mode'),
    entry: {
      vendors: commonFile
    },
    devtool: envAttributs('devtool'),
    output: envAttributs('output', 'vendors'),
    optimization: {
      minimize: isDev ? false : true,
      // minimizer: envAttributs('minimizerCss')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }, 
        {
          test: /\.js(x?)$/,
          use: {
            loader: 'babel-loader',
            ...envAttributs('babel-options', 'dll')
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          ...envAttributs('styl', [])
        },
        {
          test: /\.s[ac]ss$/i,
          ...envAttributs('styl', [
            'sass-loader'
          ])
        },
        {
          test: /\.styl(us)?$/,
          ...envAttributs('styl', [
            'stylus-loader'
          ])
        },
        envAttributs('markdown-loader'),
      ]
    },
    resolve: {
      alias: alias,
      extensions: ['.js', '.vue', '.styl', '.stylus', '.css', '.jsx', '.json', '.md']
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? "css/common.css" : "css/common__[hash:10].css",
        chunkFilename: isDev ? "css/[id].css" : "css/[id]__[hash:10].css"
      })
    ]
  }
}
