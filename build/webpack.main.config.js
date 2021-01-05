let _ = require('lodash')
let fs = require('fs')
let fse = require('fs-extra')
let del = require('del')
let path = require('path')
let globby = require('globby')
let mkdirp = require('mkdirp') 
let HtmlWebpackPlugin = require('html-webpack-plugin') // HtmlWebpackTagsPlugin
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
let getEntryTrunks = require('./util/entry');
let createHtmlTemplate = require('./util/htmltemplate')
let Memfs = require('./plugins/memfs')
let pp = require('preprocess');

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
  const startFromServer = argv.server || checkIsProxy(asset)

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
  let preCssCommonFile = ''
  const {DIST} = asset
  const js_dist = path.join(DIST, 'js')
  const css_dist = path.join(DIST, 'css')
  globby.sync(js_dist).forEach(file=>{
    const fileObj = path.parse(file)
    if (fileObj.ext == '.js' && (fileObj.name.indexOf(precommonKey[0]) > -1 || fileObj.name.indexOf(precommonKey[1]) > -1)) {
      precommonFile = path_join(publicPath.js, fileObj.base)
    }
  })
  globby.sync(css_dist).forEach(file => {
    const fileObj = path.parse(file)
    if (fileObj.ext == '.css' && (fileObj.name.indexOf('common') === 0)) {
      preCssCommonFile = path_join(publicPath.css, fileObj.base)
    }
  })

  if (isContent) {
    tpC = template
  } else {
    tpC = fs.readFileSync(template, 'utf-8')
  }

  tpC = pp.preprocess(tpC, {}, {srcDir: SRC})

  if (startFromServer) {
    tpC = tpC.replace('~~root~~', '<%- root %>').replace('~~env~~', '<%- env %>').replace('~~pagetitle~~', '<%= pageTitle %>')
  } else {
    tpC = tpC.replace('~~root~~', '').replace('~~pagetitle~~', '<%= title %>');
    tpC = tpC.replace('~~env~~', '<script>var noserver=true; </script>');
  }

//   const re_prescript = /<script>[\s\S]+?<\/script>/i
//   const re_script = /<script>[\s\S]+?<\/script>/ig
//   const scripts = tpC.match(re_script)||[]
//   tpC = tpC.replace(re_prescript, '')

//   // scripts.push(`<script src="${precommonFile}"></script>`)
//   // const str_scripts = scripts.join('\n') + '</body>'

//   let str_scripts = `
// <script src="${precommonFile}"></script>
// </body>`
//   if (startFromServer) {
//     scripts.shift('<%- attachJs %>')
//   }
//   str_scripts += scripts.join('\n')
//   tpC = precommonFile ? tpC.replace('</body>', str_scripts) : tpC

  if (precommonFile) {
    tpC = tpC.replace('~~commonscript~~', `<script src="${precommonFile}"></script>`)
  } else {
    tpC = tpC.replace('~~commonscript~~', '')
  }

  if (preCssCommonFile) {
    tpC = tpC.replace('~~commoncss~~', `<link rel="stylesheet" type="text/css" href="${preCssCommonFile}">`)
  } else {
    tpC = tpC.replace('~~commoncss~~', '')
  }
  
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
      // chunks: ['common', trunkname],
      chunks: ['common', trunkname],
      filename: `html/${trunkname}.html`,
    }
  )
}

function generateHtmlDir(target) {
  mkdirp.sync(target)
}

function getEntry(src, params) {
  if (src) {
    const HTMLSRC = path.join(src, params.dir)
    if (!fs.existsSync(HTMLSRC)) {
      // generateHtmlDir(HTMLSRC)
      return {}
    }
    return getEntryTrunks(HTMLSRC, params)
  }
}

function checkIsProxy(asset) {
  const {SRC, server} = asset
  const src = SRC
  const serverPath = path.join(src, 'server')
  return fs.existsSync(serverPath) && server
}

