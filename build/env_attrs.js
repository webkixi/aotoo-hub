var webpack = require('webpack')
var _ = require('lodash')
var fse = require('fs-extra')
var marked = require("marked");
var path = require('path')
  , autoprefix = require('autoprefixer')
  , UglifyJsPlugin = require("uglifyjs-webpack-plugin")
  , OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , CopyPlugin = require('copy-webpack-plugin')
  , getEntryTrunks = require('./util/entry')
  , MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
  // if (options.scenes && options.scenes.publicPath) {
  //   publicPath = options.scenes.publicPath
  // }
  return publicPath
}

module.exports = function (asset) {
  const {isDev, SRC, DIST, options, PORT, PROXYPORT, userScenesConfig } = asset
  let publicPath = getPublicPath(options)
  let SITE = userScenesConfig.SITE
  let domain = SITE.domain || `//localhost:${PORT}/`
  if (!_.endsWith(domain, '/')) {
    domain += '/'
  }

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
        // return 'cheap-source-map' // 微信公众号h5要用cheap类型的map
        // return isDev ? 'eval-source-map' : 'hidden-source-map'
        return isDev ? 'cheap-module-eval-source-map' : 'nosources-source-map'
        break;






      case 'output':
        if (param == 'precommon' || param == 'vendors') {
          return {
            path: DIST,
            filename: isDev ? 'js/[name].js' : 'js/[name]__[chunkhash:10].js',
            chunkFilename: 'js/[name]_[id].js',
            publicPath: publicPath
          }
        }
        return {
          path: DIST,
          filename: isDev ? 'js/[name].js' : 'js/[name]__[chunkhash:10].js',
          publicPath: publicPath
          // chunkFilename: isDev ? 'js/[name]_[id].js' : 'js/[name]_[id]_[hash:10].js'
        }
        break;
      
      case 'markdown-loader': 
        return {
          test: /\.md$/,
          use: [{
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                // renderer: new marked.Renderer(),
                // pedantic: false,
                // gfm: true,
                // tables: true,
                // breaks: false,
                // sanitize: false,
                // smartLists: true,
                // smartypants: false,
                // xhtml: false
              }
            }
          ]
        }
        break;




      case 'stylus': // stylus loader
        const cssInlineLoaders = param
        if (isDev) {
          cssInlineLoaders.unshift('css-hot-loader')
        }
        return cssInlineLoaders
        break;





    
      case 'styl':  // var cssLoaders = param
        return {
          oneOf: [
            // this applies to `<style lang="css|sass|scss|less|styl">` in Vue components
            {
              resourceQuery: /^\?vue/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: domain,
                    esModule: false,
                  }
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    url: false
                  }
                },
                'postcss-loader',
              ].concat(param)
            },

            // 处理其他样式
            {
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: domain,
                  }
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    url: false
                  }
                },
                'postcss-loader',
              ].concat(param)
            },
          ]
        }
        break;
      
      
      
      
      
      case 'minimizerCss': // styl loader
        if (isDev) {
          return [ new OptimizeCSSAssetsPlugin({}) ]
        } else {
          return [
            // new UglifyJsPlugin({
            //   cache: true,
            //   parallel: true,
            //   sourceMap: true // set to true if you want JS source maps
            // }),
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
              // reuseExistingChunk: true,
              priority: 10
            }
          }
        }
        break;

      case 'plugins':
        const commonPlugins = param
        let target = []
        if (isDev) {
          target = commonPlugins.concat([
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('development'),
              '__DEV__': true
            }),
            // new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
          ])
        } else {
          target = commonPlugins.concat([
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production'),
              '__DEV__': false
            }),
            new OptimizeCSSAssetsPlugin({}),
          ])
        }

        if (fse.pathExistsSync(path.join(SRC, 'js/vendors/3ds'))) {
          target = target.concat(
            [
              new CopyPlugin((()=>{
                let cfg = {
                  patterns: [
                    {
                      from: '**/*',
                      to: path.join(DIST, 'js/3ds'),
                      context: path.join(SRC, 'js/vendors/3ds'),
                      // globOptions: {
                      //   ignore: ['cloudfunctions/**/*', 'project.config.json'],
                      // }
                    }
                  ]
                }
                return cfg
              })(), { context: SRC })
            ]
          )
        }
        return target
        break;
    }
  }
}

