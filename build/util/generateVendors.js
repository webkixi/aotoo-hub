const path = require('path')
const fse = require('fs-extra')
const mkdirp = require('mkdirp')

// 生成默认的vendors的目录
module.exports = function generateVendorsDftsFile(asset) {
  const { SRC, DIST } = asset
  const commonDir = path.join(SRC, 'js/vendors')
  const commonFile = path.join(SRC, 'js/vendors', 'index.js')
  const emptyContentIndexFile = path.join(__dirname, '../lib/src/vendorIndex.js')
  if (!fse.existsSync(commonFile)) {
    if (!fse.existsSync(commonDir)) {
      fse.mkdirpSync(commonDir)
      fse.copyFileSync(emptyContentIndexFile, commonFile)
    }
  }
}