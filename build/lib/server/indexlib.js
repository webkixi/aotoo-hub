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
const webpack = require('webpack')
const _ = require('lodash')

const log = console.log
require('babel-core/register')
require("babel-polyfill")
const appModulePath = require('app-module-path')
appModulePath.addPath(path.join(__dirname, '../')) // 强插root路径到require中，
const aotooExtendsPath = path.join(__dirname, '../../../aotooExtends')
if (fs.existsSync(aotooExtendsPath)) {
  appModulePath.addPath(aotooExtendsPath) // 强插root路径到require中，
}

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

module.exports = function (appConfigs) {
  // const AssetConfigs = require('./configs')() || defaultConfig
  const AssetConfigs = appConfigs || defaultConfig
  const { TYPE, DIST, SRC, PORT, isDev, name, options } = AssetConfigs
  const SCENES = options.scenes
  const isXcx = (TYPE == 'mp' || TYPE == 'ali')
  CONFIG.DIST = DIST
  const hooks = CONFIG.hooks || {}
  process.env.DIST = DIST

  const path_controls = path.join(__dirname, './pages') // 指定controls的目录
  const path_plugins  = path.join(__dirname, './plugins') // 指定插件目录
  const path_views    = path.join(DIST, 'html')  // 指定模板目录
  const path_js       = path.join(DIST, 'js')  // 静态js文件目录
  const path_css      = path.join(DIST, 'css')  // 静态css文件目录
  const path_images   = path.join(__dirname, '../images')  // 静态图片目录

  // app初始化
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
      dynamic: true,
      prefix: '/js'
    })
  })

  checkExist(path_css, (p) => {
    app.statics(p, {
      dynamic: true,
      prefix: '/css'
    })
  })

  checkExist(path_images, (p) => {
    app.statics(p, {
      dynamic: true,
      prefix: '/images'
    })
  })

  app.apis(CONFIG.apis)

  app.utile('webpack', async function(fkp, opts={}) {
    const root = CONFIG.ROOT
    const wpbin = path.join(root, 'node_modules/.bin/webpack')
    const configFile = opts.config
    let compilerConfig
    if (configFile && Aotoo.isString(configFile) && fs.existsSync(configFile)) {
      compilerConfig = require(configFile)

      if (Aotoo.isFunction(compilerConfig)) {
        compilerConfig = compilerConfig(app)
      } 

      if (typeof compilerConfig == 'object') {
        compilerConfig = [].concat(compilerConfig)
      }
    }

    if (Aotoo.isFunction(configFile)) {
      compilerConfig = configFile(app)
    } else {
      if (Aotoo.isObject(configFile)) {
        compilerConfig = configFile
      }
    }

    if (compilerConfig) {
      const compiler = webpack(compilerConfig)
      compiler.run((err, state)=>{
        if (err) { console.log(err); }
      })
    }
  })

  // session未完成 钩子
  // 插件库 钩子
  // 上传钩子
  // 上传插件
  // 公众号插件

  if (hooks['global-config-plugin']) {
    let cfgPlugins = hooks['global-config-plugin']
    if (_.isFunction(cfgPlugins)) cfgPlugins = [cfgPlugins]
    if (_.isArray(cfgPlugins)) {
      global.CONFIG = cfgPlugins.reduce((p, n) => {
        if (_.isFunction(n)) {
          return n(p, AssetConfigs) || p
        } else if (_.isPlainObject(n)) {
          return _.merge({}, p, n)
        } else {
          return p
        }
      }, CONFIG)

      global.Configs = global.CONFIG
      if (AssetConfigs.options) {
        AssetConfigs.options.scenes = global.CONFIG
      }
    }
  }

  if (hooks['app-use-set']) {
    let staticHooks = hooks['app-use-set']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks)) {
      staticHooks.forEach(fun => {
        if (_.isFunction(fun)) {
          const context = {
            use: function () {
              app.use.apply(app, arguments)
            }
          }
          fun(context)
        }
      })
    }
  }

  // 静态资源的钩子
  if (hooks['app-statics-set']) {
    let staticHooks = hooks['app-statics-set']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks)) {
      staticHooks.forEach(fun => {
        if (_.isFunction(fun)) {
          const context = {
            statics: function () {
              app.statics.apply(app, arguments)
            }
          }
          fun(context)
        }
      })
    }
  }
    


  if (hooks['app-utile-set']) {
    let staticHooks = hooks['app-utile-set']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks)) {
      staticHooks.forEach(fun => {
        if (_.isFunction(fun)) {
          const context = {
            utile: function () {
              app.utile.apply(app, arguments)
            }
          }
          fun(context)
        }
      })
    }
  }

  if (hooks['app-plugins-set']) {
    let staticHooks = hooks['app-plugins-set']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks)) {
      staticHooks.forEach(fun => {
        if (_.isFunction(fun)) {
          const context = {
            plugins: function () {
              app.utile.apply(app, arguments)
            }
          }
          fun(context)
        }
      })
    }
  }

  if (hooks['fetch-inject-origin-get']) {
    let staticHooks = hooks['fetch-inject-origin-get']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks) && Fetch.hooks) {
      Fetch.hooks['origin-fetch-get'] = staticHooks
    }
  }

  if (hooks['fetch-inject-origin-post']) {
    let staticHooks = hooks['fetch-inject-origin-post']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks) && Fetch.hooks) {
      Fetch.hooks['origin-fetch-post'] = staticHooks
    }
  }

  if (hooks['fetch-inject-pre-get']) {
    let staticHooks = hooks['fetch-inject-pre-get']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks) && Fetch.hooks) {
      Fetch.hooks['pre-fetch-get'] = staticHooks
    }
  }

  if (hooks['fetch-inject-pre-post']) {
    let staticHooks = hooks['fetch-inject-pre-post']
    if (_.isFunction(staticHooks)) staticHooks = [staticHooks]
    if (_.isArray(staticHooks) && Fetch.hooks) {
      Fetch.hooks['pre-fetch-post'] = staticHooks
    }
  }


  /**
   * 设定静态文件映射表
   * 格式: {public: {css: '/css/', js: '/js/'}, css: {...}, js: {...}}
   * public: 指定公共路径，类似于webpack中的publicPath
   * js: js映射表，key=>映射名称，value=>静态文件的真实地址
   * css: css映射表, key => 映射名称， value => 静态文件的真实地址
  */
  app.setMapper(CONFIG.mapper||{})
  // Aotoo.inject.mapper = CONFIG.mapper


  /**
   * 设定apis
   * apis用于fetch异步获取后端数据的请求地址列表
   * 格式{api: apiurl}
   * key=> 请求名称
   * value=> 实际请求地址
   * 用法
   * const result = await Fetch.post('xxx', param)
   */
  app.setApis(CONFIG.apis||{})


  /**
   * 设定公共路径
   * 类似于webpack中的publicPath
   * 格式: {js: '/js/', css: '/css/'}
   */
  app.setPublic(SCENES.publicPath || {})



  /**
   * 设定node端fetch的参数
   * 基于request库事项
   * 格式 {headers: {}, timeout: 10000}
   * headers: 设定传输文件头
   * timeout: request传输时间
   * 参考: https://www.npmjs.com/package/request
   */
  app.setFetchOptions(SCENES.fetchOptions)




  /**
   * 设定node端Lru cache的相关参数
   * 基于lur-cache库实现，参考：https://www.npmjs.com/package/lru-cache
   */
  app.setCacheOptions(SCENES.cacheOptions)




  /**
   * 设置自定义路由
   * 格式：{prefixName: {get: [...], post: [...], customControl: async callback}}
   * (get/post) => ['/', '/:cat', '/:cat/:title', '/:cat/:title/:id', '/:cat/:title/:id/:dest', '/:cat/:title/:id/:dest/:a/:b']，设定访问深度
   * customControl => 自定义路由响应方法
   * 参考: https: //www.npmjs.com/package/koa-router
   */
  const configRouterPrefixes = SCENES.routerPrefixes || (SCENES.routerOptions && SCENES.routerOptions.prefixes) || {}
  const myRouterPrefixes = _.merge({}, configRouterPrefixes, {
    '/mapper': {
      customControl: async function (ctx, next) {
        ctx.body = CONFIG.mapper
      }
    }, 
    '/api': {
      customControl: async function (ctx, next) {
        const fkp = ctx.fkp
        let route = ctx.aotooRoutePath
        const isAjax = fkp.isAjax()
        route = route.replace('api/', '')

        let body = (ctx.method == 'GET' ? ctx.query : ctx.request.body) || {}
        if (hooks['pre-fetch-set']) {
          let cfgPlugins = hooks['pre-fetch-set']
          if (_.isFunction(cfgPlugins)) cfgPlugins = [cfgPlugins]
          if (_.isArray(cfgPlugins)) {
            body = cfgPlugins.reduce((p, n) => {
              if (_.isFunction(n)) {
                return n(p, ctx) || p
              } else if (_.isPlainObject(n)) {
                return _.merge({}, p, n)
              } else {
                return p
              }
            }, body)
          }
        }

        if (ctx.method == 'GET') {
          if (isAjax) ctx.body = await Fetch.get(route, body)
        } else {
          ctx.body = await Fetch.post(route, body)
        }
      }
    }
  })
  app.setRouterPrefixes(myRouterPrefixes)




  /**
   * 设置路由属性
   * 格式：{allMethods: ['get', 'post', 'put', 'del'], parameters: {get: [....], post: [....]}, prefixes: {....}}
   */
  if (SCENES.routerOptions) {
    SCENES.routerOptions.prefixes = myRouterPrefixes
    app.setRouterOptions(SCENES.routerOptions)
  }

  return app
}
