const co      = require('co')
const fs      = require('fs')
const path    = require('path')
const argv    = require('minimist')(process.argv.slice(2));
const generateFedJsDirectory = require('./util/generateFedJsDirectory')


const Commonds = {
  name: argv.name,
  port: argv.port,
  config: argv.config,
  scenes: argv.scenes, // 场景
  rebuild: argv.rebuild,
  server: argv.server,
  start: argv.start   // 纯粹启动Node端的服务
}

let configs_aotoo
let configs_apps

let localPath = process.cwd()
let configPath = path.join(localPath, 'aotoo.config.js')
// if (Commonds.config) {
//   configPath = Commonds.config
// }
if (fs.existsSync(configPath)) {
  configs_aotoo = require(configPath)
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