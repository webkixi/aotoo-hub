//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: 'RADIO表单元素',
      itemClass: 'card-bg',
      input: [
        {
          name: 'test_radio',
          type: 'radio',
          title: '请选择',
          value: '3',
          values: ['1','2','3','4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
        },
        {
          name: 'test_radio1',
          type: 'radio',
          title: '请选择',
          value: '2',
          values: ['1', '2', '3', '4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
          error: '出错信息',
          desc: '红字是出错提示，这里是提示信息'
        },
      ]
    },
    {
      title: '动态表单',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_text',
          type: 'text',
          title: '标题',
          placeholder: '响应单选框选中的内容',
        },
        {
          name: 'test_radio1',
          type: 'radio',
          title: '请选择',
          value: '1',
          values: ['1', '2', '3', '4'],
          titles: ['篮球', '足球', '羽毛球', '乒乓球'],
          desc: '点击选择触发响应事件',
          bindchange: 'bbb'
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
          id: 'btn_prt_value',
          type: 'button',
          value: '打印值',
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
  bbb: function (e, param, ctx) {
    if (param){
      const inputData = param.inputData
      const iValue = ['篮球', '足球', '羽毛球', '乒乓球'][inputData.value - 1]
      console.log(iValue)
      switch (iValue) {
        case iValue:
          ctx.value('test_text', {value: '您选中了'+iValue})
          break;
      }
    }
  },
  setError: function (e, param, ctx) {
    console.log('---------')
    const tc1 = ctx.value('test_radio1')
    console.log(tc1.value)
    if (tc1 && tc1.value == "3" ) {
      ctx.removeWarn('test_radio1')
      ctx.addDesc('test_radio1', '您选择了正确答案，试试选择其他答案')
    } else {
      ctx.removeDesc('test_radio1')
      ctx.addWarn('test_radio1', '请选择正确的选项')
    }
  },
  rmvError: function (e, param, ctx) {
    ctx.removeDesc('test_radio1')
    ctx.removeWarn('test_radio1')
  },
  prtValue: function (e, param, ctx) {
    console.log(ctx.value('test_radio1').value);
  }
})
