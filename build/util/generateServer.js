const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const mkdirp = require('mkdirp')
const excludes = ['common', 'precommon', 'vendor', 'vendors']

function accessStat(fobj, dobj, file) {
  const re = /[\/\\](common|precommon|vendor|vendors|_|\.)\/?/g
  if (re.test(file)) return false
  return true
}

module.exports = function* (asset) {
  const {SRC, isXcx} = asset
  const jsPath = path.join(SRC, 'js')
  const serverPath = path.join(SRC, 'server')
  const serverIndex = path.join(serverPath, 'index.js')
  const serverIndexLib = path.join(serverPath, 'lib.js')

  const controlPath = path.join(serverPath, 'pages')
  const controlIndex = path.join(controlPath, 'index.js')

  const content_serverIndexlib = path.join(__dirname, '../lib/server/indexlib.js')
  const content_serverIndex = path.join(__dirname, '../lib/server/index.js')
  const content_controlIndex = path.join(__dirname, '../lib/server/indexControl.js')

  if (!fs.pathExistsSync(serverPath)) {
    fs.mkdirpSync(controlPath)
    fs.copySync(content_serverIndex, serverIndex)
    fs.copySync(content_serverIndexlib, serverIndexLib)

    if (isXcx) {
      fs.copySync(content_controlIndex, controlIndex)
    } else {
      globby.sync([`${jsPath}/**/*.js`]).forEach(file => {
        const fileObj = path.parse(file)
        const dirObj = path.parse(fileObj.dir)
        if (accessStat(fileObj, dirObj, file)) {
          const servFile = file.replace(jsPath, controlPath)
          fs.copySync(content_controlIndex, servFile)
        }
      })
    }
  } else {
    globby.sync([`${jsPath}/**/*.js`]).forEach(file => {
      const fileObj = path.parse(file)
      const dirObj = path.parse(fileObj.dir)
      if (accessStat(fileObj, dirObj, file)) {
        const servFile = file.replace(jsPath, controlPath)
        if (!fs.existsSync(servFile)) {
          fs.copySync(content_controlIndex, servFile)
        }
      }
    })
  }
}