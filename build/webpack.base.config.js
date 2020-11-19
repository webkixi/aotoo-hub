var os = require('os')
var webpack = require('webpack')
var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , HappyPack = require('happypack')
  , Concat = require('./plugins/concat')
  , happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })  // 构造一个线程池
  , aotooConfigs = process.aotooConfigs
  , VueLoaderPlugin = require('vue-loader/lib/plugin')

function baseConfig(asset, envAttributs) {
  const {DIST, SRC, isDev} = asset
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)

  return {
    mode: envAttributs('mode'),
    entry: [ /****** 补全entry入口文件 ******/ ],
    watch: envAttributs('watch'),
    cache: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
      aggregateTimeout: 300,
      poll: 1000
    },
    devtool: envAttributs('devtool'),
    output: envAttributs('output'),
    optimization: {
      runtimeChunk: 'single',
      noEmitOnErrors: true,
      namedModules: isDev ? true : false,
      hashedModuleIds: isDev ? false : true,
      minimize: isDev ? false : true,
      // minimizer: envAttributs('minimizerCss'),
      splitChunks: envAttributs('splitChunks', asset),
      occurrenceOrder: true
    },
    module: {
      rules: [{
          test: /\.html/, // 配合htmlwebpackplugin
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        },
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
          use: [{
            loader: 'happypack/loader',
            options: {
              id: 'babel'
            }
          }],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: envAttributs('styl', [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
            'sass-loader'
          ]),
        },
        {
          test: /\.styl(us)?$/,
          use: envAttributs('styl', [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                reloadAll: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'postcss-loader',
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
    plugins: envAttributs('plugins', [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? "css/[name].css" : "css/[name]__[contenthash:10].css",
        chunkFilename: isDev ? "css/[id].css" : "css/[id]__[contenthash:10].css"
      }),
      new HappyPack({
        id: "babel",
        verbose: true,
        loaders: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
        threadPool: happyThreadPool
      }),
      // new webpack.HotModuleReplacementPlugin(),
      // new Concat({
      //   targetFile: path.join(DIST, 'js/precommon.js')
      // })
    ])
  }
}

module.exports = baseConfig