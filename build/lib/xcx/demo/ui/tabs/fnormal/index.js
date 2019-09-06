//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabMenu = [
  { title: '选项一', itemClass: "active", tap: 'onTap?idx=0'},
  { title: '选项二', tap: 'onTap?idx=1'},
  { title: '选项三', tap: 'onTap?idx=2'},
]

Pager({
  data: {
    motto: Pager.list({
      data: tabMenu,
      listClass: 'tab-list tab-list-theme hei-p100 bg-fff'
    }),
  },
  savePrevSelect: [],
  onTap:  function(e, param, inst) {
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
