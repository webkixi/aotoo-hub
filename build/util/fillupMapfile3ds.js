const fse = require('fs-extra')
const globby = require('globby')
const path = require('path')

// fillupMapfile
module.exports = function* (asset) {
  const { name, contentBase, isDev, host, port, proxyPort, SRC, DIST, argv } = asset
  const path_mapfile = path.join(DIST, 'mapfile.json')

  const path_3ds_path = path.join(SRC, 'js/vendors/3ds')
  const path_3ds_out_js = path.join(DIST, 'js/t')
  const path_3ds_out_css = path.join(DIST, 'css/t')

  if (fse.pathExistsSync(path_mapfile)) {
    if (fse.pathExistsSync(path_3ds_path)) {
      let mapfileJson = require(`${path_mapfile}`)
      globby.sync(path_3ds_path).forEach(function(item){
        const fileObj = path.parse(item)
        const extname = fileObj.ext
        const re = /^\/(.*)/
        const relativePath = fileObj.dir.replace(path_3ds_path, '').replace(re, '$1')
        const relativeName = path.join('t', relativePath, fileObj.name).replace(re, '$1')
        const relativeFile = path.join('t', relativePath, fileObj.base).replace(re, '$1')

        if (extname.indexOf('.js')>-1 || extname.indexOf('.map')>-1) {
          const tJsFilePath = path.join(path_3ds_out_js, relativePath, fileObj.base)
          fse.copySync(item, tJsFilePath)
          if (extname.indexOf('.js')>-1) {
            mapfileJson.js[relativeName] = relativeFile
          }
        }
        
        if (extname.indexOf('.css')>-1) {
          const tCssFilePath = path.join(path_3ds_out_css, relativePath, fileObj.base)
          const oriCssFilePath = path.join(path_3ds_out_js, relativePath, fileObj.base)
          fse.copySync(item, tCssFilePath)
          fse.copySync(item, oriCssFilePath)
          mapfileJson.css[relativeName] = relativeFile
        }
      })
      fse.removeSync(path_mapfile)
      fse.outputJsonSync(path_mapfile, mapfileJson)
    }
  }
}