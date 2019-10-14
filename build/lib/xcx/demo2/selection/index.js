//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib


//模拟数据
// import inlandData from './cityData/data1'


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
    selectionBody: Pager.list({
      data: [
        {
          '@component': {
            is: 'tab-choose',
            $$id: 'inlandx',
            data: [
              {title: 'A'},
              {title: 'B'},
              {title: 'C'},
              {title: 'D'},
              {title: 'E'},
              {title: 'F'},
              {title: 'G'},
              {title: 'H'},
              {title: 'J'},
              {title: 'K'},
              {title: 'L'},
              {title: 'M'},
              {title: 'N'},
              {title: 'P'},
              {title: 'Q'},
              {title: 'R'},
              {title: 'S'},
              {title: 'T'},
              {title: 'W'},
              {title: 'X'},
              {title: 'Y'},
              {title: 'Z'},
            ],
            listClass: 'hei-p100'
          },
          attr: {id: 0},
          itemClass: 'none',
        },
        {
          '@component': {
            is: 'tab-choose',
            $$id: 'overseasx',
            data: [
              {title: 'A'},
              {title: 'B'},
              {title: 'C'},
              {title: 'D'},
              {title: 'F'},
              {title: 'G'},
              {title: 'H'},
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
            ],
            listClass: 'hei-p100'
          },
          itemClass: 'none',
          attr: {id: 1}
        },
      ],
      listClass: 'selection-body bg-fff'
    }),
    tipx: {
      $$id: 'tipx'
    }
  },
  savePrevSelect: [],
  inlandData : [],
  overseasData : [],
  clickVal: [],
  xxoo: [],
  xxoo2: [],
  onTap:  function(e, param, inst) {
    //点击头部列表，item
    const $selectionHeader = this.getElementsById('selectionHeader')
    const $selectionBody = this.getElementsById('selectionBody')
    
    const idx = parseInt(param['idx'])
    const $list = $selectionHeader.getData().data

    wx.showLoading({title: '加载中'})
    setTimeout(() => {
      wx.hideLoading()
      //为了防止点击一样的item也作更新的问题
      if (this.savePrevSelect.length > 1){
        if (this.savePrevSelect[1] != idx){
          this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
        }
      }
      else {
        this.updateDataFunc($selectionHeader, $selectionBody, $list, idx)
      }
    }, 500);
    
  },
  updateDataFunc: function($selectionHeader, $selectionBody, $list, idx) {
    //更新头部列表，及更新对应body内容
    // const $scrollcitylist = Pager.getElementsById('scrollcitylist')
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
      $selectionBody.reset().findAndUpdate({id: idx}, function(res){
        res.itemClass = ''
        return res
      })
  },
  onReady: function() {
    const $selectionBody = this.getElementsById('selectionBody')
    const tabChoose = this.getElementsById('inlandx')
    const tabChoose2 = this.getElementsById('overseasx')
    
    const that = this
    //进来时，显示第一个tabs的数据
    $selectionBody.findAndUpdate({id: 0}, function(res){
      res.itemClass = ''
      return res
    })
    //从组件传来的id，如果当前值还没有返回，可通过id去请求
    tabChoose.hooks.on('updateContent', function(param){
      const id = param.id.toLowerCase()
      that.forCloudData('inland', 'inlandx', {type: 'single', id: id})
      // getCloudData({collectionName: 'inland', cfrl: id})
    })
    tabChoose2.hooks.on('updateContent', function(param){
      const id = param.id
      that.forCloudData('overseas', 'overseasx', {type: 'single', id: id})
    })
  },
  forCloudData: function(name, getElementsById, param = {} ) {
    const inlandTitle = ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z']
    const overseasTitle = ["A", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    const data = name == 'inland' ? inlandTitle : overseasTitle
    const {type, id} = param
    if (type == 'single') {
      const inst = this.getElementsById(getElementsById)
      if (this.xxoo[name].length > 0 && this.xxoo[name].indexOf(id) < 0) {
        getCloudData({collectionName: name, cfrl: id})
        .then(res => {
          return inst.updateItems(res, data.indexOf(id))
        })
      }
    }
    else {
      this.xxoo[name] = []
      data.map(async(item, ii) => {
        await getCloudData({collectionName: name, cfrl: item})
        .then(res => {
          const inst = this.getElementsById(getElementsById)
          this.xxoo[name].push(item)
          return inst.updateItems(res, ii)
        })
      })

      setTimeout(() => {
        wx.hideLoading()
      }, 2500);
    }
  },
  onLoad: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
    this.forCloudData('inland', 'inlandx')
    setTimeout(() => {
      this.forCloudData('overseas', 'overseasx')
    }, 1000);
  },
  onUnload: function() {
    
  }
})

