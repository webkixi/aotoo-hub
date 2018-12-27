const co = require('co')
const fs = require('fs')
const fse = require('fs-extra')
const globby = require('globby')
const del = require('del')
const net = require('net')
const ejs = require('ejs')
const path = require('path')
const chalk = require('chalk')
const log = console.log
const webpack = require('webpack')
const React = require('react')
const ReactDomServer = require('react-dom/server')
const WebpackDevServer = require('webpack-dev-server')
const WriteAssetsWebpackPlugin = require('write-assets-webpack-plugin')

const browserSync = require('../util/openBrowser')
const fillupMapfile = require('../util/fillupMapfile3ds')

function getPublicPath(options) {
  let publicPath = options.publicPath || '/'
  if (options.scenes && options.scenes.publicPath) {
    publicPath = options.scenes.publicPath
  }
  return publicPath
}

function* wpDevServer(compiler, asset) {
  const {
    contentBase,
    host,
    port,
    SRC,
    DIST,
    options,
    name
  } = asset
  
  let publicPath = getPublicPath(options)
  const DISTHTML = path.join(DIST, 'html')
  const DISTCSS = path.join(DIST, 'css')
  const DISTJS = path.join(DIST, 'js')
  const DISTIMG = SRC

  new WebpackDevServer(compiler, {
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
    contentBase: contentBase,
    // publicPath: publicPath,
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
      depth: false,
      entrypoints: true,
      // excludeAssets: /app\/assets/,
      errors: true,
      errorDetails: true,
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
    host: host || 'localhost',
    watchContentBase: true,
    // startup: true
    before: function (app) {
      app.engine('html', ejs.renderFile)
      app.set('view engine', 'html')
      app.set('views', DISTHTML)

      app.get(/\/img\/(.*)\.(ico|jpg|jpeg|png|gif)$/, function (req, res) {
        const staticPath = path.join(DISTIMG, req._parsedUrl._raw)
        if (fs.existsSync(staticPath)) {
          res.sendFile(staticPath)
        } else {
          res.status(404).send('Sorry! file is not exist.')
        }
      })

      app.get(/\/images\/(.*)\.(ico|jpg|jpeg|png|gif)$/, function (req, res) {
        const staticPath = path.join(DISTIMG, req._parsedUrl._raw)
        if (fs.existsSync(staticPath)) {
          res.sendFile(staticPath)
        } else {
          res.status(404).send('Sorry! file is not exist.')
        }
      })

      app.get('/', function (req, res) {
        res.render('index', {
          title: 'aotoo-hub 多项目全栈脚手架'
        })
      })

      app.get('/*.html', function (req, res) {
        const urlPath = req.url.substr(1, (req.url.indexOf('.html')-1))
        const filePath = path.join(DISTHTML, req.url)
        if (fs.existsSync(filePath)) {
          res.render(urlPath, {
            title: 'aotoo-hub 多项目全栈脚手架'
          })
        } else {
          res.send('404！找不到页面')
        }
      })
    },
  }).listen((port || 8300), 'localhost', function (err, result) {
    if (err) { console.log(err) }
    const destPort = chalk.green.bold(`【${port}】`)
    console.log(`
============================
+ webpack-dev-server    +
+ 服务名: ${name}       +
+ 端口: ${destPort}      +
+===========================
    `);
    // console.log('========== service start ==========');
    // log(`${name}的node服务端口: ` + chalk.green.bold(`【${PORT}】`))
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


// 启动webpack-dev-server服务
module.exports = function* (compilerConfig, asset) {
  const { TYPE, contentBase, host, port, SRC, DIST, isDev, argv } = asset
  const DISTHTML = path.join(DIST, 'html')
  const DISTCSS = path.join(DIST, 'css')
  const DISTJS = path.join(DIST, 'js')
  const DISTIMG = SRC
  const isXcx = (TYPE == 'mp' || TYPE == 'ali')
  if (isDev) {
    if (!isXcx) {
      compilerConfig.plugins.push(browserSync.openBrowser(asset))
    } else {
      compilerConfig.plugins.push(new WriteAssetsWebpackPlugin({
        force: true,
        extension: ['js', 'wxml', 'wxs', 'wxss', 'json', 'map']
      }))
    }
  }
  const compiler = webpack(compilerConfig)
  compiler.hooks.done.tap('start-node-server', stats => {
    if (!isXcx) {
      co(function* () {
        yield fillupMapfile(asset)
      })
    }
  })

  if (!argv.start) {
    if (isDev) {
      if (argv.onlybuild) {
        compiler.run((err, state)=>{
          if (err) { console.log(err); }
        })
      } else {
        yield wpDevServer(compiler, asset)
      }
    } else {
      yield wpProductionDone(compiler, asset)
    }
  }

}
