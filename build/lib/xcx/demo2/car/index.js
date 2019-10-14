//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib


//模拟数据
import getCarData from './data'


//适配方法
import adapter from './adapter'

//右边浮层
const typeData = [
  {title: 'A'},
  {title: 'B'},
  {title: 'C'},
  {title: 'D'},
  {title: 'E'},
  {title: 'F'},
  {title: 'G'},
  {title: 'H'},
  {title: 'I'},
  {title: 'J'},
  {title: 'K'},
  {title: 'L'},
  {title: 'M'},
  {title: 'N'},
  {title: 'O'},
  {title: 'P'},
  {title: 'Q'},
  {title: 'R'},
  {title: 'S'},
  {title: 'T'},
  {title: 'W'},
  {title: 'X'},
  {title: 'Y'},
  {title: 'Z'},
]

const imgsCache = lib.hooks('car-imgs', {localstorage: true, max: 250})
imgsCache.once('cache-switch', function(shadowData) {
  /** storeData与shadowData数据交换时，会丢弃shadowData的所有本地图片数据 
   * 在丢弃之前应该要清除所有本地缓存的图片
  */
 Object.keys(shadowData).forEach(poi=>{
   let imgsrc = shadowData[poi].$$value
  if (imgsrc && imgsrc.target) {
    let img = value.target
    wx.removeSavedFile({ filePath: img })
   }
 })
})

imgsCache.once('cache-delete', function(value) {
  /** storeData与shadowData数据交换时，会丢弃shadowData的所有本地图片数据 
   * 在丢弃之前应该要清除所有本地缓存的图片
  */
 if (value && value.target) {
  let imgsrc = value.target
  wx.removeSavedFile({ filePath: imgsrc })
 }
})

imgsCache.once('cache-destory', function(allData) {
 Object.keys(allData).forEach(poi => {
   let imgsrc = allData[poi].$$value
   console.log('333', imgsrc);
   wx.removeSavedFile({ filePath: imgsrc })
 })
})


Pager({
  data: {
    tabChoose: {
      $$id: 'tabChoose',
      data: typeData,
      listClass: 'hei-p100 bg-fff',
      showMenusStatus: true
    }
  },
  xsss: [],
  onReady: function() {
    const $tabChoose = this.getElementsById('tabChoose')
    $tabChoose.update(this.xsss)
    setTimeout(() => {
      wx.hideLoading()
    }, 1000);
  },
  onLoad: function() {
    this.xsss = adapter.selectionAllAdapter(typeData, getCarData, imgsCache)
    wx.showLoading({
      title: '加载中',
    })
  }
})


