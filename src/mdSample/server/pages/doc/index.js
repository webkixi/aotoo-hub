/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */
import index from 'js/doc'
module.exports = function (oridata) {
  return {
    get: async function name(ctx) {
      oridata.title = 'aotoo-hub 多项目全栈脚手架'
      oridata.root = await index
      return oridata
    }, 
    post: function name(ctx) {
      return oridata
    }
  }
}