//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')


const data = [
  {
    title: 'default',
    id: 'default',
    list: [
      { title: 'ff7e11', littleTitle: 'primary', parentId: 'default' },
      { title: '227ce1', littleTitle: 'default', parentId: 'default' },
      { title: '5dcba6', littleTitle: 'special', parentId: 'default' },
      { title: 'ff5552', littleTitle: 'minor', parentId: 'default' },
    ]
  },
  {
    title: '背景色-白',
    id: 'bgfff',
    list: [
      { title: 'ff7e11', littleTitle: 'fff-primary', parentId: 'bgfff' },
      { title: '227ce1', littleTitle: 'fff-default', parentId: 'bgfff' },
      { title: '5dcba6', littleTitle: 'fff-special', parentId: 'bgfff' },
      { title: 'ff5552', littleTitle: 'fff-minor', parentId: 'bgfff' },
    ]
  },
  {
    title: '业务',
    id: 'work',
    list: [
      { title: '227ce1', littleTitle: 'work-default', parentId: 'work' },
    ]
  },
]

const adaptertag = (res, itemClass) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'title-primary-grey mb-20-r'
      },
      idf: item.id,
      liClass: 'flex-row-wrap-between-center  mb-40-r'
    })
    item.list.map( itemxx => {
      output.push({
        title:  {
          title: itemxx.title,
          itemClass: itemClass + itemxx.littleTitle,
        },
        parent: item.id
      })
    })
  })
  return output
}

const tagData = {
  title: [
    { title: 'Tag', itemClass: 'title-lg-active' },
    { title: '标签', itemClass: 'title-primary-grey' }
  ],
  '@tree': {
    data: adaptertag(data, 'item-li tag-'),
    listClass: 'mt-40-r',
  },
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(tagData)
  }
})
