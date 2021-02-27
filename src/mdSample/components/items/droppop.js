/* 
  tooltip
*/
const createComponent = ao2
const {lib} = ao2
import tooltip from 'components/items/tooltip'


class DropPop extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearchTextInput = this.handleSearchTextInput.bind(this)
  }
  checkLength(input) {
    //检查输入的长度方法，区分中英文
    var i, sum;   
    sum = 0;   
    for (i = 0; i < input.length; i++) {   
       //中英文不同的长度检测办法，英文一个字符长度，中文两个支付长度
       if ((input.charCodeAt(i) >= 0) && (input.charCodeAt(i) <= 255)) {   
          sum = sum + 1;   
       } else {   
       sum = sum + 2;   
       }   
    }   
    return sum;
  }

  onKeyup(e) {
    const _val = e.target.value
    
    if(e.keyCode === 13) {
      this.env.addValue({title: _val, id: lib.uniqueId('tagid-')})
      e.target.value = ''         //可解决input inputVal 没有置空问题
      if (this.state.pureTagType !== 2) {
        e.target.style.cssText = 'width: 4px'
      }
    }
  }
  handleSearchTextInput(e) {
    const _val = e.target.value
    this.state.inputTarge = e.target
    if (this.state.pureTagType !== 2) {
      const len = this.checkLength(_val)
      e.target.style.cssText = 'width: '+ (len * 8 +'px')
    }
    if (typeof this.env.keyupSeverValue ==='function') {
      this.env.keyupSeverValue(_val)
      this.env.changePopPosition()
    }
  }

  adapterTagStructure(data) {
    return data.map(item => {
      const id = item.id
      return {
        title: item.title,
        dot: [{
          attr: {close: true, id: id},
          aim: 'onDel?id='+id,
          itemClass: 'ss-i-block'
        }],
        itemClass: this.state.tagClass || 'ss-tag tag-grey'
      }
    })
  }
  tagStructure() {
    const that = this
    const tagList = ui_list({
      data: this.adapterTagStructure(this.state.valued),
      listClass: 'ss-list-in-block',
      itemMethod: {
        onClick(e) {
          e.stopPropagation()   
        },
        onDel(e, p, i) {
          e.stopPropagation()          
          const id = p.id
          that.env.removeValue(id)
        }
      }
    })
    return <tagList.UI />
  }

  onClick(e) {
    e.target.placeholder = ''
  }
  onBlur(e) {
    const _val = e.target.value
    e.target.placeholder = this.state.placeholder
    if (_val) {
      this.env.addValue({title: _val, id: lib.uniqueId('tagid-')})
      e.target.value = ''         //可解决input inputVal 没有置空问题
    }
  }

  render() {
    // const itc = this.state.inputVal ? ' active' : ''
    const itc = this.state.type !== 'select' ? ' tag' : ''
    const addKeyup = this.state.autoCreateTag ? {
      onKeyUp: this.onKeyup.bind(this)
    } : {}
    const onClick =  this.state.pureTagType === 2 ? {
      onClick: this.onClick.bind(this),
      onBlur: this.onBlur.bind(this)
    } : {}
    let placeholder = this.state.placeholder
    let defaultValue = JSON.stringify(this.state.inputVal) !== '{}' ? this.state.inputVal.title : ''
    let style = {}
    if (this.state.valued[0] && this.state.pureTagType !== 2) {
      placeholder = ' '
      style = {width:'4px'}
    }
    return (
      <div className={'ss-selected ' + this.state.itemClass + itc} >
        <div className='item-input-wrap' onClick={this.env.openPop}>
          {
            this.state.type !== 'select' && this.state.valued.length > 0  ? this.tagStructure() : ''
          }
          <input type='text' className={'item-click' + (this.state.pureTagType === 2 ? ' ss-tag' : '')} key={defaultValue} defaultValue={defaultValue} placeholder={placeholder} style={style} readOnly={this.state.readOnly} disabled={this.state.disabled} onChange={this.handleSearchTextInput} {...addKeyup} {...onClick} />

          {this.state.clearable ? <i className='icon-del' onClick={this.env.clearInputVal}></i> : ''}
        </div>
      </div>
    )
  }
}