async function getCloudData(param){
  try {
    if (param) {
      const {collectionName, cfrl} = param
      const db = wx.cloud.database()
      const _ = db.command
      //定义每次获取的条数​
      const MAX_LIMIT = 100;
      let cloudData = []   //承载读操作的数组
      //先取出集合的总数
      let totalx = await db.collection(collectionName).where({
        cfrl: cfrl,
        cityId: _.lt(999)
      }).count()
      //计算需分几次取
      const batchTimesx = Math.ceil(totalx.total / MAX_LIMIT)
      for(let j = 0; j< batchTimesx; j++) {
        const kk = await db.collection(collectionName).skip(j * MAX_LIMIT).limit(MAX_LIMIT)
                  .where({ cfrl: cfrl, cityId: _.lt(999) })
                  .field({ cfrl: true, cityId: true, cname: true })
                  .get()
        for (let j = 0; j < kk.data.length;j++){
          cloudData.push(kk.data[j])
        }
      }
      return await adapter.selectionAdapter(cloudData, cfrl)
    }
  } catch (error) {
    console.error(error);
  }
}

// async function getCloudData(that, collectionName, collectionLetter, name, clickStatus){
//   try {
//     if (name) {
//       const db = wx.cloud.database()
//       const _ = db.command
//       //定义每次获取的条数​
//       const MAX_LIMIT = 20;
//       // const letter = collectionName == 'inland' ? ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'] : ["A", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
      
//       // if (clickStatus){
//       //   that.clickVal.filter(item => {
//       //     if (item != name) {
//       //       that.clickVal.push(name)
//       //     }
//       //   })
//       //   let cloudData = []   //承载读操作的 promise 的数组
//       //   let cloudData2 = []   //承载读操作的 promise 的数组
//       //   //先取出集合的总数
//       //   let totalx = await db.collection(collectionName).where({
//       //     cfrl: name,
//       //     cityId: _.lt(888)
//       //   }).count()
//       //   //计算需分几次取
//       //   const batchTimesx = Math.ceil(totalx.total / MAX_LIMIT)
//       //   for(let j = 0; j< batchTimesx; j++) {
//       //     const kk = await db.collection(collectionName).skip(j * MAX_LIMIT).limit(MAX_LIMIT).where({
//       //       cfrl: name,
//       //       cityId: _.lt(888)
//       //     }).get()
//       //     for (let j = 0; j < kk.data.length;j++){
//       //       cloudData.push(kk.data[j])
//       //     }
//       //   }
//       //   tabChoose.updateItems([adapter.selectionAdapter(cloudData, name)], letter.indexOf(name))
//       //   storeData.push(adapter.selectionAdapter(cloudData, name))
//       // }
//       // else {
//         let cloudData = []   //承载读操作的 promise 的数组ww
//         for (let i = 0; i < collectionLetter.length; i++) {
//           let cloudData2 = []   //承载读操作的 promise 的数组ww
//           //先取出集合的总数
//           if (that.clickVal.indexOf(collectionLetter[i]) < 0){
//             let totalx = await db.collection(collectionName).where({
//               cfrl: collectionLetter[i],
//               cityId: _.lt(888)
//             }).count()
//             //计算需分几次取
//             const batchTimesx = Math.ceil(totalx.total / MAX_LIMIT)
//             for(let j = 0; j< batchTimesx; j++) {
//               const kk = await db.collection(collectionName).skip(j * MAX_LIMIT).limit(MAX_LIMIT).where({
//                 cfrl: collectionLetter[i],
//                 cityId: _.lt(888)
//               }).get()
//               for (let j = 0; j < kk.data.length;j++){
//                 // collectionName == 'inland' ?
//                   cloudData.push(kk.data[j])
//                   // : cloudData2.push(kk.data[j])
//               }
//             }
//             return i
//             // tabChoose.updateItems([adapter.selectionAdapter(cloudData, letter[i])], i)
//             // storeData.push(adapter.selectionAdapter(cloudData, letter[i]))
//           }
//         }
//         // return cloudData     //全部请求完，再做下一步操作
//       }
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// }


// getDataFunc:function(data) {
//   // const tabChoose = this.getElementsById('xxoo')
//   const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'x', 'y', 'z']
//   const letter2 = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z']
//   let isHide = false
//   for (let i = 0; i < letter.length; i++) {
//     const letterData = require('./cityData/inland/'+letter[i])
//     let letterDataPath = './cityData/inland/'+letter[i]
//     // console.log(letterDataPath);
//     // import letterData from letterDataPath
//     // console.log(letterData, ':ssss');
    
//     let inlandData = []
//     letterData.filter(item => {
//       if (item.cityId < 500) {
//         inlandData.push(item)
//       }
//     })
//     this.inlandData.push(adapter.selectionAdapter(inlandData, letter[i]))
//   }
//   for (let i = 0; i < letter2.length; i++) {
//     const letterData2 = require('./cityData/overseas/'+letter2[i])
//     // import xx from './cityData/ovesrseas/'+letter2[i]
//     let overseasData = []
//     letterData2.filter(item => {
//       if (item.cityId < 500) {
//         overseasData.push(item)
//       }
//     })
//     this.overseasData.push(adapter.selectionAdapter(overseasData, letter[i]))
//   }
// },
// getDataItemFunc: function(name) {
//   const tabChoose = this.getElementsById('xxoo')
//   const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'x', 'y', 'z']

//   const letterData = require('./cityData/inland/'+name)
//   let inlandData = []
//   letterData.filter(item => {
//     if (item.cityId < 9000) {
//       inlandData.push(item)
//     }
//   })
//   tabChoose.updateItems([adapter.selectionAdapter(inlandData, name)], letter.indexOf(name))
// },