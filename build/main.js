const co      = require('co')
const fs      = require('fs')
const del     = require('del')
const path    = require('path')
const _       = require('lodash')
const webpack = require('webpack')
// const argv    = require('minimist')(process.argv.slice(2));

const devServer = require('./server/devServer')
const devProxy  = require('./server/devProxy')

const sleep        = require('./util/sleep')
const portOccupied = require('./util/portOccupied')
const commonFileExist = require('./util/commonExist')

const generateScenesDir = require('./util/generateScenes')
const generateServer = require('./util/generateServer')
const generateXcx = require('./util/generateXcxDirectory')

const configs_wp_main = require('./webpack.main.config')


let startDevQueues = []    // 允许启动的项目
let occupiedPorts = []     // 被占用的端口
let names = []             // 指定启动的项目
let argv = {}
let Commonds = { }

function processArgv(argv) {
  argv = argv
  Commonds = {
    name: argv.name,
    port: argv.port,
    config: argv.config,    // 指定的配置文件
    scenes: argv.scenes || argv.config, // 场景
    rebuild: argv.rebuild,
    server: argv.server,
    start: argv.start
  }
}

function* buildCommonFiles(asset, dllConfig) {
  const { startup, isDev, SRC, DIST, HOST, PORT, argv, name } = asset
  if (!commonFileExist(DIST, isDev, Commonds.rebuild)) {
    const start = argv.start
    if (start && start.length && start.indexOf(name)>-1) {
      /** nothing to do */
    } else {
      return new Promise((res, rej) => {
        return webpack(dllConfig).run((err, stats) => {
          if (err) return rej(err)
          else {
            return res(stats)
          }
        })
      })
    }
  }
}

// 编译并准备启动项目的配置参数
function* buildBusinessFiles(asset, config) {
  const { name, startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, argv } = asset
  if (startup) {
    let compilerConfig = config
    let options = asset

    options.host = asset.HOST
    options.port = asset.PORT
    options.proxyPort = asset.PROXYPORT
    options.contentBase = asset.DIST
    startDevQueues.push({ compilerConfig, options })
  }
}

// 编译并准备启动项目的配置参数
function* buildXcxFiles(asset, config) {
  const { TYPE, name, startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, argv } = asset
  if (startup) {
    let compilerConfig = config
    let options = asset

    options.host = asset.HOST
    options.port = asset.PORT
    options.proxyPort = asset.PROXYPORT
    options.contentBase = asset.DIST
    startDevQueues.push({ compilerConfig, options })
  }
}

function* proxyServer(compilerConfig, options) {
  // const vport = yield validPort(options.port)
  yield devProxy(compilerConfig, options)
  yield sleep(3000)
}

function* wpDevServers(compilerConfig, options) {
  yield devServer(compilerConfig, options)
  yield sleep(3000)
}

// 启动服务前检查端口 portOccupied
function* startOneProjectDevServer(startDevQueues) {
  if (startDevQueues.length) {
    for (let ii=0; ii<startDevQueues.length; ii++) {
      let {compilerConfig, options} = startDevQueues[ii]
      const portUsed = yield portOccupied(options.port)
      
      if (!portUsed) {

        /**
         * 设置argv
         * 作为单项目配置的argv参数
         * 传递个devServer或者devProxy用于为启动服务提供命令行变量
         */
        // options.argv = argv
        const SRC = options.SRC
        const serverPath = path.join(SRC, 'server')
        if (fs.existsSync(serverPath)) {
          yield proxyServer(compilerConfig, options)
        } else {
          yield wpDevServers(compilerConfig, options)
        }
      } else {
        console.log(`${options.name} port is occupied`)
      }
      // yield sleep(3000)
    }
  } 
}


// 获取各项目自己的环境配置
// 如果没有则新建一个初始配置文件
function *getScenesConfig(asset) {
  let {SRC, options} = asset

  if (!options) {
    asset.options = options = {}
  }

  if (!options.scenes) {
    options.scenes = 'default'
    asset.options.scenes = 'default'
  }

  if (Commonds.scenes && typeof Commonds.scenes == 'string') {
    asset.options.scenes = Commonds.scenes
    options.scenes = Commonds.scenes
  }

  const scenesDir  = path.join(SRC, 'configs')
  const defaultSenesConfigPath = path.join(scenesDir, 'default.js')
  const defaultSenesConfigAt = path.join(scenesDir, 'default')
  let defaultSenesConfigContent = {}

  if (!fs.existsSync(defaultSenesConfigPath)) {
    generateScenesDir(scenesDir, 'default', asset)
    defaultSenesConfigContent = require(defaultSenesConfigAt)(asset)
  } else {
    defaultSenesConfigContent = require(defaultSenesConfigAt)(asset)
  }

  if (typeof options.scenes == 'string') {
    const scenesFileName = options.scenes
    asset.options.scenes = defaultSenesConfigContent
    if (options.scenes != 'default') {
      let scenesFile = path.join(SRC, 'configs/') + scenesFileName + '.js'
      let scenesAt = scenesFile.replace('.js', '')
      if (fs.existsSync(scenesFile)) {
        const scenesConfig = require(scenesAt)(asset) || {}
        asset.options.scenes = _.merge({}, defaultSenesConfigContent, scenesConfig)
      } else {
        generateScenesDir(scenesDir, scenesFileName, asset)
      }
    }
    return asset
  } else {
    if (_.isPlainObject(options.scenes)) {
      asset.options.scenes = _.merge({}, defaultSenesConfigContent, options.scenes)
      return asset
    }
  }
}


