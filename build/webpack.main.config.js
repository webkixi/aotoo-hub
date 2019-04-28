var _ = require('lodash')
var fs = require('fs')
var del = require('del')
var path = require('path')
var globby = require('globby')
var mkdirp = require('mkdirp') 
var HtmlWebpackPlugin = require('html-webpack-plugin')
  , getEntryTrunks = require('./util/entry');

const _tempC = `
  <!doctype html>
  <html class="no-js" lang="en">
    <head>
      <title><%=title%></title>
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    </head>
    <body>
      <div class="container" id="root">~~root~~</div>
    </body>
  </html>
`
function tempC(asset) {
  const {SRC, argv} = asset
  const startFromServer = argv.server || checkIsProxy(SRC)
  if (startFromServer) {
    return _tempC.replace('~~root~~', '<%- root %>')
  } else {
    return _tempC.replace('~~root~~', '')
  }
}

const path_join = function() {
  const args = Array.from(arguments)
  return args.reduce((pre, next)=>{
      const lastChar = pre.charAt(pre.length-1)
      if (lastChar == path.sep) {
        if (pre==path.sep) {
          if (pre != next) {
            return pre + next
          } else {
            return next
          }
        }
        return pre + next
      } else {
        if (pre == '' && next.indexOf('http') == 0) {
          return next
        }

        if (pre == path.sep) {
          return path.sep + next
        } else {
          let combineStr = pre + path.sep + next
          const re = /[\/]+/g
          combineStr = combineStr.replace(re, path.sep)
          return combineStr
        }
      }
  }, '')
}

function getPublicPath(options) {
  let publicPath = options.publicPath || '/'
  // if (options.scenes && options.scenes.publicPath) {
  //   publicPath = options.scenes.publicPath
  // }
  return publicPath
}

function re_TemplateContent(template, asset, isContent) {
  const {isDev, SRC, argv} = asset
  const startFromServer = checkIsProxy(SRC) 

  let tpC = ''
  const precommonKey = ['precommon', 'vendors']
  const { options } = asset
  const _publicPath = getPublicPath(options)
  const publicPath = {
    js:  path_join(_publicPath, 'js'),
    css: path_join(_publicPath, 'css'),
    img: path_join(_publicPath, 'images')
  }

  let precommonFile = isDev ? path_join(publicPath.js, 'vendors.js') : ''
  const {DIST} = asset
  const js_dist = path.join(DIST, 'js')
  globby.sync(js_dist).forEach(file=>{
    const fileObj = path.parse(file)
    if (fileObj.ext == '.js' && (fileObj.name.indexOf(precommonKey[0]) > -1 || fileObj.name.indexOf(precommonKey[1]) > -1)) {
      precommonFile = path_join(publicPath.js, fileObj.base)
    }
  })
  if (isContent) {
    tpC = template
  } else {
    tpC = fs.readFileSync(template, 'utf-8')
  }
  const re_prescript = /<script>[\s\S]+?<\/script>/i
  const re_script = /<script>[\s\S]+?<\/script>/ig
  const scripts = tpC.match(re_script)||[]
  tpC = tpC.replace(re_prescript, '')

  // scripts.push(`<script src="${precommonFile}"></script>`)
  // const str_scripts = scripts.join('\n') + '</body>'

  let str_scripts = `
<script src="${precommonFile}"></script>
</body>`
  if (startFromServer) {
    scripts.shift('<%- attachJs %>')
  }
  str_scripts += scripts.join('\n')
  tpC = precommonFile ? tpC.replace('</body>', str_scripts) : tpC
  
  return tpC
}

// 生成htmlplugins的配置
function newHtmlPlugin(trunkname, param, asset) {
  const tpC = re_TemplateContent(param.template, asset)
  return new HtmlWebpackPlugin(
    {
      alwaysWriteToDisk: true,
      title: param.title,
      templateContent: tpC,
      inject: 'body', // Inject all scripts into the body 
      chunks: ['common', trunkname],
      filename: `html/${trunkname}.html`,
    }
  )
}

