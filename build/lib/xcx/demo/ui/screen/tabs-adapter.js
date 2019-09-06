//纯list
const listxFunc = (data, checkedId, checktype) => {
  // data 数据列表
  // checkedId 预留选中后的值
  // checktype 单多选
  // 单选的时候没有item.parentId
  checkedId = checkedId || {}
  return data.map( (item, ii) => {
    return {
      title: item.title,
      attr: {id: item.id, parentId: item.parentId},
      aim: 'onItemCheck?checktype='+checktype,
      itemClass: checkedId[item.parentId]
        ? checkedId[item.parentId].indexOf(item.id) > -1 
          ? 'active' 
          : ''
        : checkedId == item.id 
          ? 'active'
          : ''
    }
  })
}

const tabsFunc = (data, checkedId) => {
  return data.map( (item, ii) => {
    return {
      id: item.id,
      title: {
        title: item.title,
        itemClass: 'item-title'
      },
      content: {
        '@list': {
          $$id: item.id,
          data: listxFunc(item.list, checkedId),
          itemClass: 'item-check nopd',
        }
      }
    }
  })
}

export default {
  listxFunc,
  tabsFunc
}