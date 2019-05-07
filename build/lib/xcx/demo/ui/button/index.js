//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const data = [
  {
    title: 'larger',
    id: 'larger',
    list: [
      { title: 'Button', type: 'primary', size: 'larger', parentId: 'larger' },
      { title: 'disable', type: 'primary', size: 'larger', disabled: true, parentId: 'larger' },
      { title: 'Button', type: 'fff-primary', size: 'larger', parentId: 'larger' },
    ]
  },
  {
    title: 'default',
    id: 'default',
    list: [
      { title: 'Button', type: 'primary', parentId: 'default' },
      { title: '业务', type: 'work', parentId: 'default' },
      { title: 'Button', type: 'fff-primary', bgFull: true, parentId: 'default' },
    ]
  },
  {
    title: 'small',
    id: 'small',
    list: [
      { title: 'Button', type: 'primary', size: 'small', parentId: 'small' },
      { title: 'Button', type: 'fff-primary', size: 'small', bgFull: true, parentId: 'small' },
      { title: 'disable', type: 'fff-primary', size: 'small', disabled: true, parentId: 'small' },
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
      title: '按钮，目前只有一种色值，三种展示效果，三种大小，后期可通过传参的方法，现实各自的需求',
      itemClass: 'title-primary-grey'
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
