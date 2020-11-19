const co = require('co')
const fs = require('fs')
const fse = require('fs-extra')
const _   = require('lodash')
const path = require('path')
const globby = require('globby')
const chalk = require('chalk')
const sleep = require('./sleep')

// 1、生成server端的配置文件
//    作为全局global.CONFIG
// 2、生成.babelrc，支持jsx语法
function* generateServerConfigsFile(DISTSERVER, path_mapfile, path_config_file, asset) {
  const {SRC, isXcx, DIST} = asset

  if (fs.existsSync(path_config_file)) {
    fs.unlinkSync(path_config_file)
    yield sleep(1000, '==========  创建configs文件  ============')
  }

  return new Promise((res, rej)=>{
    if (fs.existsSync(path_mapfile)) {
      var hasMapper = true
      var mapper = require(path_mapfile)
    }

    if (asset.options) {
      var scenes = asset.options.scenes || "default"
    }

    const defaultScenePath = path.join('../', 'configs/default')
    const scenePath = scenes == 'default' ? defaultScenePath : path.join('../', 'configs', scenes)

    const configsContent = 
`
const path = require('path')
const asset = ${JSON.stringify(asset)} 
const scene = '${scenes}'
module.exports = function (opts) {
  let targetConfig = require('${defaultScenePath}')(asset)
  if (scene && scene != 'default') {
    const sceneConfig = require('${scenePath}')(asset)
    targetConfig = Object.assign({}, targetConfig, sceneConfig)
  }
  targetConfig.env = asset
  if (typeof wx == 'undefined') {
    global.Configs = global.CONFIG = targetConfig
  } else {
    wx.CONFIG = targetConfig
  }
  let oldRoot = asset.ROOT
  let oldSrc = asset.SRC
  let oldSSrc = path.join(oldSrc, 'server')
  let oldDist = asset.DIST
  let oldContentPath = asset.contentBase
  let nRoot = ''
  let nSrc = ''
  let nDist = ''
  let nContentPath = '';

  const runself = (() => {
    let tmpsrc = oldSrc.replace(oldRoot, '')
    let tmpssrc = oldSSrc.replace(oldRoot, '')
    let tmpdist = oldDist.replace(oldRoot, '')
    tmpsrc = path.join('/', tmpsrc)
    tmpssrc = path.join('/', tmpssrc)
    tmpdist = path.join('/', tmpdist)
    let tmpAry = tmpssrc.split('/')
    tmpAry.forEach((item, ii) => {
      if (ii > 0) {
        if (!nRoot) {
          nRoot = __dirname
        }
        nRoot = path.join(nRoot, '../')
      }
    })
    nSrc = path.join(nRoot, tmpsrc)
    nDist = path.join(nRoot, tmpdist)
    nContentPath = nDist
  })()
  asset.ROOT = nRoot
  asset.SRC = nSrc
  asset.DIST = nDist
  asset.options.scenes = targetConfig
  asset.options.scenes.isXcx = ${isXcx}
  const mapper = ${hasMapper ? 'require("'+path_mapfile+'")' : '{}'}
  asset.options.scenes.mapper = mapper
  if (typeof wx == 'undefined') {
    global.CONFIG.ROOT = nRoot
    global.Configs.mapper = global.CONFIG.mapper = mapper
  } else {
    wx.CONFIG.ROOT = nRoot
  }

  process.env.APPENV_DIST = asset.DIST
  process.env.APPENV_SRC = asset.SRC
  return asset
}
`
    fse.outputFileSync(path_config_file, configsContent)
    return res(true)
  })


  /**
   * 设置mapper
   * 将静态文件的映射文件mapper.json挂载到场景configs配置上
  */
  // return new Promise(function (res, rej) {
  //   let mapper = {}
  //   if (fs.existsSync(path_mapfile)) {
  //     mapper = require(path_mapfile)
  //   }

  //   if (asset.options) {
  //     if ( !asset.options.scenes) {
  //       asset.options.scenes = {}
  //     }

  //     let scenes = asset.options.scenes
  //     if (typeof scenes == 'string') {
  //       scenes = asset.options.scenes = {}
  //     }

  //     if (typeof scenes == 'object') {
  //       asset.options.scenes.mapper = mapper
  //       asset.options.scenes.isXcx = asset.isXcx
  //     }

  //     let scenesBak = _.cloneDeep(asset.options.scenes)
  //     // delete scenesBak.apis
  //     // delete scenesBak.mapper
  //     delete scenesBak.publicPath
  //     delete scenesBak.fetchOptions
  //     delete scenesBak.cacheOptions
  //     delete scenesBak.cacheOptions
  //     delete scenesBak.bodyOptions
  //     delete scenesBak.routerOptions
  //     delete scenesBak.routerPrefixes

  //     scenesBak.ROOT = asset.ROOT


  //     const configsContent = `
  //     const fs = require('fs')
  //     const path = require('path')
  //     const _ = require('lodash')
  //     module.exports = function(opts){
  //       global.Configs = global.CONFIG = ${JSON.stringify(scenesBak)}
  //       let rtnJson = ${JSON.stringify(asset)}  
  //       let oldRoot = rtnJson.ROOT
  //       let oldSrc = rtnJson.SRC
  //       let oldSSrc = path.join(oldSrc, 'server')
  //       let oldDist = rtnJson.DIST
  //       let oldContentPath = rtnJson.contentBase
        
  //       let argv = rtnJson.argv
  //       let scenes = argv.config || argv.scenes || 'default'
  //       scenesFile = path.join(oldSrc, 'configs/' + scenes)
  //       if (fs.existsSync(scenesFile+'.js')) {
  //         const scenesConfig = require(scenesFile)
  //         global.Configs = global.CONFIG = _.merge({}, global.CONFIG, scenesConfig)
  //         if (rtnJson.options) {
  //           rtnJson.options.scenes = global.CONFIG
  //         }
  //       }

  //       let nRoot = ''
  //       let nSrc = ''
  //       let nDist = ''
  //       let nContentPath = ''

  //       const pathLevel = (()=>{
  //         let tmpsrc = oldSrc.replace(oldRoot, '')
  //         let tmpssrc = oldSSrc.replace(oldRoot, '')
  //         let tmpdist = oldDist.replace(oldRoot, '')
  //         tmpsrc = path.join('/', tmpsrc)
  //         tmpssrc = path.join('/', tmpssrc)
  //         tmpdist = path.join('/', tmpdist)
  //         let tmpAry = tmpssrc.split('/')
  //         tmpAry.forEach((item, ii)=> {
  //           if (ii>0) {
  //             if (!nRoot) {
  //               nRoot = __dirname
  //             }
  //             nRoot = path.join(nRoot, '../')
  //           }
  //         })
  //         nSrc = path.join(nRoot, tmpsrc)
  //         nDist = path.join(nRoot, tmpdist)
  //         nContentPath = nDist
  //       })()

  //       global.CONFIG.ROOT = nRoot
  //       rtnJson.ROOT = nRoot
  //       rtnJson.SRC = nSrc
  //       rtnJson.DIST = nDist
  //       return rtnJson
  //     }`

  //     fs.writeFileSync(path_config_file, configsContent, 'utf-8')
  //     return res(true)
  //   }
  // })
}

module.exports = generateServerConfigsFile