const createComponent = ao2
const {lib} = ao2

function Tabs(state, props) {
  
  const pCls = state.position === 'left' ? ' row' : ' column'
  const allshowCls = !state.allShow ? ' box-disN' : ''
  const containerClass = 'tabs-container' +(' ' +state.containerClass) + pCls + allshowCls
  
  return (
    <View className={containerClass} id={state.id}>
      {state.menus.length > 0 ? <state.menusInst.UI /> : '' }
      {state.content.length > 0 ? <state.contentInst.UI /> : '' }
      {state.footer ? <UI_item {...state.footer} /> : ''}
    </View>
  )
}

const cpConfig = {
  attached() {
    const that = this
    this.eachItemHeight = []
    const menusData = this.data.menus.length > 0 ? this._adapaterData(this.data.menus) : []
    const contentData = this.data.content.length > 0 ? this._adapaterData(this.data.content) : []

    const menusInst = ui_list({
      data: menusData,
      listClass: 'tabsMenus'+(' ' +this.data.menusClass),
      header: this.data.menusHeader|| '',
      footer: this.data.menusFooter|| '',
      itemMethod: {
        onClick(e, parmas, inst) {
          const id = inst.attr('id')
          if (!inst.hasClass('disabled')) {
            that.data.menusInst.select({attr: {id: id}})
            that.data.contentInst.select({attr: {id: id}})
            if (that.data.assignJump && that.data.allShow) {
              const _idx = id.substr(id.length - 1, 1)
              that._jump(_idx)
            }
          }
        }
      },
      methods: this.data.menusMethods    
    })
    const contentInst = ui_list({
      data: contentData,
      listClass: 'tabsBoxes'+(' ' +this.data.contentClass)
    })
    
    this.setData({
      menusInst: menusInst,
      contentInst: contentInst
    })
  },
  ready() {
    this.data.menusInst.select(this.data.select)
    this.data.contentInst.select(this.data.select)
    if (this.data.assignJump) {
      
      this._scroll()
    }
  },
  _scroll() {
    const that = this
    this._getEachItemHeight()
    let oldIdx = 0
    $('#'+this.data.id +' .tabsBoxes').scroll(function (e) {
      let scrolltop = $(this).scrollTop()
      that.eachItemHeight.forEach((item, ii) => {
        if (ii > 0) {
          if (scrolltop > (item * ii)) {
            if (oldIdx != ii) {
              that.data.menusInst.select(ii)
              oldIdx = ii
            }
          }
        }
        else {
          if (oldIdx != ii) {
            that.data.menusInst.select(ii)
          }
        }
      })
    })
  },
  _getEachItemHeight() {
    let that = this
    let dom = document.getElementById(this.data.id);
    let jump = dom.querySelectorAll('.tabsBoxes>.item')
    that.eachItemHeight = []
    jump.forEach((item, ii) => {
      that.eachItemHeight.push(item.offsetHeight)
    })
  },
  _jump(index) {
    // 获取有指定位置的元素
    let dom = document.getElementById(this.data.id);
    let scrollDom = dom.querySelector('.tabsBoxes')
    // 获取需要滚动的距离，即元素在滚动的什么位置
    let sT = 0
    let jump = dom.querySelectorAll('.tabsBoxes>.item')
    jump.forEach((item, ii) => {
      if (ii < index){
        sT += item.offsetHeight
      }
    })
    scrollDom.scrollTop = sT
    },
  _adapterItem(item, length) {
    if (item.disabled) {
      item.itemClass += ' disabled'
    }
    //给item attr 一个标识
    if (!item.attr) {
      item.attr = {}
      item.attr.id = 'tabs-'+length
    }
    else if (!item.attr.id) {
      item.attr.id = 'tabs-'+length
    }
    return item
  },
  _adapaterData(data) {
    return data.map((item, ii) => {
      return this._adapterItem(item, ii)
    })
  },
  appendItem(params) {
    const that = this
    const {menus, content} = params
    const _newMenus = this._adapterItem(menus,  this.data.menusInst.getData().data.length)
    const _newContent = this._adapterItem(content, this.data.contentInst.getData().data.length)
    this.data.menusInst.append(_newMenus)
    this.data.contentInst.append(_newContent, function() {
      that._getEachItemHeight()
    })
  },
  deleteItem(_idx) {
    const that = this
    this.data.menusInst.remove(_idx)
    this.data.contentInst.remove(_idx, function() {
      that._getEachItemHeight()
    })
  },
  getDataLength() {
    const num = this.data.contentInst.getData().data.length
    return num
  },
  changeSort(sort) {
    this.setData({
      position: sort,
      menusInst: this.data.menusInst,
      contentInst: this.data.contentInst,
    })
  },
  removeDisabled(_idx) {
    let menusInst = this.data.menusInst
    let parmas = null
    menusInst.forEach(item => {
      if (item.attr('id') === 'tabs-'+_idx) {
        item.removeClass('disabled')
      }
    })
  }
}



export default function (params) {
  let dft = {
    id: lib.uniqueId('tabs'),
    disabled: false,          //禁止某一菜单的点击事件，为下标
    select: 0,
    position: 'top',          //top, left, top为上下结构， left为左右结构
    allShow: false,
    assignJump: false,        //指定跳转 allShow 为true时，生效
    containerClass: '',
    menusClass: '',
    contentClass: '',
    menus: [],
    menusInst: null,
    content: [],
    contentInst: null,
    footer: null,             //组件底部 由item构成
  }
  let opts = Object.assign({}, dft, params)
  cpConfig.data = opts
  const cp = createComponent(cpConfig, Tabs);
  return cp
}
