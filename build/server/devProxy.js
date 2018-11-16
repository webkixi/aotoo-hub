const co = require('co')
const fs = require('fs')
const fse = require('fs-extra')
const globby = require('globby')
const chalk = require('chalk')
const _ = require('lodash')
const path = require('path')
const nodemon = require('nodemon')
const webpack = require('webpack')
const mkdirp = require('mkdirp')
const sleep = require('../util/sleep')
const portOccupied = require('../util/portOccupied')
const validPort = require('../util/validPort')
const fillupMapfile = require('../util/fillupMapfile3ds')
const generateServerConfigsFile = require('../util/generateServerConfigsFile')
const log = console.log

const WebpackDevServer = require('webpack-dev-server')

const browserSync = require('../util/openBrowser')

function* generateBabelCfgFile(distserver) {
  const DISTSERVER = distserver
  const path_babelrc = path.join(DISTSERVER, '.babelrc')
  
  const content_babelrc_path = path.join(__dirname, '../lib/babelrc')
  const content_babelrc = fs.readFileSync(content_babelrc_path, 'utf-8')

  return new Promise( (res, rej)=>{
    if (!fs.existsSync(DISTSERVER)) {
      mkdirp.sync(DISTSERVER)
      fs.writeFileSync(path_babelrc, content_babelrc, 'utf-8')
      return res(true)
    } else {
      if (fs.existsSync(path_babelrc)) {
        fs.unlinkSync(path_babelrc)
      }
      fs.writeFileSync(path_babelrc, content_babelrc, 'utf-8')
      return res(true)
    }
  })
}


// 1、生成server端的配置文件
//    作为全局global.CONFIG
// 2、生成.babelrc，支持jsx语法
// function* generateServerConfigsFile(DISTSERVER, path_mapfile, path_config_file, asset) {
//   const {SRC, DIST} = asset

//   if (fs.existsSync(path_config_file)) {
//     fs.unlinkSync(path_config_file)
//     yield sleep(1000, '==========  等待创建server端的configs文件  ============')
//   }

//   return new Promise(function (res, rej) {
//     /**
//      * 设置mapper
//      * 将静态文件的映射文件mapper.json挂载到场景configs配置上
//      */
//     if (fs.existsSync(path_mapfile)) {
//       const mapper = require(path_mapfile)
//       if (asset.options && asset.options.scenes) {
//         const scenes = asset.options.scenes
//         if (typeof scenes == 'string') {
//           asset.options.scenes = { mapper: mapper }
//         }
        
//         if (typeof scenes == 'object') {
//           asset.options.scenes.mapper = mapper
//         }
//       }
      
//       /**
//       * 写配置文件 * 
//       * 
//       */
//       const scenes = asset.options.scenes
//       const configsContent = `module.exports = function(opts){
//         global.Configs = global.CONFIG = ${JSON.stringify(scenes)}
//         return ${JSON.stringify(asset)}
//       }`

//       fs.writeFileSync(path_config_file, configsContent, 'utf-8')
//       return res(true)
//     }
//   })
// }


// 启动node端服务
function* startupNodeServer(options) {
  let cmd_start
  const { SRC, DIST, argv, isDev, name } = options
  const path_dir_server = path.join(SRC, 'server')
  const path_server_index = path.join(SRC, 'server/index.js')

  if (fs.existsSync(path_server_index)) {
    if (isDev) {
      cmd_start = `node ${path_server_index}`
      const serverName = name || 'node'
      
      const nmStart = nodemon({
        "execMap": {
          "js": cmd_start
        },
        "script": path_server_index,
        "stdout": "false",
        "ext": 'js json jsx css html md',
        "restartable": "rs",
        "verbose": true,
        "ignore": [
          ".git/*",
          "*.db"
        ],
        "watch": [
          path_dir_server + '/*'
        ],
      });
  
      nmStart.on('start', function () {
        console.log(serverName,'========= 服务端启动完成 ============');
      })
  
      .on('restart', function (files) {
        console.log('========== 正在重启服务端 ===========');
      })
  
      .on('quit', function () {
        console.log('========= 服务端退出 ============');
        process.exit();
      })
    } else {
      require(path_server_index)
    }
  }
}

// 获取有效的proxyport端口
function* getValidProxyPort(port) {
  const portUsed = yield portOccupied(port)
  if (portUsed) {
    port += 30
    return yield checkProxyPortOccupied(port)
  } else {
    return { valid: port }
  }
}



