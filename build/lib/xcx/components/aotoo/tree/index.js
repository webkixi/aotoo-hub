/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 * 
 *
 const defaultListOptions = {
   data: [
     // String / Json 
   ],
   listClass: '',
   listStyle: '',
   itemClass: '',
   itemStyle: '',
   itemMethod: {},
 }
 */
 
const app = getApp()
const Core = require('../core')
const lib = Core.lib
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  behaviors: [Core.treeBehavior(app, 'tree')],
});