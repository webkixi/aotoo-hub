var os = require('os')
var fs = require('fs')
var del = require('del')
var chalk = require('chalk')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let myport = 2900
function openBrowser(asset) {
  myport += 100
  const uiPort = myport+1
  const myBrowserPlugin =  new BrowserSyncPlugin({
    proxy: {
      target: 'http://localhost:' + (asset.PORT || 8300) + '/',
      ws: true
    },
    ui: {
      port: uiPort
    },
    logFileChanges: false,
    notify: false,
    host: 'localhost',
    port: myport
    // injectChanges: true,
  }, {
    reload: false
  })
  return myBrowserPlugin
}

function browserOpen(options) {
  const {name, PORT} = options
  myport += 100
  const uiPort = myport
  const bs = require('browser-sync').create(name)
  setTimeout(() => {
    bs.init({
      proxy: {
        target: 'http://localhost:' + (PORT || 8300) + '/',
        ws: false
      },
      ui: {
        port: uiPort
      },
      logFileChanges: false,
      notify: false,
      host: 'localhost',
      port: myport,
      // injectChanges: true,
    })
  }, 3000);
}

// module.exports = browserSync
module.exports = {
  openBrowser,
  browserOpen
}
