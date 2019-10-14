//单个更新，适用于数据过大
const selectionAdapter = (data) => {
  let output = []
  let outputIdf = []
  data.map( item => {
    let cfrl = item.cfrl.toUpperCase()
    if(JSON.stringify(outputIdf).indexOf(JSON.stringify(cfrl))==-1){
      outputIdf = {
        title: cfrl,
        itemClass: 'color-primary ss-block ss-sticky ptb-20-r bg-fff ml-20-r'
      }
      // outputIdf.push({
      //   title: {
      //     title: cfrl,
      //     itemClass: 'color-primary ss-block ss-sticky ptb-20-r bg-fff ml-20-r'
      //   },
      //   idf: cfrl,     
      //   idx: cfrl,      //此处的id只为了重新排序
      //   liClass: 'pl-default-r'
      // })
    }
    output.push({
      title: {
        title: item.cname,
        itemClass: 'color-active size18 lhei-60-r'
      },
      // parent: cfrl,
      idx: cfrl,        //此处的id只为了重新排序
      itemClass: 'ptb-20-r bb-default ',
    })
  })
  // const res = outputIdf.concat(output).sort((a, b) => a.idx.charCodeAt(0) - b.idx.charCodeAt(0))
  return {
    dot: [
      {
        title: outputIdf,
        li: output,
        liClass: 'pl-default-r'
      }
    ]
    // '@item': {
    //   title: outputIdf,
    //   li: output,
    //   liClass: 'pl-default-r'
    // }
  }
}
//全部更新
const selectionAllAdapter = (data, data2) => {
  return data.map(item => {
    const kk = data2.filter(itemx => {
      if (itemx.cfrl == item) {
        return itemx
      }
    })
    return selectionAdapter(kk)
  })
}
export default {
  selectionAdapter,
  selectionAllAdapter
}
