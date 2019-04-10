//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: '类目3',
      input: [
        {
          id: 'test_switch1',
          type: 'switch',
          title: '切换按钮',
          bindchange: 'switchAction'
        },
        {
          id: 'test_switch2',
          type: 'switch',
          title: '切换按钮',
          value: true,
          bindchange: 'switchAction'
        },
        {
          id: 'test_switch3',
          type: 'switch',
          title: '切换按钮',
          bindchange: 'switchAction'
        },
      ]
    },

    {
      title: '动态表单',
      input: [
        {
          id: 'test_text',
          type: 'text',
          title: '标题',
          placeholder: '单选框选择以动态设置该文本框内容',
          itemClass: 'mt-8-r'
        },
        {
          id: 'test_switch4',
          type: 'switch',
          title: '设置内容',
          bindchange: 'switchAction'
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
  switchAction: function (e, param, inst) {
    const {inputData, profile} = param
    if (inputData.id == 'test_switch4') {
      if (inputData.value == true) {
        inst.value('test_text', {
          // show: false
          value: '动态设置内容'
        })
      } else {
        inst.value('test_text', {
          value: ''
        })
      }
    }
  },
  prtValue: function (e, param, inst) {
    const val = inst.value('test_switch4')
    console.log('switch状态值为：', val.value)
  }
})
