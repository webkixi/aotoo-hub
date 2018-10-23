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
    const TYPE = options.TYPE
    const isXcx = TYPE == 'mp'
    const isAli = TYPE == 'ali'
    const globalVar = isXcx ? 'wx' : 'my'
    this.globalVar = globalVar
    this.prePath = '../'
    // this.contentSource = `; function webpackJsonp() { require("~~~~"); ${globalVar}.webpackJsonp.apply(null, arguments); }`;
    this.contentSource = `; require("~~~~");`;
  }
  apply(compiler) {
    const that = this
    const windowRegExp = new RegExp('window', 'g');

    compiler.hooks.compilation.tap('wpConcatFile', (compilation, params) => {
      compilation.hooks.beforeChunkAssets.tap('wpConcatFile', () => {
        const assetsChunkIndex = compilation.chunks.findIndex(function(item) {
          return item.name.indexOf('nobuild__')>-1
        })
				if (assetsChunkIndex > -1) {
					compilation.chunks.splice(assetsChunkIndex, 1);
				}
      })
      compilation.hooks.optimizeChunkAssets.tapAsync('wpConcatFile', (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            const fileObj = path.parse(file)
            if (fileObj.ext == '.js') {
              // chunk.name  chunk.name
              if (chunk.name !== 'common') {
                const lens = []
                let posixPath = './'
                const matchIt = chunk.name.match(/\//g)
                if (matchIt) {
                  matchIt.forEach(it => lens.push(this.prePath))
                  posixPath = './'+lens.join('')
                } else {
                  posixPath = './'
                }
                const contentSource = this.contentSource.replace('~~~~', posixPath+'common.js')
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
  const accessExts = ['.wxml', '.styl', '.wxs', '.json', '.png', '.jpg', '.jpeg', '.gif']
  if (fse.existsSync(dir) ){
    globby.sync([`${dir}/**/*`, '!node_modules']).forEach(function(item) {
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
  

function baseConfig(asset, envAttributs) {
  const {TYPE, DIST, SRC, isDev} = asset
  const alias = require('./webpack.alias.config')(aotooConfigs, asset)
  const isXcx = TYPE == 'mp'
  const isWechat = isXcx
  const isAli = TYPE == 'ali'

  const relativeFileLoader = (ext = '[ext]') => {
    return {
      loader: 'file-loader',
      options: {
        emitFile: true,
        useRelativePath: false,
        outputPath: '',
        name: function(file) {
          const targetFile = file.replace(path.join(SRC, 'js'), '')
          const fileObj = path.parse(targetFile)
          let targetPath = fileObj.dir
          return `${targetPath}/[name].${ext}`
        },
        context: SRC,
      },
    };
  };

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
    devtool: isDev ? 'source-map' : false,
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: DIST
    },
    optimization: {
      noEmitOnErrors: true,
      namedModules: true,
      minimizer: envAttributs('minimizerCss'),
      splitChunks: {
        cacheGroups: {
          common: { // 抽离自己写的公共代码，utils这个名字可以随意起
            test: /\.js(x?)/,
            chunks: 'all',
            name: 'common', // 任意命名
            // minSize: 30000, // 只要超出0字节就生成一个新包
            minChunks: 3, // 只要超出0字节就生成一个新包
            priority: 10
          }
        }
      },
      occurrenceOrder: true
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
      extensions: ['.js', '.styl', '.wxml', '.wxss', '.css', '.json', '.md']
    },
    plugins: [
      new appendCommonFile({TYPE}),
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