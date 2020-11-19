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

let types = {
  html: ['html'],
  styl: ['styl', 'sass', 'scss', 'less', 'css'],
  style: ['styl', 'sass', 'scss', 'less', 'css'],
  js: ['js', 'jsx', 'ts', 'tsx']
}

module.exports = function (dir, opts, asset) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir)
  if (!stat.isDirectory()) return
  let ext = opts.type || 'js'  // 扩展名

  // let _partten = /[\/|\\][_](\w)+/;   // 兼容windows?
  let _partten = /[\/|\\][_\.]+(\w)+/;   // 兼容windows?
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
    // const accessTarget = (()=>{
    //   let bol = _partten.test(item)
    //   if (!bol) {
    //     let re = /[\/]3ds[\/]?/g
    //     if (re.test(item)) {
    //       bol = true
    //     }
    //   }
    //   return bol
    // })()
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
  
        // // if (opts.type && opts.type == 'html') {
        // //   _key = key ? path.join(key, path.sep, itemObj.name) : itemObj.name
        // //   newEntry[_key] = newEntry[_key] ? newEntry[_key].push(item) : [item]
        // // } else {
        //   const keyObj = path.parse(key)
        //   if (keyObj.name == itemObj.name) {
        //     syncNameFile.push(key)
        //     newEntry[key] = [item]
        //   } else {
        //     if (syncNameFile.indexOf(key)==-1) {
        //       newEntry[key] ? newEntry[key].push(item) : newEntry[key] = [item]
        //     }
        //   }
        // // }

        if (types[ext].indexOf(ext) > -1 && ('.'+ext) === itemObj.ext ) {
          const keyObj = path.parse(key)
          if (keyObj.name == itemObj.name) {
            syncNameFile.push(key)
            newEntry[key] = [item]
          } else {
            if (syncNameFile.indexOf(key)==-1) {
              newEntry[key] ? newEntry[key].push(item) : newEntry[key] = [item]
            }
          }
        }
      }
    }
  })

  return clearObjectEmptyKey(newEntry)
};