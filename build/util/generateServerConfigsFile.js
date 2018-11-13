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
  const {SRC, DIST} = asset

  if (fs.existsSync(path_config_file)) {
    fs.unlinkSync(path_config_file)
    yield sleep(1000, '==========  等待创建server端的configs文件  ============')
  }


  /**
   * 设置mapper
   * 将静态文件的映射文件mapper.json挂载到场景configs配置上
  */
  return new Promise(function (res, rej) {
    let mapper = {}
    if (fs.existsSync(path_mapfile)) {
      mapper = require(path_mapfile)
    }

    if (asset.options) {
      if ( !asset.options.scenes) {
        asset.options.scenes = {}
      }

      const scenes = asset.options.scenes
      if (typeof scenes == 'string') {
        asset.options.scenes = {}
      }

      if (typeof scenes == 'object') {
        asset.options.scenes.mapper = mapper
      }

      let scenesBak = _.cloneDeep(scenes)
      // delete scenesBak.apis
      // delete scenesBak.mapper
      delete scenesBak.publicPath
      delete scenesBak.fetchOptions
      delete scenesBak.cacheOptions
      delete scenesBak.cacheOptions
      delete scenesBak.bodyOptions
      delete scenesBak.routerOptions
      delete scenesBak.routerPrefixes

      scenesBak.ROOT = asset.ROOT


      const configsContent = `module.exports = function(opts){
        global.Configs = global.CONFIG = ${JSON.stringify(scenesBak)}
        return ${JSON.stringify(asset)}
      }`

      fs.writeFileSync(path_config_file, configsContent, 'utf-8')
      return res(true)
    }
  })
}

module.exports = generateServerConfigsFile