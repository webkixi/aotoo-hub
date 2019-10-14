//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const simulationScore = [
  { title: '您喜欢吃苹果么', type: '喜好', level_list: ["不喜欢", "还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 }] },
  { title: '您喜欢吃香蕉么', type: '口味', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 }] },

  { title: '您喜欢吃梨么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },

  { title: '您喜欢吃葡萄么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },

  { title: '您喜欢吃火龙果么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },
  { title: '您喜欢吃番石榴么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },

  { title: '您喜欢吃柠檬么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },

  { title: '您喜欢吃荔枝么', type: '喜好', level_list: ["不喜欢","还行","特么喜欢"], checklist: [{ "title": "不喜欢", "value": 1 }, { "title": "不喜欢", "value": 1.5 }, { "title": "不喜欢", "value": 2 }, { "title": "还行", "value": 2.5 }, { "title": "还行", "value": 3 }, { "title": "特么喜欢", "value": 3.5 }, { "title": "特么喜欢", "value": 4 }, { "title": "特么喜欢", "value": 4.5 }, { "title": "特么喜欢", "value": 5 } ] },
]


let datax = []
const $pgSize = 2
for(var i=0; i <simulationScore.length; i+= $pgSize){
  datax.push(simulationScore.slice(i, i+$pgSize));
}

const adpapterScore = (data, param) => {
  // let pgNum = 1   //
  const {total, current_page} = param
  function checklistFunc(res, type) {
    return res.map( (item, ii) => {
      return {
        title: {
          title: type == 'number' ? item.value : item,
          attr: type == 'number' ? {title: item.title} : {},
          itemClass: ii != 0 ? 'flex-row-center-center hei-70-r bl-default': 'flex-row-center-center hei-70-r'
        }
      }
    })
  }
  
  return data.map( (item, ii) => {
    return {
      title: [
        {
          '@item': {
            $$id: 'grade-num'+ii,
            title: '1',
            attr: {type: item.type, current_page: current_page * 2 - 1 + ii ,total: total, score_list: item.checklist},            
            itemClass: 'size28'
          },
          itemClass: "fw-bold color-minor wid-160-r hei-p100 flex-row-center-center"
        },
        {
          title: [
            {
              title: item.type+' '+(current_page * 2 - 1 + ii)+'/'+total,
              itemClass: 'size11 color-grey'
            },
            {
              title: item.title,
              itemClass: 'size16 color-000'
            }
          ],
          titleClass: 'flex-column-center hei-p100',
          itemClass: 'flex-1 bl-default hei-166-r pl-30-r'
          // itemClass: 'flex-1 bl-default hei-166-r pl-30-r flex-row-center'
        },
      ],
      body: [
        {
          li: checklistFunc(item.level_list),
          liClass: 'flex-row-center next-flex-1 bb-default bt-default bg-fff color-grey size11',
        },
        {
          '@item': {
            $$id: 'grade-arrow'+ii,
            title: ' ',
            style: 'left: 0px',
            itemClass: 'icon-arror-top-solid absolute',
          },
          li: checklistFunc(item.checklist, 'number'),
          liClass: 'flex-row-center next-flex-1 bb-default size13 color-666',
          itemClass: 'ss-relative bg-ececec'
        }
      ],
      footer: [
        {
          '@form': {
            $$id: 'grade-x'+ii,
            data: [
              {
                title: '',
                input: {
                  type: 'slider',
                  id: 'grade'+ii,
                  value: 1,
                  max: 5,
                  step: 0.5,
                  min: 1,
                  bindchange: 'sliderChange',
                  'block-size': 24,
                  'block-color': '#fff',
                  'slider-left': 60,
                  activeColor: '#C10000',
                  itemClass: 'score-padding'
                },
              }
            ],
            itemClass: 'plr-20-r'
          }
        }
      ],
      // attr: {id: ii > pgSize * pgNum ? pgNum = pgNum + 1 : pgNum},
      titleClass: 'flex-row hei-166-r bt-default bg-fff',
      itemClass: 'mb-20-r bb-default'
    }
  })
}
Pager({
  data: {
    score: Pager.list({
      data: adpapterScore(datax[0],{total: 8, current_page: 1}),
      itemClass: 'mb-20-r',
      listClass: 'hei-p70'
    }),
    pageBtn: Pager.list({
      data: [
        {
          title: {
            title: ' ',
            itemClass: 'icon-arrow-right-circle icon-left small score-absolute',
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
  storeData: {},
  sliderChange: function (e, param, inst) {
    const {inputData, profile} = param
    const idx = e.target.id
    const num = idx.substr(-1,1)      //获取到ii
    const $gradeNum = this.getElementsById('grade-num'+num)      //分数
    const $gradeArrow = this.getElementsById('grade-arrow'+num)     //箭头
    let val =  inputData.value - 1
    $gradeNum.update({title: inputData.value.toString()})
    $gradeArrow.update({style: 'left: calc(100% / 9 * 2 *'+ val +')'})

  },
  pageCommon: function( $current){
    const that = this
    const $score = this.getElementsById('score')    //列表
    const $pgbtn = this.getElementsById('pageBtn')      //按钮
    const $sliderCx = this.getElementsById('grade-num0')    //滑动1   
    const $sliderCx2 = this.getElementsById('grade-num1')    //滑动2 
    const $gradeArrow = this.getElementsById('grade-arrow0')     //箭头
    const $gradeArrow2 = this.getElementsById('grade-arrow1')     //箭头
    const $grade = this.getElementsById('grade-x0')     //split
    const $grade2 = this.getElementsById('grade-x1')     //split

    const $scoreList = $score.data.$list
    const $btn = $pgbtn.data.$list
    wx.showLoading({
      title: '加载中',
    })
    $scoreList.data = adpapterScore(datax[$current-1], {total: 8, current_page: $current})
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
      $score.update(adpapterScore(datax[$current-1], {total: 8, current_page: $current}))
      $pgbtn.update($btn.data)
      //把存储的数据 赋值到对应的值里,点击下一步时，如果是第一次点击是没有值的，只有点击上一步再点击下一步，才有值
      if (that.storeData['item'+($current * 2 - 1)]){
        const value1 = that.storeData['item'+($current * 2 - 1)].value
        const value2 = that.storeData['item'+($current * 2)].value
        const valueG1 = value1
        const valueG2 = value2
        
        $sliderCx.update({title: value1.toString()})
        $sliderCx2.update({title: value2.toString()})
        $gradeArrow.update({style: 'left: calc(100% / 9 * 2 *'+ valueG1 +')'})
        $gradeArrow2.update({style: 'left: calc(100% / 9 * 2 *'+ valueG2 +')'})
        $grade.value('grade0', value1.toString())
        $grade2.value('grade1', value2.toString())
      }
    }, 200)
  },
  isLast: false,
  nextPage: function (e, param, inst) {
    let $currentNum = parseInt(param['currentNum']) || 1
    let $sliderCx = this.getElementsById('grade-num0')    //滑动1   
    let $sliderCx2 = this.getElementsById('grade-num1')    //滑动2  

    let $sliderCxTitle = Number(this.getElementsById('grade-num0').getData().title)   //滑动1   
    let $sliderCxTitle2 = Number(this.getElementsById('grade-num1').getData().title)    //滑动2  

    if ($currentNum < datax.length){
      this.storeData['item'+$sliderCx.getData().attr.current_page] = $sliderCx.getData().attr.score_list.find(item=> item.value == $sliderCxTitle)
      this.storeData['item'+$sliderCx2.getData().attr.current_page] = $sliderCx2.getData().attr.score_list.find(item=> item.value == $sliderCxTitle2)
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