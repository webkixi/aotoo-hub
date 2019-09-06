//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import modalData from './data'

const data = [
  {
    title: '弹窗',
    id: 'pop',
    list: [
      { title: '中间弹层', attrs: 'pop', type: 'primary', size: 'larger', parentId: 'pop' },
      { title: '从顶部弹下', attrs: 'pop.top', type: 'primary', size: 'larger', parentId: 'pop' },
      { title: '从底部弹出', attrs: 'pop.bot', type: 'primary', size: 'larger', parentId: 'pop' },
    ]
  },
  {
    title: '面包消息',
    id: 'toast',
    list: [
      { title: '底部消息', attrs: 'toast', type: 'fff-primary', size: 'larger', parentId: 'toast' },
      { title: '中间消息', attrs: 'toast.mid', type: 'fff-primary', size: 'larger', parentId: 'toast' },
      { title: '自定义延时', attrs: 'countdown', type: 'fff-primary', size: 'larger', parentId: 'toast' },
    ]
  },
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
  onReady: function() {
    const that = this
    this.insts = {
      motto: this.getElementsById('motto'),
      aside1: this.getElementsById('actionSide1'),
    }
    this.insts.aside1.hooks.on('hide', function () {
      that.insts.motto.removeClass('frozen')
    })
  },
  openBar: function(e, query, inst) {
    const theAim = query.direction.replace(/_/g,"/")
    const type = query.type
    const motto = this.insts.motto
    const aside1 = this.insts.aside1
    console.log(type)
    if (type == 'toast') {
      if (theAim == 'countdown') {
        aside1.toast.countdown(10000)
        aside1.toast.mid({
          title: '延时10秒自动消失'
        })
      } else {
        const o = theAim.split('.')
        const reset = aside1.reset()
        aside1.toast.countdown(3000)
        const func = o.length > 1 ? reset[o[0]][o[1]] : reset[o[0]].bind(aside1)
        func({
          title: '消息框'
        })
      }
    } 
    else if (type == 'pop') {
      motto.addClass('frozen')
      const o = theAim.split('.')
      const reset = aside1.reset()
      const func = o.length > 1 ? reset[o[0]][o[1]] : reset[o[0]].bind(aside1)
      func({
        title: {
          title: '推荐理由',
          itemClass: 'size17 fw-bold ss-center',
        },
        itemStyle: 'top: -50px; width: 85%; height: 85%; padding: 10px',
        body: modalData
      })
    } 
    else {
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
  }
})
