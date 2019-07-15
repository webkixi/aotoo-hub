/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib
const WxParse = require('./wxParse/wxParse.js');

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    dataSource: {
      type: Object|String,
    },
    textType: {
      type: String,
    }
  },
  data: {
    article: {}
  },
  behaviors: [Core.baseBehavior(app, 'markit')],
  lifetimes: {
    created: function() {
      this.$$is = 'markitem'
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let that = this
      let dataSource = this.properties.dataSource
      let textType = this.properties.textType

      if (lib.isString(dataSource)) {
        dataSource = {
          content: dataSource, 
          type: (textType||'html')
        }
      }

      if (lib.isObject(dataSource)) {
        WxParse.wxParse('article', (dataSource.type||'html'), dataSource.content, that);
      }
    },
    
    ready: function() {

    }
  },
  methods: {
    md(param){
      const that = this
      if (lib.isString(param)) {
        WxParse.wxParse('article', 'md', param, that);
      }
    },

    html(param){
      const that = this
      if (lib.isString(param)) {
        WxParse.wxParse('article', 'html', param, that);
      }
    }
  }
})