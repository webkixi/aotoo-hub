const path = require('path')
module.exports = function (atc, asset) {
  const localPath = atc.localPath
  const {SRC, DIST} = asset
  return {
    root: SRC,
    css: path.join(SRC, 'css'),
    component: path.join(SRC, 'component'), 
    components: path.join(SRC, 'js/components'),
    common: path.join(SRC, 'common'),
    sync: path.join(SRC, 'sync'),
    ssr: path.join(SRC, 'ssr'),
    vue: 'vue/dist/vue.js'
  }
}
