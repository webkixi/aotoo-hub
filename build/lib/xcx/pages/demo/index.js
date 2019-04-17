//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib
import * as myData  from './demodata'

Pager({
  data: {
    motto: Pager.item({
      title: '示例',
      itemClass: 'padding-20-r'
    }),
    actionSide1: myData.actionSide1,
    actionSide2: myData.actionSide2,
    actionSide3: myData.actionSide3
  },
  onLoad: function (param) {
    const motto = Pager.getElementsById('motto')
    if (param && lib.isObject(param) && param.demo) {
      const demo = param.demo
      switch (demo) {
        case 'string':
          motto.reset().update(myData.stringData)
          break;
        case 'link':
          motto.reset().update(myData.aimData)
          break;
        case 'icon':
          motto.reset().update(myData.iconData)
          break;
        case 'longpress':
          motto.reset().update(myData.longpressData)
          break;
        case 'titles':
          motto.reset().update(myData.titlesData)
          break;
        case 'pic':
          motto.reset().update(myData.onepicData)
          break;
        case 'pics':
          motto.reset().update(myData.picsData)
          break;
        case 'sort':
          motto.reset().update(myData.sortData)
          break;
        case 'list':
          motto.reset().update(myData.listData)
          break;
        case 'tree':
          motto.reset().update(myData.treeData)
          break;
        case 'actionSide':
          motto.reset().update({
            title: '',
            '@list': myData.buttonForAs
          })
          break;
        case 'component':
          motto.reset().update({
            '@component': {
              is: 'button',
              title: '一个按钮',
              class: 'button primary'
            }
          })
          break;
        case 'tab':
          motto.reset().update({
            '@component': {
              is: 'tab',
              data: myData.tabData
            }
          })
          break;
      }
    }
  },

  aim: function (e, query, inst) {
    const target = e.currentTarget
    const currentDset = target.dataset
    const theAim = currentDset.aim
    const theQuery = currentDset._query   // 通过?传递过来的参数

    const aside1 = this.getElementsById('actionSide1')
    const aside2 = this.getElementsById('actionSide2')
    const aside3 = this.getElementsById('actionSide3')

    const mytree = this.getElementsById('mytree')
    const mytree2 = this.getElementsById('mytree2')

    switch (theAim) {
      case 'inner-response':
        Pager.alert('点我干什么!')
        break;

      case 'open_diytour':
        (()=>{
          const direction = theQuery && theQuery.direction || 'right'
          aside1.reset()[direction](
            myData.diytourData
          )
          // aside1.reset()[direction]({
            // title: [
            //   {title: '弹窗1', class: 'h2'},
            //   {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
            //   {
            //     title: '打开第二个弹窗',
            //     aim: 'open-as2?abc=123'
            //   }
            // ],
          // })
        })()
        break;
      case 'open_diytourx':
        (()=>{
          const direction = theQuery && theQuery.direction || 'right'
          aside1.reset()[direction](
            myData.diytour2Data
          )
          // aside1.reset()[direction]({
            // title: [
            //   {title: '弹窗1', class: 'h2'},
            //   {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
            //   {
            //     title: '打开第二个弹窗',
            //     aim: 'open-as2?abc=123'
            //   }
            // ],
          // })
        })()
        break;

      case 'as-full':
        (()=>{
          const direction = theQuery && theQuery.direction || 'right'
          aside1.reset()[direction]({
            title: [
              {title: '弹窗1', class: 'h2'},
              {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
              {
                title: '打开第二个弹窗',
                aim: 'open-as2?abc=123'
              }
            ],
          })
        })()
        break;

      case 'open-as2':
        aside2.reset().right({
          title: [
            {title: '弹窗2', class: 'h2'},
            {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
            {
              title: '打开第三个弹窗',
              aim: 'open-as3'
            }
          ],
        })
        break;

      case 'open-as3':
        aside3.right({
          title: [
            {title: '弹窗3', class: 'h2'},
            {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
            {
              title: '关闭所有弹窗',
              aim: 'close-as-full'
            }
          ],
        })
        break;

      case 'open-bar':
        (()=>{
          const direction = theQuery && theQuery.direction || 'right'
          aside1[direction]({
          class: 'bar',
          title: [
            {title: '弹窗1', class: 'h2'},
            {title: '支持多弹窗，灵活属性设置可以实现多种弹窗效果', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
            {
              title: '打开第二个弹窗',
              aim: 'open-as2'
            }
          ],
        })
        })()
        break;

      case 'close-as-full':
        aside1.hide()
        aside2.hide()
        aside3.hide()
        break;

      case 'tree-append':
        mytree.append({
          title: {
            title: 'hahah',
            class: 'h6 block'
          },
          parent: 'level_4'
        })
        break;

      case 'tree-prepend':
        mytree.prepend({
          title: {
            title: 'ni mei',
            class: 'h6 block'
          }
        })
        break;

      case 'tree-hide':
        // mytree.children.level3.toggle(stat => {
        //   const hideTitle = stat ? 'hide' : 'show'
        //   inst.update({
        //     'title[2].title': hideTitle
        //   })
        // })
        break;

      case 'tree-delete':  // tree使用li而不是@list的模式
        // mytree.delete(currentDset['treeid'])
        break;
    }
  },

  'tree-hide': function (e, param, inst) {
    const mytree = this.getElementsById('mytree')
    const treeid = e.currentTarget.dataset['treeid']
    const tinst = mytree.children[treeid]
    tinst.toggle()
    // console.log(e);
  },

  onLongPress: function(e, param, inst) {
    Pager.alert('我是长按响应')
  },

  onTap: function(e, param, inst) {
    Pager.alert('haha')
  },

  'mytree-delete': function(e, param, inst) {
    const mytree = this.getElementsById('mytree')
    const target = e.currentTarget
    const currentDset = target.dataset
    mytree.delete(currentDset['treeid'])
  },

  hideLevel1: function(e, param, inst) {
    const mytree = this.getElementsById('mytree')
    mytree.children.level3.hide()
  }
})
