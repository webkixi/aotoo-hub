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
          },
        },
        {
          type: 'idcard', placeholder: '身份证输入键盘',
          title: '标题',
          eye: {
            class: 'icon-3 mr-10-r size16 color-primary'
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
