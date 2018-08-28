const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const mkdirp = require('mkdirp')
const excludes = ['common', 'precommon', 'vendor', 'vendors']

function accessStat(fobj, dobj) {
  if (excludes.indexOf(fobj.name) == -1 && excludes.indexOf(dobj.name) == -1) {
    if (dobj.name.indexOf('_') !==0 && fobj.name.indexOf('_') !== 0) {
      return true
    }
  }
}

module.exports = function* (asset) {
  const {SRC} = asset
  const jsPath = path.join(SRC, 'js')
  const serverPath = path.join(SRC, 'server')
  const serverIndex = path.join(serverPath, 'index.js')

  const controlPath = path.join(serverPath, 'pages')
  const controlIndex = path.join(controlPath, 'index.js')

  const content_serverIndex = path.join(__dirname, '../lib/server/index.js')
  const content_controlIndex = path.join(__dirname, '../lib/server/indexControl.js')

  if (!fs.pathExistsSync(serverPath)) {
    fs.mkdirpSync(controlPath)
    fs.copySync(content_serverIndex, serverIndex)

    
    globby.sync([`${jsPath}/**/*`]).forEach(file => {
      const fileObj = path.parse(file)
      const dirObj = path.parse(fileObj.dir)
      if (accessStat(fileObj, dirObj) ){
        const servFile = file.replace(jsPath, controlPath)
        fs.copySync(content_controlIndex, servFile)
      }

    });
  }
}