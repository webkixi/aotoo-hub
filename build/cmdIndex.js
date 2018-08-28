const co      = require('co')
const fs      = require('fs')
const path    = require('path')
const generateFedJsDirectory = require('./util/generateFedJsDirectory')

function cmdIndex(params) {
  const {argv} = params
  let configs_aotoo, configs_apps=[];
  let localPath = process.cwd()
  configs_aotoo = require(argv.config); 
  configs_aotoo.localPath = localPath
  configs_apps = configs_aotoo.apps && configs_aotoo.apps.length ? configs_aotoo.apps : generateFedJsDirectory(configs_aotoo)
  if (configs_apps.length) {
    process.aotooConfigs = configs_aotoo
    co(require('./main')(configs_apps, {
      localPath,
      configs_aotoo,
      argv
    }))
  }
}

module.exports = cmdIndex