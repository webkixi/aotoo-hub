/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

import index from 'js/index'
module.exports = function (oridata) {
  return {
    get: async function name(ctx) {
      oridata.pageTitle = 'aotoo-hub 多项目全栈脚手架'
      oridata.root = await index
      oridata.env = ''
      oridata.attachJs = '123'
      return oridata
    }, 
    post: function name(ctx) {
      return oridata
    }
  }
}