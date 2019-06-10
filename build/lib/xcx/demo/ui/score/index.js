//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const simulationScore = [
  { title: '您喜欢吃苹果么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },
  { title: '您喜欢吃香蕉么', type: '口味', checklist: [{title: '辣'}, {title: '麻'}, {title: '咸香'} ] },

  { title: '您喜欢吃梨么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },
  { title: '您喜欢吃葡萄么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },

  { title: '您喜欢吃火龙果么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },
  { title: '您喜欢吃番石榴么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },

  { title: '您喜欢吃柠檬么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },
  { title: '您喜欢吃荔枝么', type: '喜好', checklist: [{title: '不喜欢'}, {title: '一般'}, {title: '喜欢'} ] },
]

let datax = []
const $pgSize = 2
for(var i=0; i <simulationScore.length; i+= $pgSize){
  datax.push(simulationScore.slice(i, i+$pgSize));
}

const adpapterScore = (data) => {
  // let pgNum = 1   //
  function checklistFunc(res, type) {
    return res.map( (item, ii) => {
      return {
        title: {
          title: type == 'number' ? item : item.title,
          itemClass: 'flex-row-center-center hei-70-r'+ (ii != 0 ? ' bl-default': '')
        }
      }
    })
  }
  return data.map( (item, ii) => {
    return {
      title: [
        {
          '@item': {
            id: 'grade'+ii,
            title: '0'
          },
          itemClass: "size28 fw-bold color-primary wid-160-r ss-center"
        },
        {
          title: [
            {
              title: item.type,
              // title: item.type + ' '+(ii+1)+'/'+data.length,
              itemClass: 'size14 color-grey'
            },
            {
              title: item.title,
              itemClass: 'size16 color-666'
            }
          ],
          itemClass: 'flex-1 bl-default hei-166-r pl-30-r flex-row-center'
        },
      ],
      body: [
        {
          li: checklistFunc(item.checklist),
          liClass: 'flex-row-center next-flex-1 bb-default bg-fff',
        },
        {
          // icon: {
          //   style: 'left: 0px',
          //   itemClass: 'icon-arror-top-solid absolute',
          // },
          '@item': {
            id: 'grade-arrow'+ii,
            title: ' ',
            style: 'left: 0px',
            itemClass: 'icon-arror-top-solid absolute',
          },
          li:  checklistFunc([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], 'number'),
          liClass: 'flex-row-center next-flex-1 bb-default',
          itemClass: 'ss-relative'
        }
      ],
      footer: [
        {
          '@form': {
            data: [
              {
                title: '',
                input: {
                  id: 'grade'+ii,
                  type: 'slider',
                  value: 0,
                  max: 5,
                  step: 0.5,
                  bindchange: 'sliderChange',
                  'block-size': 25,
                  'block-color': '#fff',
                  activeColor: '#4b9afc',
                  itemClass: 'score-padding'
                },
              }
            ],
            itemClass: 'plr-20-r'
          }
        }
      ],
      // attr: {id: ii > pgSize * pgNum ? pgNum = pgNum + 1 : pgNum},
      titleClass: 'flex-row-center hei-166-r bt-default bb-default bg-fff',
      itemClass: 'mb-20-r bb-default'
    }
  })
}
Pager({
  data: {
    score: Pager.list({
      data: adpapterScore(datax[0]),
      itemClass: 'mb-20-r',
      listClass: 'hei-p70'
    }),
    pageBtn: Pager.list({
      data: [
        {
          title: {
            title: ' ',
            itemClass: 'icon-arrow-left-circle small score-absolute',
          },
          itemClass: 'none',
          tap: 'prevPage'
        },
        {
          title: ' ',
          itemClass: 'icon-arrow-right-circle mt-20-r',
          tap: 'nextPage?currentNum=1'
        }
      ],
      listClass: 'hei-p30 mt-20-r flex-row-center-center bg-fff'
    })
  },
  sliderChange: function (e, param, inst) {
    const {inputData, profile} = param
    const idx = e.target.id
    const num = idx.substr(-1,1)      //获取到ii
    const $grade = this.getElementsById(idx)      //分数
    const $gradeArrow = this.getElementsById('grade-arrow'+num)     //箭头
    $grade.data.$item.title = inputData.value
    $gradeArrow.data.$item.style = 'left: calc(100% / 11 * 2 *'+ inputData.value +');'
    $grade.update($grade.data.$item)
    $gradeArrow.update($gradeArrow.data.$item)
  },
  pageCommon: function( $current){
    const $score = this.getElementsById('score')    //列表
    const $pgbtn = this.getElementsById('pageBtn')      //按钮
    const $scoreList = $score.data.$list
    const $btn = $pgbtn.data.$list
    // $scoreList.data = $scoreList.data.map( (item, ii) => {
    //   if (item.attr.id == $current) {
    //     item.itemClass = ''
    //   }
    //   else {
    //     item.itemClass = 'none'
    //   }
    //   return item
    // })
    wx.showLoading({
      title: '加载中',
    })
    $scoreList.data = adpapterScore(datax[$current-1])
    $btn.data = $btn.data.map( (item, ii) => {
      if (ii == 0){
        item.itemClass = $current == 1 ? 'none' : 'ss-relative'
        item.tap = 'prevPage?prevNum='+($current - 1)
      }
      if (ii == 1) {
        item.tap = 'nextPage?currentNum='+$current
      }
      return item
    })

    setTimeout(function () {
      wx.hideLoading()
      $score.update($scoreList.data)
      $pgbtn.update($btn.data)
    }, 200)
  },
  isLast: false,
  nextPage: function (e, param, inst) {
    let $currentNum = parseInt(param['currentNum']) || 1
    // if ($currentNum < Math.round($scoreList.data.length / $pgSize)){
    if ($currentNum < datax.length){
      $currentNum = $currentNum + 1
      this.pageCommon($currentNum)
    }
    else {
      if (!this.isLast) {
        wx.showToast({
          title: '最后一条啦啦',
          icon: 'success',
          duration: 1000
        })
        this.isLast = true
      }
    }
    
  },

  prevPage: function (e, param, inst) {
    let $prevNum = parseInt(param['prevNum']) || 1
    if ($prevNum > 0) {
      this.pageCommon( $prevNum)
    }
  }
})