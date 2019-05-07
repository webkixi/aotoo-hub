//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const data = [
  {
    title: 'color',
    id: 'color',
    list: [
      { title: 'active', littleTitle: '#333', parentId: 'color' },
      { title: 'default', littleTitle: '#666', parentId: 'color' },
      { title: 'grey', littleTitle: '#999', parentId: 'color' },
      { title: 'primary', littleTitle: '#227ce1', parentId: 'color' },
      { title: 'minor', littleTitle: '#ff5552', parentId: 'color' },
      { title: 'bg', littleTitle: '#f4f5f6', parentId: 'color' },
    ]
  }
]

const adpeterButton = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'title-primary-grey mb-20-r'
      },
      idf: item.id,
      liClass: 'flex-row-wrap-between-center list-mt-30-r'
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {
            title: itemxx.title,
          },
          {
            title: itemxx.littleTitle,
            itemClass:  'size12'
          },
        ],
        itemClass: 'item-li bg-display wid-p30 color-fff bg-' +itemxx.title,
        parent: item.id
      })
    })
  })
  return output
}

const buttonData = {
  title: [
    {
      title: 'Utility',
      itemClass: 'title-lg-active'
    },
    {
      title: '工具类',
      itemClass: 'title-primary-grey'
    }
  ],
  '@tree': {
    data: adpeterButton(data),
    listClass: 'mt-40-r',
  },
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(buttonData)
  }
})
