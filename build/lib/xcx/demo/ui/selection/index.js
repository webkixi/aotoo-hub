//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib


//模拟数据


//适配方法
import adapter from './adapter'

const selectionHeaderData = [
  { title: '国内', itemClass: "active", tap: 'onTap?idx=0'},
  { title: '海外', tap: 'onTap?idx=1'},
]




async function getCloudData(that, name){
  try {
    if (name) {
      const db = wx.cloud.database()
      const _ = db.command
      const tabChoose = that.getElementsById('xxoo')
      
      let cloudData = []    //承载所有读操作的 promise 的数组
      //定义每次获取的条数​
      const MAX_LIMIT = 20;
      //先取出集合的总数
      const total = await db.collection('inland').count()
      //计算需分几次取
      const batchTimes = Math.ceil(total.total / MAX_LIMIT)
      const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'x', 'y', 'z']
      for (let i = 0; i < letter.length; i++) {
        let x = []
        let totalx = await db.collection('inland').where({
          cfrl: letter[i],
          cityId: _.lt(9999)
        }).count()
        const batchTimesx = Math.ceil(totalx.total / MAX_LIMIT)
        for(let j = 0; j< batchTimesx; j++) {
          const kk = await db.collection('inland').skip(j * MAX_LIMIT).limit(MAX_LIMIT).where({
            cfrl: letter[i],
            cityId: _.lt(9999)
          }).get()
          for (let j = 0; j < kk.data.length;j++){
            x.push(kk.data[j])
          }
        }
        tabChoose.updateItems(adapter.selectionAdapter(x, letter[i]), i)
      }

    }
  } catch (error) {
    console.error(error);
  }
}

Pager({
  data: {
    selectionHeader: Pager.list({
      data: selectionHeaderData,
      listClass: 'tab-list tab-list-theme bg-fff plr-default box-shadow-bottom'
    }),
    tabChoose: {
      $$id: 'xxoo',
      data: [],
      listClass: 'selection-body bg-fff'
    }
  },
  savePrevSelect: [],
  onTap:  function(e, param, inst) {
    //点击头部列表，item
    const $selectionHeader = this.getElementsById('selectionHeader')
    const $selectionBody = this.getElementsById('selectionBody')
    
    const idx = parseInt(param['idx'])
    const $list = $selectionHeader.getData().data

    wx.showLoading({title: '加载中'})

    //为了防止点击一样的item也作更新的问题
    if (this.savePrevSelect.length > 1){
      if (this.savePrevSelect[1] != idx){
        this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
      }
    }
    else {
      this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
    }
    setTimeout(() => {
      wx.hideLoading()
    }, 500);
    
  },
  updateDataFunc: function($selectionHeader, $selectionBody, $list, idx) {
    //更新头部列表，及更新对应body内容
    const $scrollcitylist = Pager.getElementsById('scrollcitylist')
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
      $scrollcitylist.update({'type.scroll-into-view': 'hot'})
      $selectionBody.reset().update(adapter.selectionAdapter(data.cityData[idx]))
      
  },

  onReady: function() {
  },
  onLoad: function() {
    getCloudData(this, 'a')
  }
})
