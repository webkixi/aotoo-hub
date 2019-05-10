//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')


const data = [
  {
    title: 'Tabs 导航(除了normal, 其它都不是用tabs组件)',
    id: 'tabs',
    list: [
      { title: 'Normal', attrx: 'normal', littleTitle: '常规 ' },
      { title: 'Scroll', attrx: 'scroll', littleTitle: '滚动 ' },
    ]
  },
]

const adapterMenu = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'bg-title'
      },
      idf: item.id,
      liClass: 'bg-fff list-bb bb-default'
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {title: itemxx.title},
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey'}
        ],
        titleClass: 'item-border flex-row-between-center',
        parent: item.id,
        itemClass: 'item ss-focus',
        tap: 'onTap?demo='+itemxx.attrx 
      })
    })
  })
  return output
}

Pager({
  data: {
    motto: Pager.tree({
      data: adapterMenu(data)
    }),
  },
  onTap: function(e, query, inst) {
    const theTap = query.demo.replace(/_/g,"/")
    if (theTap) {
      switch (theTap) {
        case theTap:
          wx.navigateTo({
            url: './'+theTap+'/index'
          })
        break;
      }
    }
  },
})
