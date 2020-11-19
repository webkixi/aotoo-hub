var fse = require('fs-extra')
var fs = require('fs')
var os = require('os')
var _  = require('lodash')
var webpack = require('webpack')
var path = require('path')
const xcxCloudProjectConfigFile = path.join(__dirname, './lib/xcx_template/project.config.json')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
  , HappyPack = require('happypack')
  , happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })  // 构造一个线程池
  , aotooConfigs = process.aotooConfigs
  , globby = require('globby')
  , { ConcatSource, OriginalSource, RawSource } = require("webpack-sources")
  , CopyPlugin = require('copy-webpack-plugin')
  , projectConfig = require(xcxCloudProjectConfigFile)

class appendCommonFile {
  constructor(options) {
    const {DIST, TYPE} = options
    const isXcx = TYPE == 'mp'
    const isAli = TYPE == 'ali'
    const globalVar = isXcx ? 'wx$1' : 'my$1'
    this.globalVar = globalVar
    this.regeneratorRuntimeVar = 'wx.regeneratorRuntime'
    this.prePath = '../'
    this.options = options
    this.contentSource = `; require("~~~~");`;
  }
  apply(compiler) {
    const that = this
    const options = this.options
    const opts = options.options
    const cloud = opts&&opts.cloud
    // const windowRegExp = new RegExp('window', 'g');
    const windowRegExp = /window([\.\[])/g;
    const regeneratorRuntimeRegExp = new RegExp('regeneratorRuntime', 'g'); // 支持async，替换全局变量regeneratorRuntime为wx.regeneratorRuntime

    compiler.hooks.compilation.tap('wpConcatFile', (compilation, params) => {
      compilation.hooks.beforeChunkAssets.tap('wpConcatFile', () => {
        compilation.chunks = compilation.chunks.filter(function (item) {
          return item.name.indexOf('nobuild__') == -1
        })
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
                if (chunk.name.indexOf('runtime') > -1) {
                  posixPathFile = posixPath + 'common.js'
                  if (hasCommon) {
                    contentSource = this.contentSource.replace('~~~~', posixPathFile)
                  } else {
                    contentSource = ''
                  }
                }
                let contentObj = compilation.assets[file]
                let code = contentObj.source()
                code = code.replace(windowRegExp, that.globalVar).replace(regeneratorRuntimeRegExp, this.regeneratorRuntimeVar);
                contentObj = new RawSource(code)

                compilation.assets[file] = new ConcatSource(
                  contentSource,
                  '\n',
                  '\/**auto import common&runtime js**\/',
                  '\n',
                  contentObj,
                );
              } else {
                const contentObj = compilation.assets[file]
                let code = contentObj.source()
                code = code.replace(windowRegExp, that.globalVar).replace(regeneratorRuntimeRegExp, this.regeneratorRuntimeVar);
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
      const {DIST, options} = this.options
      const {cloud, appid} = options
      globby.sync([path.join(DIST, '**/*')], {onlyFiles: false}).forEach(filename=>{
        if (filename.indexOf('nobuild__') > -1) {
          fse.removeSync(filename)
        }
      })

      if (cloud) {
        const projectConfigFile = path.join(DIST, 'project.config.json')
        projectConfig.appid = appid || ""
        fse.outputJsonSync(projectConfigFile, projectConfig)
      }
    })
  }
}

function jsEntries(dir) {
  var jsFiles = {}
  let _partten = /[\/|\\][_](\w)+/;
  let re_common = /(.*)\/common\//
  const accessExts = ['.wxml', '.wxss', '.styl', '.wxs', '.json', '.png', '.jpg', '.jpeg', '.gif']
  if (fse.existsSync(dir)) {
    globby.sync([`${dir}/**/*`, `!${dir}/js/**/cloudfunctions`, '!node_modules', `!${dir}/dist`]).forEach(function (item) {
      if (!re_common.test(item)) {
        if (!_partten.test(item)) {
          const fileObj = path.parse(item)
          const xcxSrc = path.join(dir, 'js')
          if (~item.indexOf(xcxSrc)) {
            const fileStat = fs.statSync(item)
            const relativeFile = item.replace(xcxSrc, '')
            let relativeKey = relativeFile.replace(fileObj.ext, '').substring(1)
            if (fileObj.ext == '.js') {
              if (fileObj.name == 'app') {
                jsFiles[relativeKey] = ['regenerator-runtime', item]   // 支持async await方法
              } else {
                jsFiles[relativeKey] = item
              }
            }
            else {
              if (accessExts.indexOf(fileObj.ext) > -1) {
                jsFiles['nobuild__' + relativeFile] = item
              }
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
    mode: envAttributs('mode'),
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
            // test: /\.js(x?)/,
            test: /^((?!cloudfunction).)+\.js$/,
            // test(module, chunks) {
            //   const re = /.js(x?)$/
            //   const re_funs = /cloudfunctions/
            //   const re_nobuild = /nobuild/
            //   if (cloud) {
            //     return re.test(chunks[0].name) && !re_funs.test(chunks[0].name)
            //   } else {
            //     return re.test(chunks[0].name)
            //   }
            // },
            chunks: 'all',
            name: 'common', // 任意命名
            minSize: 50000, // 只要超出0字节就生成一个新包
            minChunks: 5, // 只要超出0字节就生成一个新包
            // reuseExistingChunk: true,
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
          exclude: /node_modules/,
          use: [
            relativeFileLoader(),
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  '@babel/preset-env'
                ],
                plugins: [
                  [
                    "@babel/plugin-transform-runtime", {
                      "absoluteRuntime": false,
                      "corejs": false,
                      "helpers": false,
                      "regenerator": true,
                      "useESModules": false
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
      new appendCommonFile(asset),
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
            presets: ["@babel/preset-env"],
          },
          plugins: [
            [
              "transform-runtime", {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": false,
                "regenerator": true,
                "useESModules": false
              }
            ],
          ]
        }],
        threadPool: happyThreadPool
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CopyPlugin((()=>{

        let cfg = {
          patterns: [
            {
              from: '**/*.json',
              to: DIST,
              context: path.join(SRC, 'js'),
              globOptions: {
                ignore: ['cloudfunctions/**/*', 'project.config.json'],
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



        // let copycfg =  [{
        //   from: '**/*.json',
        //   to: DIST,
        //   ignore: ['cloudfunctions/**/*', 'project.config.json'],
        //   context: path.join(SRC, 'js'),
        //   copyUnmodified: true
        // }]
        // if (cloud) {
        //   copycfg = copycfg.concat([{
        //     from: 'cloudfunctions/**/*',
        //     to: path.join(DIST, '../'),
        //     context: path.join(SRC, 'js'),
        //     copyUnmodified: true
        //   }, ])
        // }
        // return copycfg
      })(), { context: SRC }),
      new DoneCompile(asset)
    ]
  }
}

module.exports = baseConfig