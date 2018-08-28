const path = require('path')
module.exports = function (atc, asset) {
  const localPath = atc.localPath
  const {SRC, DIST} = asset
  return {
    root: SRC,
    css: path.join(SRC, 'css'),
    component: path.join(SRC, 'component'),
    sync: path.join(SRC, 'sync'),
    ssr: path.join(SRC, 'ssr')
  }
}
