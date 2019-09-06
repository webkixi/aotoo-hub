//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import getdata from '../data'
import {adapterList7Ss} from '../adapter'

const gatherList = [
  { title: {title: '效果一', itemClass: 'bg-title'}, liClass: 'bg-fff bb-default',idf: 'g1' },
  {
    '@list': {
      listClass: 'list-pic-column pic-2 padding-default',
      itemClass: 'ss-focus item-li',
      data: adapterList7Ss( getdata.listData2xx)
    },
    parent: 'g1'
  },
]

Pager({
  data: {
    motto: Pager.tree({
      type: {
        is: "scroll"
      },
      data: gatherList,
      listClass: 'hei-p100 bg-fff'
    })
  }
})