function generateHtmlDir(target) {
  mkdirp.sync(target)
}

function getHtmlEntry(src, params) {
  if (src) {
    const HTMLSRC = path.join(src, 'html')
    if (!fs.existsSync(HTMLSRC)) {
      // generateHtmlDir(HTMLSRC)
      return {}
    }
    return getEntryTrunks(HTMLSRC, params)
  }
}

function checkIsProxy(src) {
  const serverPath = path.join(src, 'server')
  return fs.existsSync(serverPath)
}

module.exports = function createWpConfig(asset, envAttributs, buildType) { // buildType = 'vendors' / 'xcx'
  const isVendors = buildType && (buildType == 'vendors' || buildType == 'common')
  const isXcx = buildType && buildType == 'xcx'

  if (isXcx) {
    delDist(asset, isVendors, isXcx)
    return createXcxConfig(asset, envAttributs)
  } else {
    // 删除旧有数据，重新编译
    delDist(asset, isVendors)
  
    if (buildType) {
      return createCommonConfig(asset, envAttributs)
    } else {
      return createBusinessConfig(asset, envAttributs)
    }
  }
}

function delDist(asset, buildType, isXcx) {

  const {DIST, SRC, argv, isDev} = asset
  let delSomething = [
    DIST + '/css/***',
    DIST + '/html/**',
    DIST + '/js/*',
    DIST + '/*.hot-update.*',
    DIST + '/mapfile.json'
  ]

  let delCommonFiles = [
    '!' + (DIST + '/js/precommon*'),
    '!' + (DIST + '/js/vendors*'),
    '!' + (DIST + '/css/common*'),
  ]

  let delTarget = delSomething

  if (isDev) {
    if (!argv.rebuild || !buildType) {
      delTarget = [].concat(delSomething).concat(delCommonFiles)
    }
  } else {
    delTarget = [].concat(delSomething).concat(delCommonFiles)
  }

  if (isXcx) {
    delTarget = [DIST + '/***']
  }

  // 只启动node端
  if (argv.start) {
    delTarget = []
  }

  del.sync(delTarget, { force: true })
}

// 生成小程序的配置文件
function createXcxConfig(asset, envAttributs) {
  return require('./webpack.xcx.config')(asset, envAttributs)
}

// 生成公共文件precommon
function createCommonConfig(asset, envAttributs) {
  return require('./webpack.common.config')(asset, envAttributs)
}

// 生成业务文件
function createBusinessConfig(asset, envAttributs) {
  try {

    const { startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, argv } = asset
    const isProxy = checkIsProxy(SRC)
    const wpBaseConfig = require('./webpack.base.config')(asset, envAttributs)
  

    // html入口集合
    const html_entries = getHtmlEntry(SRC, { type: 'html' })
    
    
    // js入口集合
    const js_entries   = envAttributs('entries', path.join(SRC, 'js'), {
      exclude: ['common', 'vendors'],  // 排除common目录
      isProxy
    })

    
    // 生成htmlplugins的配置
    const htmlPlugins = []
    _.forEach(js_entries, function(val, key) {
      if (html_entries[key]) {
        htmlPlugins.push(newHtmlPlugin(key, {
          template: html_entries[key][0],
          title: 'Custom template'
        }, asset))
      } else {
        htmlPlugins.push(
          new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            templateContent: re_TemplateContent(tempC(asset), asset, true),
            inject: 'body',
            title: 'Auto template',
            chunks: ['common', key],
            filename: `html/${key}.html`,
          })
        )
      }
    })
    
    wpBaseConfig.plugins = wpBaseConfig.plugins.concat(htmlPlugins)


    if (!Object.keys(js_entries).length) {
      throw new Error('js文件不存在')
    }


    return Object.assign({}, wpBaseConfig, {
      entry: js_entries
    })

  } catch (error) {
    console.log(error);
  }
}