function* browserOpen(name, port, isXcx) {
  if (!isXcx) {
    setTimeout(() => {
      browserSync.browserOpen({
        name: name,
        PORT: port
      })
    }, 1000);
  }
}


function* wpDevProxyerer(compiler, asset) {
  let { name, contentBase, host, port, proxyPort, SRC, DIST } = asset

  // const validProxyPort = yield getValidProxyPort(proxyPort)
  const validProxyPort = yield validPort(proxyPort)
  proxyPort = validProxyPort.validPort

  const devS = new WebpackDevServer(compiler, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    compress: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    // contentBase: contentBase,
    // publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    staticOptions: {
      redirect: false
    },
    clientLogLevel: 'info',
    // progress: true,
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      errors: true,
      errorDetails: true,
      depth: false,
      entrypoints: true,
      excludeAssets: /app\/assets/,
      hash: false,
      maxModules: 15,
      modules: false,
      performance: true,
      reasons: false,
      source: false,
      timings: true,
      version: false,
      warnings: true,
    },
    host: host || '0.0.0.0',
    // watchContentBase: true,
    // startup: true
    proxy: {
      '*': {
        target: 'http://localhost:' + port,
        secure: false,
        changeOrigin: true
      }
    },
  })

  devS.listen(proxyPort, 'localhost', function (err, result) {
    if (err) console.log(err);
    // log(chalk.red.bold(`【${port}】`)) // 控制台输出信息
  })
}

function* wpProductionDone(compiler, asset) {
  return new Promise((res, rej) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log('=============== 编译完成 =============');
      return res(stats)

    })
  })
}

function* selectConfig(asset, ifStart) {
  const { SRC, DIST, argv } = asset
  const DISTSERVER = path.join(SRC, 'server')
  const starts = argv.start ? [].concat(argv.start) : undefined

  if (ifStart) {  //非hooks传入，检测是否只是启动node
    if (starts && starts.length) {
      ifStart = true
    } else {
      ifStart = false
    }
  }

  const path_mapfile = path.join(DIST, 'mapfile.json')
  const path_config_file = path.join(DISTSERVER, 'configs.js')

  yield fillupMapfile(asset)

  yield generateBabelCfgFile(DISTSERVER)
  yield sleep(500, '==========  babel配置文件写入完成  ===========')

  if (ifStart) {
    const oldConfig = require(path_config_file)()
    asset = _.merge({}, asset, oldConfig)
    process.env.NODE_ENV = asset.isDev ? 'development' : 'production'
  }

  yield generateServerConfigsFile(DISTSERVER, path_mapfile, path_config_file, asset)
  yield sleep(500, '=========  server端的configs文件写入完成  ===============')

  return yield asset
}

const names = []
module.exports = function* myProxy(compilerConfig, asset) {
  asset = yield selectConfig(asset, true)
  const { TYPE, name, contentBase, isDev, host, port, proxyPort, SRC, DIST, argv, onlynode } = asset
  const isXcx = (TYPE == 'mp' || TYPE == 'ali')
  const starts = argv.start ? [].concat(argv.start) : undefined
  
  if ((starts && starts.length && starts.indexOf(name) > -1) || onlynode) {
    yield startupNodeServer(asset)
    yield browserOpen(asset.name, asset.port, isXcx)
  } else {
    const DISTSERVER = path.join(SRC, 'server')
    const compiler = webpack(compilerConfig)
    compiler.hooks.done.tap('start-node-server', stats => {
      if (names.indexOf(name) == -1) {
        names.push(name)
        co(function* () {
          // const path_mapfile = path.join(DIST, 'mapfile.json')
          // const path_config_file = path.join(DISTSERVER, 'configs.js')

          // yield fillupMapfile(asset)
          
          // yield generateBabelCfgFile(DISTSERVER)
          // yield sleep(500, '==========  babel配置文件写入完成  ===========')
  
          // yield generateServerConfigsFile(DISTSERVER, path_mapfile, path_config_file, asset)
          // yield sleep(500, '=========  server端的configs文件写入完成  ===============')

          yield selectConfig(asset)
          if (isDev) {
            yield startupNodeServer(asset)
            yield browserOpen(asset.name, asset.proxyPort, isXcx)
          }
        })
      }
    })
    if (isDev) {
      if (argv.onlybuild) {
        compiler.run((err, state)=>{
          if (err) { console.log(err); }
        })
      } else {
        yield wpDevProxyerer(compiler, asset)
      }
    } else {
      yield wpProductionDone(compiler, asset)
    }
  }
}