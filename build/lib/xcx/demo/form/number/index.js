//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  $$id: 'formInst',
  data: [
    {
      title: '类目3',
      itemClass: 'card-bg mb-40-r',
      input: [
        {type: 'number', title: '整数型', placeholder: '数字输入键盘'},
        {type: 'idcard', title: '身份证', placeholder: '身份证输入键盘'},
        {type: 'digit', title: '纯数字', placeholder: '带小数点的数字键盘'},
        {type: 'password', title: '密码串', placeholder: '隐藏的密码串'},
      ]
    },
    {
      title: '类目3',
      itemClass: 'card-bg',
      input: [
        {
          type: 'number', placeholder: '数字输入键盘',
          title: {
            '@icon': {class: 'icon-menu-1 mr-10-r size16 color-primary'},
            itemStyle: 'text-align: center; margin-top: -5rpx'
          }
        },
        {
          type: 'idcard', placeholder: '身份证输入键盘',
          title: {
            '@icon': { class: 'icon-3 mr-10-r size16 color-primary' },
            itemStyle: 'text-align: center; margin-top: -5rpx'
          }
        },
      ]
    }
  ]
}

Pager({
  data: {
    motto: formData
  },
})
