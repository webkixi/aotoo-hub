var webpack = require('webpack')
var _ = require('lodash')
var path = require('path')
  , autoprefix = require('autoprefixer')
  // , Memfs = require('webpack-memory2fs-plugin')
  , Memfs = require('./plugins/memfs')
  , UglifyJsPlugin = require("uglifyjs-webpack-plugin")
  , OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , getEntryTrunks = require('./util/entry');


function getTrunks(src, opts) {
  let dfts = {
    type: 'js',
    // exclude: ['common']
  }
  dfts = _.merge(dfts, opts)
  return getEntryTrunks(src, dfts)
}

function getPublicPath(options) {
  let publicPath = options.publicPath || '/'
  if (options.scenes && options.scenes.publicPath) {
    publicPath = options.scenes.publicPath
  }
  return publicPath
}

module.exports = function (asset) {
  const {isDev, SRC, DIST, options, PORT, PROXYPORT } = asset
  let publicPath = getPublicPath(options)

  return function (name, param, param1) {
    switch (name) {
      case 'mode':
        return isDev ? 'development' : 'production'
        break;




      case 'entries':
        const srcPath = param
        const options = param1
        const hotPort = options.isProxy ? PROXYPORT : PORT
        let trunks = getTrunks(srcPath, options)
        Object.keys(trunks).forEach((trunkName, ii) => {
          let val = trunks[trunkName]
          if (isDev) {
            trunks[trunkName] = [
              'react-hot-loader/patch',
              'webpack/hot/only-dev-server',
              'webpack-dev-server/client?https://0.0.0.0:' + hotPort
            ].concat(val)
          }
        })
        return trunks
        break;




      case 'watch':
        return true
        break;




      case 'devtool':
        return 'cheap-source-map'
        break;






      case 'output':
        if (param == 'precommon' || param == 'vendors') {
          return {
            path: DIST,
            filename: isDev ? 'js/[name].js' : 'js/[name]__[hash:10].js',
            chunkFilename: 'js/[name]_[id].js',
            publicPath: publicPath
          }
        }
        return {
          path: DIST,
          filename: isDev ? 'js/[name].js' : 'js/[name]__[hash:10].js',
          publicPath: publicPath
          // chunkFilename: isDev ? 'js/[name]_[id].js' : 'js/[name]_[id]_[hash:10].js'
        }
        break;





      case 'stylus': // stylus loader
        const cssInlineLoaders = param
        if (isDev) {
          cssInlineLoaders.unshift('css-hot-loader')
        }
        return cssInlineLoaders
        break;





      case 'styl': // styl loader
        const cssLoaders = param
        if (isDev) {
          cssLoaders.unshift('css-hot-loader')
        }
        return cssLoaders
        break;
      
      
      
      
      
      case 'minimizerCss': // styl loader
        if (isDev) {
          return [ new OptimizeCSSAssetsPlugin({}) ]
        } else {
          return [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
          ]
        }
        break;






      case 'splitChunks': // styl loader
        const asset = param
        return {
          cacheGroups: {
            // common: { // 抽离第三方插件
            //   test: /node_modules/, // 指定是node_modules下的第三方包
            //   chunks: 'initial',
            //   name: 'common', // 打包后的文件名，任意命名    
            //   priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            // },
            // utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
            //   chunks: 'all',
            //   name: 'utils', // 任意命名
            //   minChunks: 2, // 只要超出0字节就生成一个新包
            //   priority: 5
            // },
            common: { // 抽离自己写的公共代码，utils这个名字可以随意起
              test: /\.js(x?)/,
              chunks: 'all',
              name: 'common', // 任意命名
              // minSize: 0, // 只要超出0字节就生成一个新包
              minChunks: 3, // 只要超出0字节就生成一个新包
              priority: 10
            }
          }
        }
        break;


        


      case 'plugins':
        const commonPlugins = param
        if (isDev) {
          return commonPlugins.concat([
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('development'),
              '__DEV__': true
            }),
            // new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new Memfs({
              mapfile: {
                js: /\.js(x?)/,
                css: ['.css'],
                html: /\.html/
              }
            })
          ])
        } else {
          return commonPlugins.concat([
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production'),
              '__DEV__': false
            }),
            new Memfs({
              mapfile: {
                js: /\.js(x?)/,
                css: ['.css'],
                html: /\.html/
              }
            })
          ])
        }
        break;




      default:
        break;
    }
  }
}

