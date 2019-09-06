//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const refertowx = {
  type: {
    is: 'scroll',
    'scroll-y': true,
  },
  data: [
    { title: '酒店介绍', itemClass: "active", tap: 'onTap2?idx=0'},
    { title: '酒店设施', tap: 'onTap2?idx=1'},
  ],
  listClass: 'tab-list-scroll tab-list-theme-scroll'
}

Pager({
  data: {
    motto: Pager.list(refertowx),
    listClass: 'hei-p100 bg-fff'
  },
  savePrevSelect: [],
  onTap2: function(e, param, inst) {
    const listTab = Pager.getElementsById('motto')
    const idx = parseInt(param['idx'])
    const $list = listTab.data.$list
    this.savePrevSelect.length > 1 ? this.savePrevSelect = this.savePrevSelect.slice(1) : this.savePrevSelect
    $list.data = $list.data.map( (item, ii) => {
      if (item.itemClass) item.itemClass = ''
      if (ii == idx) {

        this.savePrevSelect.push(idx)
        item.itemClass = this.savePrevSelect.length > 1 ? this.savePrevSelect[0] > this.savePrevSelect[1] ? 'f-right active' : 'active' : 'active'
      }
      return item
    })
    listTab.update($list.data)
  }
})