const cpConfig = {
  // data: {},
  ready() {},
  xxx() {
    //从ready移过来的
    const that = this
    this.popListInst = ui_list({
      data: [[{title: '请输入关键字搜索'}]],
      listClass: 'init-data',
      abc(e, params, inst) {
        return that.onPopListItem(e, params, inst)
      }
    })
    this.popInst = tooltip({itemClass: 'nopadding', arrow: false, monitorScroll: '.router-page'})
  },
  onPopListItem(e, params, inst, status) {
    //status为true时不执行addValue
    let title, id = null
    if (JSON.stringify(params) !== '{}') {
      title = params.title
      id = params.id
    }
    else {
      title = inst.attr('title')
      id = inst.attr('id')
    }
    if(inst.hasClass('active')) {
      inst.removeClass('active')
    }
    else {
      inst.addClass('active')
    }
    if (!status) {
      this.addValue({title: title, id: id})
    }
  },
  changePopPosition() {
    //改变pop的定位，当点击的目标元素高度变化时，pop可自行调整
    let containerHeight = this.getData().inputTarge.parentElement.clientHeight
    let initContainerHeight = this.getData().initContainerHei
    if (containerHeight != initContainerHeight) {
      this.popInst.updateTop(containerHeight - initContainerHeight)
      this.setData({
        initContainerHei: containerHeight
      })
    }
  },
  onFocus() {
    let curInput = this.getData().inputTarge
    curInput.focus()
    if (this.data.type !== 'pureTag') {
      this.changePopPosition()
    }
  },
  openPop(e) {
    e.stopPropagation()
    if (this.data.type !== 'pureTag') {
      this.xxx()
    }
    const that = this
    let dom = null
    if (e.target.className.indexOf('item-input-wrap') > -1) {
      dom = e.target
      this.setData({
        inputTarge: e.target.lastElementChild,
        initContainerHei: dom.offsetHeight
      })
    }
    else {
      dom = e.target.parentElement
      this.setData({
        inputTarge: e.target,
        initContainerHei: dom.offsetHeight
      })
    }
    if (this.data.type !== 'pureTag') {
      this.popInst.showPop({dom: dom, title: <this.popListInst.UI/>, event: this.data.event})
      if (this.data.popData[0]) {
        let _newData = []
        if (this.data.onResetPopItemName){
          this.data.popData.forEach(item => {
            this.data.valued.forEach(itx => {
              if (item.attr.id === itx.id) {
                item.itemClass += ' active'
              }
            })
            _newData.push(item)
          })
          this.popListInst[this.data.onResetPopItemName] = this.popListInst.abc
        }
        else {
          
          this.data.popData.forEach(item => {
            this.data.valued.forEach(itx => {
              if (item.attr.id === itx.id) {
                item.itemClass += ' active'
              }
            })
            _newData.push(Object.assign({}, item, {aim: 'abc'}))
          })
          
        }
        setTimeout(() => {
          this.popListInst.reset({data: _newData, listClass: this.data.popListClass || 'ss-list'})
        }, 50);
      }
    }
    this.onFocus()
  },
  getVal() {
    let _val = null
    if (this.getData().type === 'select') {
     _val = this.getData().inputVal
    }
    else {
      _val = this.getData().data
    }
    return _val
  },
  clearInputVal(e) {
    e.stopPropagation()
    this.setData({
      inputVal: ''
    })
  },
  addValue(params) {
    const that = this
    const _dt = this.getData()
    if (_dt.type === 'select') {
      this.setData({
        inputVal: params
      })
    }
    else {
      let _val = _dt.valued
      if (_dt.tag === 'more' || _dt.tagSpecial === false) {
        if (_val.findIndex(item => item.id === params.id) < 0) {
          _val.push(params)
          this.setData({
            valued: _val
          }, function () {
            that.onFocus()
          })
        }
        else {
          const _newVal = _val.filter(item =>item.id !== params.id)
          this.setData({
            valued: _newVal
          }, function () {
            that.onFocus()
          })
        }
      }
      else {
        let _newVal = _val.filter(item =>item.id !== params.id)
        _newVal.push(params)
        this.setData({
          valued: _newVal,
          inputVal: {}
        })
      }
    }
    
    _dt.type === 'select' || (_dt.type === 'tag' && _dt.tag === 'sibling') ? this.popInst.hidePop('', true) : ''
  },
  removeValue(id) {
    const that = this
    const _val = this.getData().valued
    const _newVal = _val.filter(item => item.id !== id);
    if (this.data.type !== 'pureTag') {
      this.setData({
        valued: _newVal
      }, function() {
        that.popListInst ? that.changePopPosition() : ''
      })
      this.popListInst ? this.popListInst.children.forEach(item => {
        if (item.attr('id') === id) {
          this.onPopListItem('', '', item, true)
        }
      }) : ''
    }
    else {
      this.setData({
        valued: _newVal
      })
    }
  }
};

export default function (params) {
  let dft = {
    type: 'select',                               // select tag pureTag(无弹出层的enter生成tag)
    tag: 'more',                                  //more（同时多选），sibling（每次单选） 注：type='tag'时 tag才生效
    tagSpecial: false,                            // tagSpecial 点击选中值时，原有选中值删除，新选中值被放到最前面， 业务需要
    tagNum: 10,                                   //允许标签的数量 注：type='tag'时 tagNum才生效
    autoCreateTag: false,                         //是否随意生成指定的标签
    pureTagType: 1,                                   // 1 默认input， 2纯标签 注：type==='pureTag'时 pureTagType才生效
    valued: [],                                     //已经存在的值
    popData: [],
    placeholder: '请选择',
    inputVal: {},
    readOnly: true,
    disabled: false,
    event: 'click',
    itemClass: '',
    clearable: false,                               //清空选择器
    tagClass: '',       //标签class
    initContainerHei: null,         //初始内容的高度，用来区别是否超过上一次的height，从而来改变pop的定位
  }
  let opts = Object.assign({}, dft, params)
  // params.options = params ? Object.assign({}, dft.options, params.options) : params.options       //先合并bt配置，以免被覆盖
  cpConfig.data = opts
  const cp = createComponent(DropPop, cpConfig);
  return cp
}