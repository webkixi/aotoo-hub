const path = require('path')
module.exports = function (atc, asset) {
  const localPath = atc.localPath
  const {SRC, DIST} = asset
  return {
    root: SRC,
    css: path.join(SRC, 'css'),
    // component: path.join(SRC, 'component'), 
    components: path.join(SRC, 'components'),
    docs: path.join(SRC, 'docs'),
    common: path.join(SRC, 'common'),
    
    vue: 'vue/dist/vue.js',
    '@': path.join(SRC, 'js'), // vue项目中需要用到
    
    $vendors: path.join(SRC, 'mdSample/js/vendors'),
    $ajax: path.join(SRC, 'mdSample/js/vendors/ajax'),
    $pager: path.join(SRC, 'mdSample/js/vendors/page'),
  }
}
