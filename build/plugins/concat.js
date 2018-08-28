
var fs = require('fs');
var path = require('path');
var md5 = require('blueimp-md5');
var _ = require('lodash')
const { ConcatSource } = require("webpack-sources");

module.exports = class wpConcatFile{
  constructor(options){
    this.options = options

    const combineFilename = this.options.targetFile // path.join(__dirname, '../../dist/dev/js/precommon.js')
    if (fs.existsSync(combineFilename)) {
      this.combineFile = fs.readFileSync(combineFilename, 'utf-8')
    }
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('wpConcatFile', (compilation, params) => {
      compilation.hooks.optimizeChunkAssets.tapAsync('wpConcatFile', (chunks, callback) => {
       
        // let $common, $utils
        // chunks.forEach(chunk => {
        //   if (chunk.id == 'common') $common = true
        //   if (chunk.id == 'utils') $utils = true
        // })
        // if ($common && $utils) {
        //   compilation.assets['common'] = new ConcatSource(
        //     compilation.assets['common'], 
        //     '\n',
        //     "\/**wpConcatFile**\/",
        //     '\n',
        //     compilation.assets['utils'],
        //   )
        // }

        if (this.combineFile) {
          chunks.forEach(chunk => {
            chunk.files.forEach(file => {
              // chunk.id  chunk.name
              if (chunk.id == 'common') {
                compilation.assets[file] = new ConcatSource(
                  this.combineFile,
                  '\n',
                  "\/**wpConcatFile**\/",
                  '\n',
                  compilation.assets[file]
                );
              }
            })
          })
        }
        callback()
      })
    })
  }
}