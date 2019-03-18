var fse = require('fs-extra')
var fs = require('fs')
var os = require('os')
var _  = require('lodash')
var webpack = require('webpack')
var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , HappyPack = require('happypack')
  , happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })  // 构造一个线程池
  , aotooConfigs = process.aotooConfigs
  , globby = require('globby')
  , { ConcatSource, OriginalSource, RawSource } = require("webpack-sources")
  , CopyPlugin = require('copy-webpack-plugin');



class appendCommonFile {
  constructor(options) {
    const {DIST, TYPE} = options
    const isXcx = TYPE == 'mp'
    const isAli = TYPE == 'ali'
    const globalVar = isXcx ? 'wx' : 'my'
    this.globalVar = globalVar
    this.prePath = '../'
    this.options = options
    // this.contentSource = `; function webpackJsonp() { require("~~~~"); ${globalVar}.webpackJsonp.apply(null, arguments); }`;
    this.contentSource = `; require("~~~~");`;
  }
  apply(compiler) {
    const that = this
    const options = this.options
    const {DIST} = options
    const windowRegExp = new RegExp('window', 'g');

    compiler.hooks.compilation.tap('wpConcatFile', (compilation, params) => {
      compilation.hooks.beforeChunkAssets.tap('wpConcatFile', () => {
        compilation.chunks = compilation.chunks.filter(function (item) {
          return item.name.indexOf('nobuild__') == -1
        })
        // const assetsChunkIndex = compilation.chunks.findIndex(function(item) {
        //   return item.name.indexOf('nobuild__')>-1
        // })
				// if (assetsChunkIndex > -1) {
				// 	compilation.chunks.splice(assetsChunkIndex, 1);
				// }
      })
      compilation.hooks.optimizeChunkAssets.tapAsync('wpConcatFile', (chunks, callback) => {
        let hasCommon = false
        chunks.forEach(chunk => {
          if (chunk.name == 'common') {
            hasCommon = true
          }
        })
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            const fileObj = path.parse(file)
            if (fileObj.ext == '.js') {
              // chunk.name  chunk.name
              if (chunk.name !== 'common') {
                const lens = []
                let posixPath = ''
                const matchIt = chunk.name.match(/\//g)
                if (matchIt) {
                  matchIt.forEach(it => lens.push(this.prePath))
                  // posixPath = './'+lens.join('')
                  posixPath = lens.join('')
                } else {
                  posixPath = './'
                }
                let posixPathFile = posixPath + 'runtime.js'
                let contentSource = this.contentSource.replace('~~~~', posixPathFile)
                if (chunk.name == 'runtime') {
                  posixPathFile = posixPath + 'common.js'
                  if (hasCommon) {
                    contentSource = this.contentSource.replace('~~~~', posixPathFile)
                  } else {
                    contentSource = ''
                  }
                }
                let contentObj = compilation.assets[file]
                let code = contentObj.source()
                code = code.replace(windowRegExp, that.globalVar);
                contentObj = new RawSource(code)

                compilation.assets[file] = new ConcatSource(
                  contentSource,
                  '\n',
                  '\/**aotoo commonfile**\/',
                  '\n',
                  contentObj,
                );
              } else {
                const contentObj = compilation.assets[file]
                let code = contentObj.source()
                code = code.replace(windowRegExp, that.globalVar);
                compilation.assets[file] = new RawSource(code)
              }
            }
          })
        })
        callback()
      })
    })
  }
}

class DoneCompile {
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.hooks.done.tap('xcxCompiler', (stats)=>{
      const DIST = this.options.DIST
      globby.sync([path.join(DIST, '**/*')], {onlyFiles: false}).forEach(filename=>{
        if (filename.indexOf('nobuild__') > -1) {
          fse.removeSync(filename)
        }
      })
    })
  }
}

