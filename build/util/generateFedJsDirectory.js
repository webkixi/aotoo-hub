const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')

module.exports = function (atConfig) {
  const apps = []
  const src = atConfig.src

  if (src && fs.existsSync(src)) {
    globby.sync([`${src}/*`], {onlyDirectories: true}).forEach(dir => {
      const dirObj = path.parse(dir)
      const jsPath = path.join(dir, 'js')
      const emptyContentIndexFile = path.join(__dirname, '../lib/src/empty.js')
      const jsPathEmptyIndex = path.join(jsPath, 'index.js')
      if (!fs.existsSync(jsPath)) {
        fs.mkdirpSync(jsPath)
        fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
      } else {
        const jss = globby.sync([`${jsPath}`])
        if (!jss.length) {
          fs.copyFileSync(emptyContentIndexFile, jsPathEmptyIndex)
        }
      }
      apps.push({
        name: dirObj.name,
        startup: true,
        src: dir,
        host: 'localhost',
        port: null
      })
    });
  }

  return apps
}