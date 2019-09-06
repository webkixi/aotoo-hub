//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

import inputTips from '../../../pages/tips/inputtips'

//模拟数据
import data from './data'

//适配方法
import adapter from './adapter'

const selectionHeaderData = [
  { title: '国内', itemClass: "active", tap: 'onTap?idx=0'},
  { title: '海外', tap: 'onTap?idx=1'},
]

Pager({
  data: {
    selectionHeader: Pager.list({
      data: selectionHeaderData,
      listClass: 'tab-list tab-list-theme bg-fff plr-default box-shadow-bottom'
    }),
    selectionBody: Pager.item(adapter.selectionAdapter(data.cityData[0])),
    letterToast: inputTips
  },
  savePrevSelect: [],
  query: '',      //获取节点需要的
  d1: [],
  d2: [],
  onTap:  function(e, param, inst) {
    //点击头部列表，item
    const $selectionHeader = Pager.getElementsById('selectionHeader')
    const $selectionBody = Pager.getElementsById('selectionBody')
    const idx = parseInt(param['idx'])
    const $list = $selectionHeader.getData().data
    //为了防止点击一样的item也作更新的问题
    if (this.savePrevSelect.length > 1){
      if (this.savePrevSelect[1] != idx){
        this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
      }
    }
    else {
      this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
    }
  },
  updateDataFunc: function($selectionHeader, $selectionBody, $list, idx) {
    //更新头部列表，及更新对应body内容
    this.savePrevSelect.length > 1 ? this.savePrevSelect = this.savePrevSelect.slice(1) : this.savePrevSelect
      $list.map( (item, ii) => {
        if (item.itemClass) item.itemClass = ''
        if (ii == idx) {
          this.savePrevSelect.push(idx)
          item.itemClass = this.savePrevSelect.length > 1 ? this.savePrevSelect[0] > this.savePrevSelect[1] ? 'f-right active' : 'active' : 'active'
        }
        return item
      })
      $selectionHeader.update($list)
      $selectionBody.update(adapter.selectionAdapter(data.cityData[idx]))
  },
  onClickCityMenu: function(e, param, inst) {
    const $scrollcitylist = Pager.getElementsById('scrollcitylist')
    const $letterToast = Pager.getElementsById('letterToast')
    let letter = param['id']
    $scrollcitylist.update({'type.scroll-into-view': letter})
    $letterToast.reset().mid({
      title: {
        title: letter,
        itemClass: 'item-circle-solid'
      },
      itemClass: 'popups-wrap-trans'
    })
  },
  onScroll: function(e, param) {
    //滚动时触发 fixed菜单的切换
    // const $scrollcitylist = this.getElementsById('scrollcitylist')
    // // $scrollcitylist.update({'type.bindscroll': 'onScroll?'+})
    // console.log(this.d2);
    
  },
  onReady: function() {
    // const $scrollcitylist = this.getElementsById('scrollcitylist')
    // this.query = wx.createSelectorQuery().in()
    // $scrollcitylist.getData().data.map(item => {
    //   if (item.idf){
    //     this.query.select('#'+item.idf).boundingClientRect(res => {
    //       res.top
    //     })
    //     this.query.selectViewport().scrollOffset(res=>{
    //      res.scrollTop
    //     })
        
    //     this.query.exec(res => {
    //       console.log(res)
    //     })
    //   }
    // })
  }
})


// const selectionData = {
//   scroll: true,
//   multipy: false,
//   data: adapter.selectionAdapter(data.cityData),
//   listClass: 'tabs-default-scroll hei-p100 bg-fff tabs-selection tabs-menu-gird-2',
// }

// Pager({
//   data: {
//     selection: selectionData
//   },
// })