function jsEntries(dir) {
  var jsFiles = {}
  const accessExts = ['.wxml', '.wxss', '.styl', '.wxs', '.json', '.png', '.jpg', '.jpeg', '.gif']
  if (fse.existsSync(dir) ){
    globby.sync([`${dir}/**/*`, '!node_modules', `!${dir}/dist`]).forEach(function(item) {
      if (item.indexOf('_')!=0) {
        const fileObj = path.parse(item)
        const xcxSrc = path.join(dir, 'js')
        if (~item.indexOf(xcxSrc)) {
          const fileStat = fs.statSync(item)
          const relativeFile = item.replace(xcxSrc, '')
          let relativeKey = relativeFile.replace(fileObj.ext, '').substring(1)
          if (fileObj.ext == '.js') {
            jsFiles[relativeKey] = item
          }
          else {
            if (accessExts.indexOf(fileObj.ext)>-1) {
              jsFiles['nobuild__' + relativeFile] = item
            }
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
      emitFile: true,
      useRelativePath: false,
      outputPath: '',
      name: function (file) {
        const targetFile = file.replace(path.join(SRC, 'js'), '')
        const fileObj = path.parse(targetFile)
        let targetPath = fileObj.dir == '/' ? '' : fileObj.dir
        targetPath = path.join(DIST, targetPath)
        return `${targetPath}/[name].${ext}`
      },
      context: SRC,
    },
  };
}

function baseConfig(asset, envAttributs) {
  const {TYPE, DIST, SRC, isDev} = asset
  const isXcx = TYPE == 'mp'
  const isWechat = isXcx
  const isAli = TYPE == 'ali'
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)
  const relativeFileLoader = (ext = '[ext]') => fileLoaderConfig(asset, ext)

  let myEntries = jsEntries(SRC)

  return {
    mode: envAttributs('mode'),
    entry: myEntries,
    watch: envAttributs('watch'),
    cache: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
      aggregateTimeout: 300,
      poll: 1000
    },
    // devtool: isDev ? 'source-map' : false,
    devtool: false,
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: DIST
    },
    optimization: {
      runtimeChunk: 'single', // 抽离webpack内部模块调用为独立文件，否则每个编译后的文件都包含有webpack内部模块调用部分
      noEmitOnErrors: false,
      namedModules: false, // webpack编译后的模块名具有可读性
      namedChunks: false, // webpack编译后的chunk名具有可读性
      minimizer: envAttributs('minimizerCss'),
      occurrenceOrder: true,
      splitChunks: {
        cacheGroups: {
          common: { // 抽离自己写的公共代码，utils这个名字可以随意起
            test: /\.js(x?)/,
            chunks: 'all',
            name: 'common', // 任意命名
            minSize: 50000, // 只要超出0字节就生成一个新包
            minChunks: 2, // 只要超出0字节就生成一个新包
            priority: 10
          }
        }
      },
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
          test: /\.(png|jpg|gif)$/,
          include: SRC,
          use: relativeFileLoader(),
        },
        {
          test: /\.wxss$/,
          include: SRC,
          use: relativeFileLoader(),
        },
        {
          test: /\.wxs$/,
          include: SRC,
          exclude: /node_modules/,
          use: [
            relativeFileLoader(),
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  'es2015', 
                  'stage-0'
                ],
                plugins: [
                  [
                    "transform-runtime", {
                      "helpers": false, // defaults to true; v6.12.0 (2016-07-27) 新增;
                      "polyfill": false, // defaults to true
                      "regenerator": true, // defaults to true
                      // "moduleName": path.dirname(require.resolve('babel-runtime/package'))
                    }
                  ],
                ]
              },
            }
          ]
        },
        {
          test: /\.js(x?)$/,
          use: {
            loader: 'happypack/loader',
            options: {
              id: 'babel'
            }
          },
          exclude: /node_modules/,
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
      new appendCommonFile({...asset}),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production'),
        '__DEV__': true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HappyPack({
        id: "babel",
        verbose: true,
        loaders: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: ["env", "stage-0"],
          },
          plugins: [
            [
              "transform-runtime", {
                "helpers": false, // defaults to true; v6.12.0 (2016-07-27) 新增;
                "polyfill": false, // defaults to true
                "regenerator": true, // defaults to true
              }
            ],
          ]
        }],
        threadPool: happyThreadPool
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyPlugin([
        {
          from: '**/*.json',
          to: DIST,
          context: path.join(SRC, 'js'),
          copyUnmodified: true
        }
      ], { context: SRC }),
      new DoneCompile({DIST})
    ]
  }
}

module.exports = baseConfig