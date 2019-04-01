//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const formData = {
  data: [
    {
      title: '类目1',
      itemClass: 'oooo',
      input: [
        {type: 'text', id: 'username', title: '用户名', placeholder: '请输入用户名', bindinput: 'abc'},
        {type: 'text', id: 'email', title: '邮  箱', error: '错误提示信息', placeholder: '接收信息的安全邮箱'},
        {type: 'text', id: 'mobile', title: '手机号', error: '手机错误提示信息', desc: '一段描述性的代码', placeholder: '请输入手机号码'},
        {
          type: 'text', title: '手机号', error: '手机错误提示信息', placeholder: '请输入手机号码',
          desc: {
            '@list': {
              data: [
                '描述信息',
                'aaa', 
                'bbb', 
                'ccc', 
                {title: '点我', tap: 'oktapme'}
              ],
              listClass: 'streamAims',
              itemClass: 'streamAims-item'
            }
          }
        }
      ]
    },
    {
      title: '类目2',
      itemClass: 'oooo',
      input: [
        {type: 'number', title: '整数型', placeholder: '数字输入键盘'},
        {type: 'idcard', title: '身份证', placeholder: '身份证输入键盘'},
        {type: 'digit', title: '纯数字', placeholder: '带小数点的数字键盘'},
        {type: 'password', title: '密码串', placeholder: '隐藏的密码串'},
      ]
    },
    {
      title: '类目3',
      input: [
        {
          type: 'number', placeholder: '数字输入键盘',
          title: {
            '@icon': {class: 'icon-menu-1 mr-10-r size16 color-227ce1'},
            itemStyle: 'text-align: center; margin-top: -5rpx'
          }
        },
        {
          type: 'idcard', placeholder: '身份证输入键盘',
          title: {
            '@icon': { class: 'icon-3 mr-10-r size16 color-227ce1' },
            itemStyle: 'text-align: center; margin-top: -5rpx'
          }
        },
      ]
    },
    {
      title: '类目4',
      input: [
        {
          name: 'test_checkbox',
          type: 'checkbox',
          title: '哈哈',
          value: ['1','3'],
          values: ['1','2','3','4'],
          titles: ['这', '是', '什', '么'],
          itemClass: 'mt-8-r'
          // error: '你是错的',
          // desc: '哈哈 我是'
        },
        {
          name: 'test_radio',
          type: 'radio',
          title: '呵呵',
          value: '3',
          values: ['1','2','3','4'],
          titles: ['这', '是', '什', '么'],
          itemClass: 'mt-8-r'
        },
      ]
    },
    {
      title: '类目5',
      input: [
        {
          id: 'test_switch',
          type: 'switch',
          title: '哈哈',
          value: true
        },
        {
          id: 'test_slider',
          type: 'slider',
          title: '哈哈',
          value: 50,
        },
        {
          id: 'test_picker',
          type: 'picker',
          title: '选择器',
          values: [
            [
              '好', 
              '嗨', 
              '哟'
            ]
          ],
          itemClass: 'mt-8-r'
        },
        {
          id: 'test_pickers',
          type: 'picker',
          title: '多选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          bindchange: 'abc',
          itemClass: 'mt-8-r'
        },
      ]
    },
    {
      title: '类目6',
      input: [
        {
          type: 'dropdown',
          title: '省份',
          placeholder: '请选择省份',
          titles: {
            data: [
              {title: '广东', value: '1001'},
              {title: '湖南', value: '1002'},
              {title: '山东', value: '1003'},
              {title: '广西', value: '1004'},
              {title: '山西', value: '1005'},
            ]
          }
        }
      ]
    }
  ]
}


Pager({
  data: {
    motto: formData
  }
})
