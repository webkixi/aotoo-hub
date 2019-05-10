//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const data = [
  {
    title: '大按钮',
    id: 'larger',
    list: [
      { title: '按钮', type: 'primary', size: 'larger', parentId: 'larger' },
      { title: '禁用', type: 'primary', size: 'larger', disabled: true, parentId: 'larger' },
      { title: '按钮', type: 'default', size: 'larger', parentId: 'larger' },
      { title: '按钮', type: 'default', size: 'larger', disabled: true, parentId: 'larger' },
      { title: '按钮', type: 'fff-primary', size: 'larger', parentId: 'larger' },
      { title: '按钮', type: 'fff-primary', size: 'larger', disabled: true, parentId: 'larger' },
      { title: '增加类型', type: 'icon-normal', size: 'larger', parentId: 'larger' },
      { title: '增加类型', type: 'icon-normal', size: 'larger', disabled: true, parentId: 'larger' },
    ]
  },
  {
    title: '默认按钮',
    id: 'default',
    list: [
      { title: '按钮', type: 'primary', parentId: 'default' },
      { title: '按钮', type: 'default', parentId: 'default' },
      { title: '按钮', type: 'fff-primary', bgFull: true, parentId: 'default' },
      { title: '业务', type: 'work', parentId: 'default' },
    ]
  },
  {
    title: '小按钮',
    id: 'small',
    list: [
      { title: '按钮', type: 'primary', size: 'small', parentId: 'small' },
      { title: '按钮', type: 'fff-primary', size: 'small', bgFull: true, parentId: 'small' },
      { title: '按钮', type: 'default', size: 'small', bgFull: true, parentId: 'small' },
    ]
  },
]

const adpeterTag = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'title-primary-grey mb-20-r'
      },
      idf: item.id,
      liClass: item.id == 'small' ? 'flex-row-wrap-between-center mb-40-r' : 'mb-40-r'
    })
    item.list.map( itemxx => {
      let iClass = ('mb-20-r btn-' + itemxx.type) + (itemxx.size ? ' btn-' + itemxx.size : '') + (itemxx.bgFull ? ' btn-bg-full' : '') + (itemxx.disabled ? ' btn-disabled' : '')
      output.push({
        title:  {
          title: itemxx.title,
        },
        itemClass: iClass,
        parent: item.id
      })
    })
  })
  return output
}

const buttonData = {
  title: [
    {
      title: 'Button',
      itemClass: 'title-lg-active'
    },
    {
      title: '按钮',
      itemClass: 'title-primary-grey'
    },
    {
      title: '一种色值，三种展示效果，三种大小。注意：目前小程序border-color的透明度是无效的',
      itemClass: 'title-sm-grey'
    }
  ],
  '@tree': {
    data: adpeterTag(data),
    listClass: 'mt-40-r',
  },
  titleClass: 'ml-40-r',
  // liClass: 'mt-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(buttonData)
  }
})
