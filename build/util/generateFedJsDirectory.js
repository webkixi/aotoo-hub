const fs = require('fs-extra')
const _  = require('lodash')
const path = require('path')
const globby = require('globby')

const emptyContentIndexFile = path.join(__dirname, '../lib/src/empty.js')

module.exports = function (atConfig, argv) {
  let apps = []
  const customApps = atConfig.apps || []
  const src = atConfig.src
  const names = [].concat((argv.name||[]))

  if (src && fs.existsSync(src)) {
    globby.sync([`${src}/*`], {onlyDirectories: true}).forEach(dir => {
      const dirObj = path.parse(dir)
      const jsPath = path.join(dir, 'js')
      const jsPathEmptyIndex = path.join(jsPath, 'index.js')
      if (names.indexOf(dirObj.name) > -1) {
        if (!fs.existsSync(jsPath)) {
          fs.mkdirpSync(jsPath)
          fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
        } else {
          const jss = globby.sync([`${jsPath}`])
          if (!jss.length) {
            fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
          }
        }
        apps.push({
          name: dirObj.name,
          startup: true,
          src: dir,
          host: 'localhost',
          port: null
        })
      } else {
        apps.push({
          name: dirObj.name,
          startup: false,
          src: dir,
          host: 'localhost',
          port: null
        })
      }
    })


    customApps.forEach(function(capp) {
      const index = _.findIndex(apps, {name: capp.name})
      if (index || index == 0) {
        apps[index] = _.merge({}, apps[index], capp)
      }
    })
    

    apps.forEach(function(app) {
      if (names.length) {
        if (app.name && names.indexOf(app.name) > -1) {
          app.startup = true
        } else {
          app.startup = false
        }
      }
      
      if (app.startup) {
        const dir = app.src
        const dirObj = path.parse(dir)
        const jsPath = path.join(dir, 'js')
        const jsPathEmptyIndex = path.join(jsPath, 'index.js')
  
        if (!fs.existsSync(jsPath)) {
          fs.mkdirpSync(jsPath)
        }

        const jss = globby.sync([`${jsPath}`])
        if (!jss.length) {
          fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
        }
      }
    })
  }

  return apps
}