module.exports = function createWpConfig(asset, envAttributs, buildType) { // buildType = 'vendors' / 'xcx'
  const isVendors = buildType && (buildType == 'vendors' || buildType == 'common' || buildType == 'xcx')
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
  const {DIST, SRC, argv, isDev, onlynode} = asset
  if (onlynode || argv.start) {
    return
  }
  let delSomething = [
    DIST + '/css/**',
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
    if (buildType) {
      delTarget = [].concat(delSomething);  
    } else {
      delTarget = [].concat(delSomething).concat(delCommonFiles)
    }
  }

  if (isXcx) {
    delTarget = [DIST + '/**']
    if (!argv.rebuild) {
      delTarget = []
    }
  }

  // 只启动node端
  if (argv.start) {
    delTarget = []
  }

  del.sync(delTarget, { force: true })
}

function customWebpackConfig(asset, oriConfig, isdll){
  let {SRC} = asset
  let appendConfigFile = path.join(SRC, 'wp-config.js')
  if (fse.pathExistsSync(appendConfigFile)) {
    let appendConfigFun = require(appendConfigFile)
    if (_.isFunction(appendConfigFun)) {
      oriConfig = appendConfigFun(oriConfig, isdll)||oriConfig
    }
  }
  return oriConfig
}

// 生成小程序的配置文件
function createXcxConfig(asset, envAttributs) {
  return require('./webpack.xcx.config')(asset, envAttributs)
}

// 生成公共文件precommon
function createCommonConfig(asset, envAttributs) {
  let wpCommonConfig = require('./webpack.common.config')(asset, envAttributs)
  return customWebpackConfig(asset, wpCommonConfig, 'dll')
}

// 生成业务文件
function createBusinessConfig(asset, envAttributs) {
  try {

    const { startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, argv } = asset
    const isProxy = checkIsProxy(asset)
    const wpBaseConfig = require('./webpack.base.config')(asset, envAttributs)

    // html入口集合
    const html_entries = getEntry(SRC, { dir: 'html', type: 'html' })

    // css入口集合
    const css_entries = getEntry(SRC, { dir: 'css', type: 'styl' })

    const js_entries_css = getEntry(SRC, { dir: 'js', type: 'styl' })
    const js_entries_html = getEntry(SRC, { dir: 'js', type: 'html' })
    
    // js入口集合
    const js_entries   = envAttributs('entries', path.join(SRC, 'js'), {
      exclude: ['common', 'vendors'],  // 排除common目录
      isProxy
    })

    const resause_entries = (()=>{
      let result = {}

      Object.keys(js_entries).forEach(ky=>{
        let cssTrunk = css_entries[ky]
        if (css_entries[ky]) {
          result[ky] = [].concat(js_entries[ky]).concat(cssTrunk)
        } else {
          result[ky] = js_entries[ky]
        }

        if (js_entries_css[ky]) {
          result[ky] = result[ky].concat(js_entries_css[ky])
        }
      })
      return result
    })()

    
    // 生成htmlplugins的配置
    const htmlPlugins = []
    _.forEach(js_entries, function(val, key) {
      let rithtTemplate = js_entries_html[key] || html_entries[key]
      if (rithtTemplate) {
        let template = fse.readFileSync(rithtTemplate[0])
        htmlPlugins.push(newHtmlPlugin(key, {
          alwaysWriteToDisk: true,
          template: rithtTemplate[0],
          title: 'Custom template'
        }, asset))
      } else {
        htmlPlugins.push(
          new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            templateContent: re_TemplateContent(createHtmlTemplate(asset, {checkIsProxy}), asset, true),
            inject: 'body',
            title: 'Auto template',
            chunks: ['common', key],
            filename: `html/${key}.html`,
          })
        )
      }
    })
    htmlPlugins.push(new HtmlWebpackHarddiskPlugin())
    htmlPlugins.push(new Memfs({
      mapfile: {
        js: /\.js(x?)/,
        css: ['.css'],
        html: /\.html/
      }
    }))
    
    wpBaseConfig.plugins = wpBaseConfig.plugins.concat(htmlPlugins)


    if (!Object.keys(js_entries).length) {
      throw new Error('js文件不存在')
    }


    wpBaseConfig = Object.assign({}, wpBaseConfig, {
      // entry: js_entries
      entry: resause_entries
    })

    return customWebpackConfig(asset, wpBaseConfig)
  } catch (error) {
    console.log(error);
  }
}