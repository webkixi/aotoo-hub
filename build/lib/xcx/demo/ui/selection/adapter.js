//左边tree结构
const chioseCityAdapter = (data, hotData) => {
  // let tabsTitle = ['热门','A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let outputParent = []
  let outputChild = []
  data.map( (item, ii) => {
    outputParent.push({
      title: {
        title: item.parentId,
        itemClass: 'color-primary mtb-20-r ss-block'
      },
      id: item.parentId,    //为了scroll-into-view
      idf: item.parentId,
    })
    outputChild.push({
      title: {
        title: item.navTitle,
        itemClass: 'color-active size18 lhei-60-r'
      },
      itemClass: 'ptb-20-r bb-default',
      parent: item.parentId,
    })
  })
  if (hotData.length > 0) {
    hotData.map(item => {
      outputChild.unshift( {
        title: {
          title: item.navTitle,
          itemClass: 'btn-fff-grey btn-br-small',
        },
        parent: 'hot',
      })
    })
    outputParent.unshift( {
      title: {
        title: '热门',
        itemClass: 'mtb-20-r ss-block color-grey'
      },
      id: 'hot',      //为了scroll-into-view
      idf: 'hot',
      liClass: 'list-grid-3'
    })
  }
  //去重
  var hash = {}
  outputParent = outputParent.reduce(function(item, next) {
      hash[next.idf] ? '' : hash[next.idf] = true && item.push(next);
      return item
  }, [])
  let output = outputParent.concat(outputChild)
  return output
}

//右边list结构，
const clickCityAdapter = (data, hotData) => {
  let output = []
  data.map( (item, ii) => {
    output.push({
      title: item.parentId,
      idf: item.parentId,
      tap: 'onClickCityMenu?id='+item.parentId
    })
  })
  if (hotData.length > 0) {
    output.unshift( {
      title: '热门',
      tap: 'onClickCityMenu?id=hot'
    })
  }
  //去重
  var hash = {}
  output = output.reduce(function(item, next) {
      hash[next.idf] ? '' : hash[next.idf] = true && item.push(next);
      return item
  }, [])
  return output
}

const selectionAdapter = (data) => {
  return {
    title: {
      '@tree': {
        $$id: 'scrollcitylist',
        data: chioseCityAdapter(data.list, data.hotList),
        type: {
          id: 'xxx',
          is: 'scroll',
          'scroll-y': true,
          'scroll-into-view': 'scorllLocaltion',
          'bindscroll': 'onScroll?x=0'
        },
        listClass: 'size16 hei-p100 selection-scroll',
      },
      '@list': {
        $$id: 'clickcitymenu',
        data: clickCityAdapter(data.list, data.hotList),
        listClass: 'wid-60-r ss-center color-primary mt-20-r ss-fixed-r lhei-50-r',
        itemClass: 'size12'
      }
    },
    itemClass: 'selection-body bg-fff pl-default-r'
  }
}

export default {
  selectionAdapter
}




// const selectionAdapter = (data) => {
//   return data.map(item => {
//     return {
//       title: item.title,
//       content: {
//         '@tree': {
//           data: chioseCityAdapter(item.list, item.hotList),
//           listClass: 'size16 wid-p95'
//         },
//         '@list': {
//           data: clickCityAdapter(item.list, item.hotList),
//           listClass: 'wid-60-r ss-center size12 color-primary mt-20-r ss-fixed-r lhei-50-r'
//         },
//       }
//     }
//   })
// }