/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = null //getApp()
const Core = require('../aotoo/core')
const lib = Core.lib
const uCharts = require('./ucharts/u-charts.js');

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    dataSource: {
      type: Object,
    },
  },
  data: {
    idset: lib.suid('chart_')
  },
  behaviors: [Core.baseBehavior(app, 'charts')],
  lifetimes: {
    created: function() {
      this.$$is = 'chart'
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let dataSource = this.properties.dataSource
      if (lib.isObject(dataSource)) {
        dataSource.$this = this
        dataSource.pixelRatio = dataSource.pixelRatio || 1
        dataSource.width = dataSource.width || 375
        dataSource.height = dataSource.height || (500/700)*375
        this.chart = new uCharts(dataSource)
      }
    }
  }
})