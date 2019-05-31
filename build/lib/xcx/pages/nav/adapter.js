const adapterNav = (res, idx) => {
  return res.map( (item, ii) => {
    return {
      title: [
        {
          title: ' ',
          itemClass: (item.attrx == 'index') ? 'item-icon icon-index' : 'item-icon icon-about'
        },
        {
          title: item.title,
          itemClass: 'item-title'
        }
      ],
      titleClass: (idx == ii) ? 'item active' : 'item',
      tap: 'onNav?nav='+item.attrx
    }
  })
}
export default adapterNav