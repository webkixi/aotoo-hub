const path = require('path')
const globby = require('globby')
/**
 * common file 是否存在
 * precommon.js  包含框架库js文件
 * common.css    通用css文件
 */
module.exports = function commonFileExist(dist, isDev, rebuild) {
  const commonJsKey = ['precommon', 'vendors']
  const commonCssKey = 'common'

  const cssDist = path.join(dist, 'css')
  const jsDist = path.join(dist, 'js')

  let jsExist = false
  let cssExist = false

  globby.sync(jsDist).forEach(filename => {
    if (filename.indexOf(commonJsKey[0]) == 0 || filename.indexOf(commonJsKey[1]) == 0) {
      if (rebuild || !isDev) {
        del.sync([filename])
      } else {
        jsExist = true
      }
    }
  })

  globby.sync(cssDist).forEach(filename => {
    if (filename.indexOf(commonCssKey) == 0) {
      if (rebuild || !isDev) {
        del.sync([filename])
      } else {
        cssExist = true
      }
    }
  })

  if (isDev) {
    if (!rebuild) {
      return jsExist && cssExist
    }
  }
}