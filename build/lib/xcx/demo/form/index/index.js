//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const listData = Pager.list({
  data: [
    { title: [
        {title: 'input', class: 'item' },
        {title: '文本类表单', class: 'item icon-arrows-r color-999', aim: 'form-input'},
    ]},
    { title: [
        {title: 'number', class: 'item' },
        {title: '数字类表单', class: 'item icon-arrows-r color-999', aim: 'form-number'},
    ]},
    { title: [
        {title: 'icon', class: 'item' },
        {title: '表单头部使用icon', class: 'item icon-arrows-r color-999', aim: 'form-icon'},
    ]},
    { title: [
        {title: 'switch', class: 'item' },
        {title: 'switch', class: 'item icon-arrows-r color-999', aim: 'form-switch'},
    ]},
    { title: [
        {title: 'union', class: 'item' },
        {title: '联动表单', class: 'item icon-arrows-r color-999', aim: 'form-union'},
    ]},
    { title: [
        {title: 'checkbox', class: 'item' },
        {title: '多选框选择', class: 'item icon-arrows-r color-999', aim: 'form-checkbox'},
    ]},
    { title: [
        {title: 'radio', class: 'item' },
        {title: '单选框', class: 'item icon-arrows-r color-999', aim: 'form-radio'},
    ]},
    { title: [
        {title: 'slider', class: 'item' },
        {title: '滑动选取器', class: 'item icon-arrows-r color-999', aim: 'form-slider'},
    ]},
    { title: [
        {title: 'single-picker', class: 'item' },
        {title: '单选择器', class: 'item icon-arrows-r color-999', aim: 'form-single-picker'},
    ]},
    { title: [
        {title: 'multipy-picker', class: 'item' },
        {title: '多选择器', class: 'item icon-arrows-r color-999', aim: 'form-multipy-picker'},
    ]},
    { title: [
        {title: 'dropdown', class: 'item' },
        {title: '下拉菜单', class: 'item icon-arrows-r color-999', aim: 'form-dropdown'},
    ]},
  ],
  itemClass: 'li item-normal',
  listClass: 'ul'
})

Pager({
  data: { motto: listData },
  aim: function (e, param, inst) {
    const target = e.currentTarget
    const currentDset = target.dataset
    const theAim = currentDset.aim
    if (theAim) {
      switch (theAim) {
        case 'form-input':
          wx.navigateTo({ url: '../input/index' })
          break;

        case 'form-number':
          wx.navigateTo({ url: '../number/index' })
          break;

        case 'form-icon':
          wx.navigateTo({ url: '../icon/index' })
          break;

        case 'form-switch':
          wx.navigateTo({ url: '../switch/index' })
          break;

        case 'form-union':
          wx.navigateTo({ url: '../union/index' })
          break;

        case 'form-checkbox':
          wx.navigateTo({ url: '../checkbox/index' })
          break;

        case 'form-radio':
          wx.navigateTo({ url: '../radio/index' })
          break;

        case 'form-slider':
          wx.navigateTo({ url: '../slider/index' })
          break;

        case 'form-single-picker':
          wx.navigateTo({ url: '../singlepicker/index' })
          break;

        case 'form-multipy-picker':
          wx.navigateTo({ url: '../multipypicker/index' })
          break;

        case 'form-dropdown':
          wx.navigateTo({ url: '../dropdown/index' })
          break;
      
        default:
          break;
      }
    }
  }
})
