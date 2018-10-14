const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')

module.exports = function (asset) {
  const {TYPE, isDev, SRC, DIST, options, PORT, PROXYPORT } = asset
  const jsSrcPath = path.join(SRC, 'js')
  const indexSrcPath = path.join(jsSrcPath, 'index.js')
  const utilSrcPath = path.join(jsSrcPath, 'utils/util.js')

  const xcxTemplateFiles = path.join(__dirname, '../lib/xcx')
  
  // 该目录为初始化的小程序目录
  // 清空目录并拉取模板文件
  if (!fs.existsSync(utilSrcPath)) {
    fs.emptyDirSync(jsSrcPath)
    fs.copySync(xcxTemplateFiles, jsSrcPath)
  }

  

  // const apps = []
  // const src = atConfig.src

  // if (src && fs.existsSync(src)) {
  //   globby.sync([`${src}/*`], {onlyDirectories: true}).forEach(dir => {
  //     const dirObj = path.parse(dir)
  //     const jsPath = path.join(dir, 'js')
  //     const emptyContentIndexFile = path.join(__dirname, '../lib/src/empty.js')
  //     const jsPathEmptyIndex = path.join(jsPath, 'index.js')
  //     if (!fs.existsSync(jsPath)) {
  //       fs.mkdirpSync(jsPath)
  //       fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
  //     } else {
  //       const jss = globby.sync([`${jsPath}`])
  //       if (!jss.length) {
  //         fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
  //       }
  //     }
  //     apps.push({
  //       name: dirObj.name,
  //       startup: true,
  //       src: dir,
  //       host: 'localhost',
  //       port: null
  //     })
  //   });
  // }

  return asset
}