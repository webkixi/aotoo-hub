//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import getdata from '../data'
import {adapterListSs} from '../adapter'

const gatherList = [
  { title: {title: '效果一', itemClass: 'bg-title'}, liClass: 'bg-fff bb-default',idf: 'g1' },
  {
    '@list': {
      listClass: 'bb-e3e3e3-list-hbody',
      itemClass: 'plr-20-r ss-focus flex-row',
      data: adapterListSs( getdata.listDatax)
    },
    parent: 'g1'
  },
  { title: {title: '效果二', itemClass: 'bg-title'}, liClass: 'bg-fff bb-default',idf: 'g2' },
  {
    '@list': {
      listClass: 'bb-e3e3e3-list-hbody',
      itemClass: 'plr-20-r ss-focus flex-row',
      data: adapterListSs( getdata.listData4x, {
        titleGClass: 'hei-p100 flex-column-between',
        itemClass: 'hei-p100',
        bodyClass: 'next-p100-first flex-row-between-center'
      })
    },
    parent: 'g2'
  },
  { title: {title: '效果三', itemClass: 'bg-title'}, liClass: 'bg-fff bb-default',idf: 'g3' },
  {
    '@list': {
      listClass: 'bb-e3e3e3-list-hbody',      
      itemClass: 'plr-20-r ss-focus flex-row',
      data: adapterListSs( getdata.listData2x, {
        bodyClass: 'flex-row-between-center'        
      })
    },
    parent: 'g3'
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