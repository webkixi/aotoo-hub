const path = require('path')
const fs = require('fs-extra')
const mkdirp = require('mkdirp')

module.exports = function generateScenesDir(target, scenesName) {
  const content_src = path.join(__dirname, '../lib/src/defaultscene.js')
  const content_target = path.join(target, scenesName+'.js')
  if (!fs.pathExistsSync(target)) {
    fs.mkdirpSync(target)
  }
  fs.copySync(content_src, content_target)
}