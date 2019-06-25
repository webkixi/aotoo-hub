//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: '单选择器',
      itemClass: 'card-bg mb-40-r',
      input: [
        {
          id: 'test_picker',
          type: 'picker',
          title: '选择器',
          values: [
            [
              {title: '选项一', id: '100'},
              {title: '选项二', id: '101', select: true},
              {title: '选项三', id: '102'},
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
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
          placeholder: '单选框选择以动态设置该文本框内容',
        },
        {
          id: 'test_picker1',
          type: 'picker',
          title: '选择器',
          values: [
            [
              {title: '选项一', id: '100'},
              {title: '选项二', id: '101'},
              {title: '选项三', id: '102', select: true},
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
          bindchange: 'pickerAction'
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
  pickerAction: function (e, param, inst) {
    const {inputData, profile} = param
    const index = inputData.value[0]
    const val = inputData.values[0][index].id
    const text = inputData.values[0][index].title
    inst.value('test_text', {
      value: "index为:" + index + "  值为:" + val + "  text为" + text
    })
    return inputData
  },
  prtValue: function (e, param, inst) {
    const val = inst.value('test_picker1')
    console.log('picker选项值为：', val.value)
  }
})
