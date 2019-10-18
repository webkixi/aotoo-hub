const app = getApp()
const Core = require('components/aotoo/core')
const lib = Core.lib

Component({
  behaviors: [Core.baseBehavior(app, '_Pop')],
  data: require('./config').config(),
  lifetimes: {
    attached(){
      this.setData({$list: this.data.list})
    },
    ready() {
      this.mount('tabBar')
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    },
    // 小红点
    /**
     * 
     * @param {number} index
     *    指定需要小红点的list下标
     * @param {number/string} _count 
     *    显示的数字，默认不显示0，’00‘显示一个小圆红点没有数字， '000'显示一个0的红点提示，
     *    带符号(+/-)表示在原有的基础上做加减法
     * @param {boolean} zero 
     *    zero为true的时候，允许显示0的红点提示，自减为0也会被显示
     */
    reddot(index=0, _count=1, zero) {
      let oriCount = this.data.$list[index].reddot
      let count = _count.toString()
      let char_0 = count.charAt(0)
      if (char_0 === '+' || char_0 === '-') {
        let oriNum = parseInt(oriCount)
        let num = Math.abs(parseInt(_count))
        if (char_0 === '+') count = (oriNum + num).toString()
        if (char_0 === '-') count = (oriNum-num <= 0 ? 0 : (oriNum-num) ).toString()
      } else {
        char_0 = null
      }
      if (count === '0' && zero) count = '000'
      let upkey = `$list[${index}].reddot`
      this.setData({ [upkey]: count })
    },

    // 设定激活哪一个路由
    selected(index){
      this.setData({ selected: index })
    },

    append(param={}){
      let list = this.data.$list
      list.push({
        pagePath: param.pagePath,
        iconPath: param.iconPath || '',
        selectedIconPath: param.selectedIconPath || '',
        text: param.text || '',
        reddot: param.reddot || '0',
        show: param.hasOwnProperty('show') ? param.show : true
      })

      this.setData({ $list: list })
    },

    prepend(param){
      let list = this.data.$list
      list.unshift({
        pagePath: param.pagePath,
        iconPath: param.iconPath || '',
        selectedIconPath: param.selectedIconPath || '',
        text: param.text || '',
        reddot: param.reddot || '0',
        show: param.hasOwnProperty('show') ? param.show : true
      })
      this.setData({ $list: list })
    },

    update(index, param){
      if (arguments.length <2) {
        console.error('必须指定index, param两个参数')
        return
      }
      let list = this.data.$list
      list[index] = Object.assign({}, list[index], param)
      this.setData({ $list: list })
    },

    delete(index){
      let list = this.data.$list
      list.splice(index, 1)
      this.setData({ $list: list })
    }
  }
})