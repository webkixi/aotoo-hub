var fse = require('fs-extra')
var fs = require('fs')
var os = require('os')
var _  = require('lodash')
var webpack = require('webpack')
var path = require('path')
const xcxCloudProjectConfigFile = path.join(__dirname, './lib/xcx_template/project.config.json')
const xcxCloudProjectCloudModule = path.join(__dirname, './lib/xcx_template/cloudclient.js')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , HappyPack = require('happypack')
  , happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })  // 构造一个线程池
  , aotooConfigs = process.aotooConfigs
  , globby = require('globby')
  , { ConcatSource, OriginalSource, RawSource } = require("webpack-sources")
  , CopyPlugin = require('copy-webpack-plugin')
  , projectConfig = require(xcxCloudProjectConfigFile)

class DoneCompile {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.done.tap('xcxCompiler', (stats)=>{
      const {DIST, options} = this.options
      const {cloud, appid} = options
      globby.sync([path.join(DIST, '**/*')], {onlyFiles: false}).forEach(filename=>{
        if (filename.indexOf('nobuild__') > -1) {
          fse.removeSync(filename)
        }
      })

      if (cloud) {
        const projectConfigFile = path.join(DIST, 'project.config.json')
        const appCloudConfigFile = path.join(DIST, projectConfig.miniprogramRoot, 'cloudclient.js')
        projectConfig.appid = appid || projectConfig.appid || ""
        fse.outputJsonSync(projectConfigFile, projectConfig)
        // fse.copySync(xcxCloudProjectCloudModule, appCloudConfigFile)
      }
    })
  }
}

function jsEntries(dir) {
  var jsFiles = {}
  const accessExts = ['.md', '.js', '.wxml', '.wxss', '.styl', '.wxs', '.json', '.png', '.jpg', '.jpeg', '.gif']
  if (fse.existsSync(dir)) {
    globby.sync([`${dir}/**/*`, `!${dir}/js/cloudfunctions`, '!node_modules', `!${dir}/dist`]).forEach(function (item) {
      const fileObj = path.parse(item)
      const xcxSrc = path.join(dir, 'js')
      if (~item.indexOf(xcxSrc)) {
        const fileStat = fs.statSync(item)
        const relativeFile = item.replace(xcxSrc, '')
        let relativeKey = relativeFile.replace(fileObj.ext, '').substring(1)
        if (accessExts.indexOf(fileObj.ext) > -1) {
          jsFiles['nobuild__' + relativeFile] = item
        } else {
          if (fileObj.name == 'app') {
            jsFiles[relativeKey] = ['regenerator-runtime', item]   // 支持async await方法
          } else {
            jsFiles[relativeKey] = item
          }
        }
      }
    })
  }
  return jsFiles
}

function fileLoaderConfig(asset, ext) {
  const {TYPE, DIST, SRC, isDev} = asset
  return {
    loader: 'file-loader',
    options: {
      // emitFile: true,
      // useRelativePath: true,
      // outputPath: DIST,
      name: function(file) {
        return `[path][name].${ext}`
      },
      outputPath: function (url, resourcePath, context) {
        return url
      },
      context: path.join(SRC, 'js')
    },
  };
}

function baseConfig(asset, envAttributs) {
  let   {TYPE, DIST, SRC, isDev, options} = asset
  const isXcx = TYPE == 'mp'
  const isWechat = isXcx
  const isAli = TYPE == 'ali'
  const cloud = options.cloud
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)
  const relativeFileLoader = (ext = '[ext]') => fileLoaderConfig(asset, ext)
  DIST = cloud ? path.join(DIST, 'miniprogram') : DIST

  let myEntries = jsEntries(SRC)

  return {
    mode: 'development',
    entry: myEntries,
    watch: envAttributs('watch'),
    cache: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
      aggregateTimeout: 300,
      poll: 1000
    },
    devtool: false,
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: DIST
    },
    module: {
      rules: [
        {
          test: /\.(wxml|axml)/, // 配合htmlwebpackplugin
          use: [
            relativeFileLoader(isWechat ? 'wxml' : 'axml'),
            'extract-loader',
            'html-loader'
          ]
        },
        {
          test: /\.(jp(e?)g|png|gif)$/,
          use: relativeFileLoader()
        },
        {
          test: /\.wxss$/,
          include: SRC,
          use: relativeFileLoader(),
        },
        {
          test: /\.wxs$/,
          include: SRC,
          use: relativeFileLoader(),
        },
        {
          test: /\.js$/,
          include: SRC,
          use: relativeFileLoader(),
        },
        {
          test: /\.md$/,
          use: [
            relativeFileLoader('md.js'),
            {
              loader: 'raw-loader',
              options: {
                esModule: false,
              },
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            relativeFileLoader('html.js'),
            {
              loader: 'raw-loader',
              options: {
                esModule: false,
              },
            }
          ]
        },
        {
          test: /\.styl$/,
          include: SRC,
          use: [
            relativeFileLoader(isWechat ? 'wxss' : 'acss'),
            'stylus-loader'
          ]
        }
      ]
    },
    resolve: {
      alias: alias,
      extensions: ['.js', '.styl', '.wxml', '.wxss', '.css', '.json', '.md', '.png', '.jpg', '.jpeg', '.gif']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production'),
        '__DEV__': true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CopyPlugin((()=>{
        let cfg = {
          patterns: [
            {
              from: '**/*.json',
              to: DIST,
              context: path.join(SRC, 'js'),
              globOptions: {
                ignore: ['**/cloudfunctions/**', 'project.config.json'],
              }
              // copyUnmodified: true,
            }
          ]
        }

        if (cloud) {
          cfg.patterns.push({
            from: 'cloudfunctions/**/*',
            to: path.join(DIST, '../'),
            context: path.join(SRC, 'js'),
          })
        }
        return cfg
      })(), { context: SRC }),
      new DoneCompile(asset)
    ]
  }
}

module.exports = baseConfig