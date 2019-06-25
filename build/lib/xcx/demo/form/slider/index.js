//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: '滑动块',
      itemClass: 'card-bg mb-40-r',
      input: {
        id: 'test_slider',
        type: 'slider',
        value: 50,
      }
    },

    {
      title: '动态表单',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_text',
          type: 'text',
          title: '标题',
          placeholder: '单选框选择以动态设置该文本框内容',
        },
        {
          id: 'test_slider1',
          type: 'slider',
          value: 30,
          bindchange: 'sliderChange'
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
  sliderChange: function (e, param, inst) {
    const {inputData, profile} = param
    inst.value('test_text', {
      value: inputData.value
    })
  },
  prtValue: function (e, param, inst) {
    const val = inst.value('test_slider1')
    console.log('slider状态值为：', val.value)
  }
})