// main启动某个有效的项目
function* buildOneProject(config, build_asset, envAttributs) {
  const {isDev, argv, TYPE} = build_asset
  if (TYPE == 'mp') {
    const xcxConfig = configs_wp_main(build_asset, envAttributs, 'xcx')
    yield buildXcxFiles(build_asset, xcxConfig)
  } else {
    const dllCommonConfig = configs_wp_main(build_asset, envAttributs, 'vendors')
    yield buildCommonFiles(build_asset, dllCommonConfig)
  
    const wpBusinessConfig = configs_wp_main(build_asset, envAttributs)
    yield buildBusinessFiles(build_asset, wpBusinessConfig)
  }
}


function getFreePort(port, step) {
  step = step || 30
  if (!occupiedPorts.includes(port)) {
    occupiedPorts.push(port)
  } else {
    port += step
    return getFreePort(port, step)
  }
  return {validPort: port}
}


// 检查aotoo.config中的参数
function* valideAttribut(key, val, param, param1) {
  let step = 30
  switch (key) {
    case 'name':
      const pconfig = param
      const src = pconfig.src
      let name = val
      if (!val) {
        if (fs.existsSync(src)) {
          const srcObj = path.parse(src)
          name = srcObj.name
        }
        // name = _.uniqueId('as_')
      }
      if (name) {
        if (names.indexOf(name) == -1){
          names.push(name)
          return name
        }
      }
      break;

    case 'src':
      if (fs.existsSync(val)) return val
      else {
        return false
      }
      break;

    case 'dist':
      if (val) {
        return val
      } 
      break;

    case 'host':
      if (val) return val
      else {
        return '0.0.0.0'
      }
      break;

    case 'port':
      step = param || 30
      if (val) {
        let vport = getFreePort(val, step)
        return vport.validPort
      } else {
        let vport = getFreePort(8300, step)
        return vport.validPort
      }
      break;

    case 'proxyPort':
      step = param || 1000
      if (val) {
        let vport = getFreePort(val, step)
        return vport.validPort
      } else {
        let vport = getFreePort(9300, step)
        return vport.validPort
      }
      break;
  }
}

/**
 * 
 * @param {*} assets  aotoo-config
 * 获取配置文件并启动编译
 * yarn run dev
 * yarn run dev --name aaa --name bbb --name bbb
 */
module.exports = function* main(assets, opts) {
  const {
    localPath,
    configs_aotoo,
    argv
  } = opts

  processArgv(argv)

  let argv_name = Commonds.name
  startDevQueues = []
  occupiedPorts = []
  
  if (argv_name) {
    argv_name = [].concat(argv_name)
  }

  if (!configs_aotoo.dist) {
    configs_aotoo.dist = path.join(localPath, 'dist')
  }

  // 抽取编译配置
  for (let config of assets) {

    // if (argv_name) {
    //   if (argv_name.indexOf(config.name) > -1) {
    //     config.startup = true
    //   } else {
    //     config.startup = false
    //   }
    // }

    if (!config.startup) {
      continue;
    }

    config.version = config.version || configs_aotoo.version || '1.0.0'
    const _port = yield valideAttribut('port', config.port)
    const _proxyPort = yield valideAttribut('proxyPort', (config.proxyPort||((config.port||_port)+17)))
    let build_asset = {
      name: yield valideAttribut('name', config.name, config),
      ROOT: configs_aotoo.ROOT,
      version: config.version,
      onlynode: config.onlynode,
      TYPE: config.type||'web',    // mp(小程序), web
      startup: config.startup,
      isDev: config.isDev || process.env.NODE_ENV == 'development',
      SRC: yield valideAttribut('src', config.src),
      DIST: yield valideAttribut('dist', config.dist, config),
      HOST: yield valideAttribut('host', config.host),
      PORT: _port,
      PROXYPORT: _proxyPort,
      options: config.options||{},
      argv
    }

    // src目录不存在
    if (!build_asset.name) {
      console.log('命名错误，请正确指定name属性')
      continue;
    }
    
    if (!build_asset.SRC) {
      console.log('项目目录不存在---', config.src);
      continue;
    }

    if (!build_asset.DIST) {
      const dest = configs_aotoo.dist
      const distEnv = build_asset.isDev ? 'dev' : 'pro'
      const newDist = path.join(dest, build_asset.name, build_asset.version, distEnv)
      build_asset.DIST = newDist
    }

    // if (argv_name) {
    //     build_asset.startup = config.startup
    //   // if (argv_name.indexOf(config.name) > -1) {
    //   //   build_asset.startup = true
    //   // } else {
    //   //   build_asset.startup = false
    //   // }
    // }

    // 是否为小程序
    // 是否需要初始化小程序目录
    if (build_asset.TYPE == 'mp') {
      generateXcx(build_asset)
    }


    // 生成server目录
    // @aotoo/aotoo-koa-server
    if (build_asset.startup) {
      if ((argv_name && Commonds.server) || config.server) {
        yield generateServer(build_asset)
      }
    }

    
    
    
    
    // 读取场景配置文件，如开发环境，测试环境，生产环境
    build_asset = yield getScenesConfig(build_asset)
    

    


    // 设置webpack的配置文件
    const envAttributs = require('./env_attrs')(build_asset)




    // 根据argv的参数，按指定名称编译
    // yarn run dev -- --name xxx --name yyy --name zzz
    if (argv_name) {
      if (argv_name.indexOf(config.name)>-1) {
        yield buildOneProject(config, build_asset, envAttributs)
        continue;
      }
    }

    // 按照配置中的startup是否为true来启动配置
    else {
      yield buildOneProject(config, build_asset, envAttributs)
    }
  }

  if (!startDevQueues.length) {
    if (argv_name) {
      console.log(`没有匹配到${argv_name}等项目，请检查配置文件`);
    } else {
      console.log('没有匹配到合适的源文件，检查配置文件');
      process.exit()
    }
  } else {
    yield startOneProjectDevServer(startDevQueues)
  }
}