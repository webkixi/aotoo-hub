//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import modalData from './data'

const data = [
  {
    title: '侧弹',
    id: 'default',
    list: [
      { title: '顶弹', attrs: 'top', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '底弹', attrs: 'bot', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '左弹', attrs: 'left', type: 'primary', size: 'larger', parentId: 'default' },
      { title: '右弹', attrs: 'right', type: 'primary', size: 'larger', parentId: 'default' },
    ]
  },
  {
    title: '全屏侧弹',
    id: 'full',
    list: [
      { title: '顶弹', attrs: 'top', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '底弹', attrs: 'bot', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '左弹', attrs: 'left', type: 'fff-primary', size: 'larger', parentId: 'full' },
      { title: '右弹', attrs: 'right', type: 'fff-primary', size: 'larger', parentId: 'full' },
    ]
  },
]

const adpeteractionSide = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'title-primary-grey mb-20-r'
      },
      idf: item.id,
      liClass: ''
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {
            title: itemxx.title,
          },
        ],
        itemClass: ('mb-20-r btn-' + itemxx.type) + (itemxx.size ? ' btn-' + itemxx.size : ''),
        aim: 'openBar?type='+item.id+'&&direction=' + itemxx.attrs,
        parent: item.id
      })
    })
  })
  return output
}

const actionSideData = {
  title: [
    {
      title: 'Modal',
      itemClass: 'title-lg-active'
    },
    {
      title: '弹出层',
      itemClass: 'title-primary-grey'
    }
  ],
  '@tree': {
    data: adpeteractionSide(data),
    listClass: 'mt-40-r',
  },
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(actionSideData),
    actionSide: {
      id: 'actionSide1',
      title: [
        {title: '打开新侧弹', aim: 'open_as2'},
      ]
    }
  },
  openBar: function(e, query, inst) {
    const theAim = query.direction.replace(/_/g,"/")
    const type = query.type
    const aside1 = this.getElementsById('actionSide1')
    console.log(type)
    if (theAim) {
      switch (theAim) {
        case theAim:
          (()=>{
            const direction = theAim || 'right'
            aside1.reset()[direction]({
            itemClass: type && type == 'full' ? 'full' : 'bar',
            title: {
              title: '推荐理由',
              itemClass: 'size17 fw-bold ss-center'
            },
            body: modalData
          })
          })()
        break;
      }
    }
  }
})
