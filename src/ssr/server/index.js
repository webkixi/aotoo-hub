/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */
const co = require('co')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const log = console.log
require('babel-core/register')
require("babel-polyfill")
require('app-module-path').addPath(path.join(__dirname, '../')) // 强插root路径到require中，
const aks = require('@aotoo/aotoo-koa-server')
const defaultConfig = {
  DIST: '',
  SRC: '',
  PORT: '',
  isDev: ''
}

function checkExist(filename, cb, falseCb) {
  if (fs.existsSync(filename)) {
    cb(filename)
  } else {
    if (typeof falseCb == 'function') {
      falseCb()
    }
  }
}

const AssetConfigs = require('./configs')() || defaultConfig
const { DIST, SRC, PORT, isDev, name } = AssetConfigs

// controls的路径
const path_controls = path.join(__dirname, './pages')
const path_plugins = path.join(__dirname, './plugins')
const path_views    = path.join(DIST, 'html')
const path_js       = path.join(DIST, 'js')
const path_css      = path.join(DIST, 'css')
const path_images   = path.join(__dirname, '../images')

const app = aks()

checkExist(path_controls, 
   p => app.controls(p),
  () =>{
    const path_controls_x = path.join(__dirname, './controls')
    checkExist(path_controls_x, p => app.controls(p))
  }
)

checkExist(path_plugins, (p) => {
  app.pluginsFolder(p)
})

checkExist(path_views, (p) => {
  app.views(p)
})

checkExist(path_js, (p) => {
  app.statics(p, {
    prefix: '/js'
  })
})

checkExist(path_css, (p) => {
  app.statics(p, {
    prefix: '/css'
  })
})

checkExist(path_images, (p) => {
  app.statics(p, {
    dynamic: true,
    prefix: '/images'
  })
})

app.setMapper(CONFIG.mapper)
app.setPublic({})
app.setFetchOptions({})
app.setCacheOptions({})
app.setRouterPrefixes({
  '/mapper': {
    customControl: async function (ctx, next) {
      ctx.body = CONFIG.mapper
    }
  }
})

app.listen(PORT, function (err, stat) {
  if (err) console.log(err);
  const destPort = chalk.green.bold(`【${PORT}】`)
  console.log(`
============================
+ node-server           +
+ 服务名: ${name}       +
+ 端口: ${destPort}      +
+===========================
    `);
})

// co(app.init()).then(function (server) {
//   server.listen(PORT, function (err, stat) {
//     if (err) console.log(err);
//     console.log('========== service start ==========');
//   })
// })


