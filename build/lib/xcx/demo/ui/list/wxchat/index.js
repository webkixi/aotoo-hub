//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import getdata from '../data'
import {adapterList2Ss} from '../adapter'

const gatherList = [
  { title: {title: '效果一', itemClass: 'bg-title'}, liClass: 'bg-fff bb-default',idf: 'g1' },
  {
    '@list': {
      itemClass: 'plr-20-r ss-focus flex-row',
      data: adapterList2Ss( getdata.listDatax, {
        imgClass: 'list-img-sm',
        bodyClass: 'bb-default',
        imgDotClass: 'icon-dot-small ss-absolute-tr'
      })
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
      data: gatherList
    })
  }
})