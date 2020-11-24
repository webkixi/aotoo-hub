
const fs = require('fs');
const fse = require('fs-extra')
const path = require('path');
const md5 = require('md5');
const mkdirp = require('mkdirp')
const _ = require('lodash')
const { ConcatSource } = require("webpack-sources");
const globby = require('globby')

/**
 * opts
 * outputPath    输出根目录
 * exclude = RegExp || ['.html', '.js', '.css']
 * extractTo = {}    {html: ['.html', '.css']}
 * mapfile = {}     [js, css, image, html]
 */
module.exports = class memeryTofs {
  constructor(opts){
    const dfts = {
      delimiter: '__'
    }
    this.opts = _.merge({}, dfts, opts)
  }
  apply(compiler){
    compiler.hooks.done.tap('memeryTofs', stats => {
      try {
        const opts = this.opts
        const assets = stats.compilation.assets
        const compilation = stats.compilation
        const outputPath = opts.outputPath || compilation.compiler.outputPath
        const _mapfile = opts.mapfile
        const mapfile = _mapfile || {}
        let mapAsset = (function() {
          let tmp = {}; _.map(mapfile, function(val, key) { tmp[key] = [] });
          return tmp
        })()
        
        _.map(assets, (file, filename) => {
          // let existsAt  = file.existsAt
          let existsAt  = path.join(outputPath, filename)
          let directory = path.dirname(existsAt)
          let extname   = path.extname(existsAt)
          let profile = path.parse(existsAt)
          let newProfile
  
          let willWrite = true
          if (opts.exclude) {
            if (opts.exclude instanceof RegExp) {
              willWrite = opts.exclude.test(existsAt)
            }
            
            if (Array.isArray(opts.exclude)) {
              willWrite = opts.exclude.indexOf(extname) > -1 ? false : true
            }
          }
  
          if (willWrite) {
            let targetDist
            if (_.isPlainObject(opts.extractTo)) {
              _.map(opts.extractTo, (checks, dist) => {
                checks = [].concat(checks)
                if (checks.indexOf(extname) > -1){
                  targetDist = dist
                }
              })
            }
  
            if (targetDist) {
              directory = path.join(outputPath, targetDist)
              existsAt = path.join(directory, profile.base)
            }
  
            if (_mapfile) {
              newProfile = path.parse(existsAt)
              _.map(mapfile, (paramValue, section) => {
                let relativePath = newProfile.dir.replace(outputPath+'/', '')
                let relativeKeyname
                let relativeFilename
                if (relativePath.indexOf(section)===0) {
                  relativePath = relativePath.replace(section+'/', '').replace(section, '')
                  relativeKeyname = path.join(relativePath, newProfile.name).replace(/\-/g, path.sep)
                  relativeFilename = path.join(relativePath, newProfile.base)
  
                  if (_.isArray(paramValue)) {
                    if (paramValue.indexOf(extname) > -1) {
                      mapAsset[section] = (mapAsset[section]||[]).concat({
                        [relativeKeyname]: relativeFilename
                      })
                    }
                  }
      
                  if (_.isRegExp(paramValue)) {
                    if (paramValue.test(extname)) {
                      mapAsset[section] = (mapAsset[section] || []).concat({
                        [relativeKeyname]: relativeFilename
                      })
                    }
                  }
                }
              })
            }

            fse.ensureDirSync(directory)
            fse.writeFileSync(existsAt, file.source())
            // mkdirp(directory, function (err) {
            //   if (err) console.log(err);
            //   fs.writeFile(existsAt, file.source(), function (err) {
            //     if (err) console.log(err);
            //   })
            // })
          }
        })
  
        if (_mapfile) {
          _.map(mapAsset, (assets, sectionName)=>{
            let assetsJson = {}
            _.map(assets, (obj, index) => {
              const entries = Object.entries(obj)
              let trunkName = entries[0][0]
              if (trunkName.indexOf(opts.delimiter) > -1) {
                trunkName = trunkName.split(opts.delimiter)[0]
              }
              assetsJson[trunkName] = entries[0][1]
            })
            mapAsset[sectionName] = assetsJson
          })
  
  
          // 补全common.css或者common__[hash:10].css
          // 补全vendors.js或者vendors__[hash:10].js
          const commonCssDir = path.join(outputPath, 'css')
          const commonJsDir  = path.join(outputPath, 'js')

          // 将common.css的地址写入mapfile.json
          if (fs.existsSync(commonCssDir)) {
            fs.readdirSync(commonCssDir).forEach(item=>{
              const itemObj = path.parse(item)
              if (itemObj.ext == '.css' && itemObj.name.indexOf('common')==0) {
                mapAsset['css']['common'] = itemObj.base
              }
            })
          }

          // 将vendors.js的地址写入mapfile.json
          if (fs.existsSync(commonJsDir)) {
            fs.readdirSync(commonJsDir).forEach(item => {
              const itemObj = path.parse(item)
              if (itemObj.ext == '.js' && itemObj.name.indexOf('vendors') == 0) {
                mapAsset['js']['vendors'] = itemObj.base
              }
              if (itemObj.ext == '.js' && itemObj.name.indexOf('common') == 0) {
                mapAsset['js']['common'] = itemObj.base
              }
            })
          }

          const path_3ds_path = path.join(outputPath, 'js/3ds')
          if (fse.pathExistsSync(path_3ds_path)) {
            let mapfileJson = mapAsset
            globby.sync(path_3ds_path, {onlyFiles: false}).forEach(function(item){
              let fileObj = path.parse(item)
              let fileStat = fs.statSync(item)
              let extname = fileObj.ext
              let re = /^\/(.*)/
              let relativePath = fileObj.dir.replace(path_3ds_path, '').replace(re, '$1')
              let relativeName = path.join(relativePath, fileObj.name).replace(re, '$1')
              let relativeFile = path.join(relativePath, fileObj.base).replace(re, '$1')
              if (fileStat.isDirectory()) {
                if (fileObj.dir == path_3ds_path) {
                  /** do nothing */
                }
              } else {
                relativeName = path.join('3ds', relativeName)
                if (fileObj.dir == path_3ds_path) {
                  if (extname.indexOf('.js')>-1 || extname.indexOf('.map')>-1) {
                    if (extname.indexOf('.js')>-1) {
                      mapfileJson.js[relativeName] = relativeFile
                    }
                  }
                  if (extname.indexOf('.css')>-1) {
                    mapfileJson.css[relativeName] = relativeFile
                  }
                } else {
                  if (extname.indexOf('.js')>-1 || extname.indexOf('.css')>-1) {
                    if (extname.indexOf('.js')>-1) {
                      mapfileJson.js[relativeName] = relativeFile
                    } else {
                      mapfileJson.css[relativeName] = relativeFile
                    }
                  }
                }
              }
            })
          }

          // 设置资源狗目录
          // mapAsset.root = outputPath
          fs.writeFileSync(path.join(outputPath, 'mapfile.json'), JSON.stringify(mapAsset), {encoding: 'utf8'})
        }
      } catch (error) {
        console.log(error);
      }
    })
  }
}
