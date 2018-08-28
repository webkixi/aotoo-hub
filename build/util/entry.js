var fs = require('fs')
var path = require('path')
var glob = require('globby')

function getKey(item, obj, dir, opts){
  const _root = path.parse(dir)
  const root = path.sep + _root.name
  // if (opts.type == 'html') dir = dir.replace(root, '')

  if (!obj.dir) {
    return '~root~'+item.replace(obj.ext, '')
  } else {
    const xxx = dir.replace(/\./g, '\\.').replace(/[\/|\\]/g, '\\'+path.sep)  // windows兼容?
    const partten = eval('/'+xxx+'[\\/]?/ig')
    return obj.dir.replace(partten, '') 
  }
}

function clearObjectEmptyKey(obj) {
  let entry = {}
  Object.entries(obj).forEach( item => {
    if (item[1].length) {
      entry[item[0]] = item[1]
    }
  })
  return entry
}

module.exports = function(dir, opts) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) return

  let _partten = /[\/|\\][_](\w)+/;   // 兼容windows?
  let target = [`${dir}/**/*`];
  let ignoreTarget = []
  if (opts.exclude) {
    const excludes = [].concat(opts.exclude)
    ignoreTarget = excludes.map(item => {
      if (path.extname(item)) {
        return `!${dir}/${item}`
      } else {
        return `!${dir}/${item}/**`
      }
    })
    target = target.concat(ignoreTarget)
  }


  var newEntry = {}
  var syncNameFile = []
  glob.sync(target, {onlyFiles: false}).forEach(function(item){
    const itemObj = path.parse(item)
    const itemStat = fs.statSync(item)
    const accessTarget = _partten.test(item)
    if (!accessTarget) {
      if (itemStat.isDirectory()) {
        let itemKey = item.replace(dir, '')
        if (itemKey.charAt(0) == path.sep) {
          itemKey = itemKey.substring(1)
        }
        newEntry[itemKey] = []
      } else {
        let _key
        let key = getKey(item, itemObj, dir, opts)
        key = key ? key : itemObj.name
  
        // if (opts.type && opts.type == 'html') {
        //   _key = key ? path.join(key, path.sep, itemObj.name) : itemObj.name
        //   newEntry[_key] = newEntry[_key] ? newEntry[_key].push(item) : [item]
        // } else {
          const keyObj = path.parse(key)
          if (keyObj.name == itemObj.name) {
            syncNameFile.push(key)
            newEntry[key] = [item]
          } else {
            if (syncNameFile.indexOf(key)==-1) {
              newEntry[key] ? newEntry[key].push(item) : newEntry[key] = [item]
            }
          }
        // }
      }
    }
  })

  return clearObjectEmptyKey(newEntry)
};