class Table {
  constructor(props) {
  this.columns = props.columns
  this.data = props.data
  this.headClass = props.headClass
  this.contentClass = props.contentClass
  this.contentItemClass = props.contentItemClass
  this.tableClass = props.tableClass
  }
  adapterColumns(data) {
    return data.map(item => {
      return {
        title: item.title,
        itemClass: 'item-td'
      }
    })
  }
  adapterContent(data, columns) {
    function xx (res) {
      return columns.map(itemx => {
        return {
          title: res[itemx.field],
          itemClass: 'item-td'
        }
      })
    }
    return data.map(item => {
      return {
        dot: xx(item),
        itemClass: 'item-tr'
      }
    })
  }
  render() {
    const xx = {
      header: {
        dot: this.adapterColumns(this.columns),
        itemClass: 'table-head'
      },
      data: this.adapterContent(this.data, this.columns),
      listClass: 'ss-table '+ this.tableClass
    }
    return <UI_list {...xx} />
  }
}

export default function (params) {
  let dfg = {
    columns: [],
    data: [],
    headClass: '',
    contentClass: '',
    contentItemClass: '',
    tableClass: ''
  }
  let opts = Object.assign({}, dfg, params)
  return new Table(opts)
}
