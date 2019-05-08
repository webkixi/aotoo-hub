//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: 'CHECKBOX表单元素',
      itemClass: 'card-bg',
      input: [
        {
          name: 'test_checkbox1',
          type: 'checkbox',
          title: '默认选项',
          value: ['1','3'],
          values: ['1','2','3','4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
        },
        {
          name: 'test_checkbox2',
          type: 'checkbox',
          title: '提示信息',
          values: ['1','2','3','4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
          error: '出错信息',
          desc: '红字是出错提示，这里是提示信息'
        }
      ]
    },
    {
      title: '动态表单',
      itemClass: 'card-bg',
      input: [
        {
          name: 'test_checkbox1',
          type: 'checkbox',
          title: '默认选项',
          value: ['1','3'],
          values: ['1','2','3','4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
        },
        {
          id: 'btn_error',
          type: 'button',
          value: '是否出错',
          tap: 'setError'
        },
        {
          id: 'btn_rmv_error',
          type: 'button',
          value: '清除信息',
          tap: 'rmvError'
        },
        {
          id: 'btn_prt_val',
          type: 'button',
          value: '打印value',
          tap: 'prtValue'
        },
      ]
    },
  ]
}

Pager({
  data: {
    motto: formData
  },
  setError: function (e, param, ctx) {
    const tc1 = ctx.value('test_checkbox1')
    if (tc1 && lib.isArray(tc1.value) && tc1.value.length == 2 && tc1.value.indexOf('1')>-1 && tc1.value.indexOf('3')>-1) {
      ctx.removeWarn('test_checkbox1')
      ctx.addDesc('test_checkbox1', '您选择了正确答案，试试选择其他答案')
    } else {
      ctx.removeDesc('test_checkbox1')
      ctx.addWarn('test_checkbox1', '请选择正确的选项')
    }
  },
  rmvError: function (e, param, ctx) {
    ctx.removeDesc('test_checkbox1')
    ctx.removeWarn('test_checkbox1')
  },
  prtValue: function(e, param, ctx) {
    console.log(ctx.value('test_checkbox1').value);
  }
})
