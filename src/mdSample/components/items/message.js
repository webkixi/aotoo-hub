/* 
  包含了四种类型的组件
  1 modal 
  2 tip
  3 notice
  4 alert  未做
*/
const cbody = document.body;
class Popx {
  constructor(config){
    this.config = config
    this.animation = false
    this.inst = []
    // idx = ''
    this.idxArr = []
    this.curType = 1    //1为modal   2为tip 3 为通知
    this.wrapDiv = {}   //this.wrapDiv[this.curType] 
    this.elem = {}      //this.elem[this.curType] 对应分类所有的节点集合
  }
  popup(val, ele, cb){
    if (React.isValidElement(val)) {
      return ReactDom.render(
        val,
        ele
      )
    }
  }
  
  modal(params) {
    const that = this
    this.curType = 1
    this.elem[this.curType] = typeof this.elem[this.curType] === 'undefined' ? [] : this.elem[this.curType]
    const idx = this.elem[this.curType].length 
    // this.idxArr.push(idx, this.curType)
    let cfg = null
    
    if (React.isValidElement(params)) {
      //直接传结构进来，默认只有一个蒙版
      cfg = {
        title: params,
        dot: [{title: ' ', itemClass: this.config.mask ? 'ss-modal-bg' : 'ss-modal-bg transparent', aim: this.config.bgClose ? 'onCloseBg' : ''}],
        itemClass: this.config.animation ? 'ss-modal-wrap msgbox-fade-enter-active-x' : 'ss-modal-wrap',
        onCloseBg() {
          //背景
          if (typeof that.config.cbBg === 'function') {
            that.config.cbBg.call(this, idx, that.curType)
          }
          else {
            that.close(idx, that.curType)
          }
        },
      }
    }
    else {
      let dfg = {
        type: 'normal',           //normal 提示性, options 操作性
        showClose: false,         //是否显示关闭按钮
        showFooter: false,        //是否有底部 为true时，才会出现取消，确认等按钮
        showCancel:  false,
        showConfirm: false,
        cancelText: '取消',
        confirmText: '确定',
        titleClass: '',
        bodyClass: '',
        footerClass: '',
        itemClass: '',
        width: '20%',
        cbConfirm: false,             //点击确定按钮的回调方法
        cbCancel: false,               //点击取消按钮的回调方法
        bgClose: this.config.bgClose,           //是否需要点击背景关闭弹出层
        cbBg: this.config.cbBg,                  //点击背景关闭弹出层时的回调方法
        mask: this.config.mask,    //遮盖层
        animation: this.config.mask
      }
      let opts = Object.assign({}, dfg, params)
      this.animation = opts.animation
      cfg = { 
        '@item' : {
          title: opts.title ?
            opts.showClose ? [{ title: opts.title}, {title: ' ', itemClass: 'item-close', aim: 'onClose'}]
            : [{title: opts.title}]
          : '',
          body: opts.body ? typeof opts.body === 'string' ? [{title: opts.body}] : opts.body : '',
          footer: (
            opts.showFooter ?
              [
                opts.showCancel ? {title: opts.cancelText, itemClass: 'item-btn ss-button btn-grey plain', aim: 'onClose'} : '',
                opts.showConfirm ? {title: opts.confirmText, itemClass: 'item-btn ss-button btn-default', aim: 'onConfirm'} : '',
              ]
              : ''
          ),
          bodyClass: 'item-body ' + opts.bodyClass,
          footerClass: 'item-footer ' + opts.footerClass,
          itemClass:'ss-modal item-animation ' + opts.type + ' ' + opts.itemClass,
          titleClass: 'item-header ' + opts.titleClass,
          itemStyle: opts.width ? {'width': opts.width} : ''
        },
        dot: [{title: ' ', itemClass: opts.mask ? 'ss-modal-bg' : 'ss-modal-bg transparent', aim: opts.bgClose ? 'onCloseBg' : ''}],
        itemClass: opts.animation ? 'ss-modal-wrap msgbox-fade-enter-active-x' : 'ss-modal-wrap',
        onCloseBg() {
          //背景
          if (typeof opts.cbBg === 'function') {
            opts.cbBg.call(this, idx, this.curType)
          }
          else {
            that.close(idx, this.curType)
          }
        },
        onClose(e, pm, inst) {
          //关闭按钮
          if (typeof opts.cbCancel === 'function') {
            opts.cbCancel.call(this, idx, this.curType)
          }
          else {
            that.close(idx, this.curType)
          }
        },
        onConfirm() {
          //确定按钮
          if (typeof opts.cbConfirm === 'function') {
            opts.cbConfirm.call(this, idx, this.curType)
          }
          else {
            that.close(idx, this.curType)
          }
        }
      }
    }
    const temp = ui_item(cfg)
    this.inst.push(temp)

    let iwrap = '_ss_modal_wrap'
    if (document.getElementsByClassName(iwrap).length <= 0) {
      this.wrapDiv[this.curType] = document.createElement('div')
      this.wrapDiv[this.curType].className = iwrap
      cbody.appendChild(this.wrapDiv[this.curType])
    }
    this.elem[this.curType].push({idx: idx, box: document.createElement('div')})
    this.wrapDiv[this.curType].appendChild(this.elem[this.curType][idx].box)

    this.popup(<temp.UI />, this.elem[this.curType][idx].box)
  }

  tip(params) {
    this._partCom(params, 2)
  }

  notice(params) {
    this._partCom(params, 3)
  }

  _partCom(params, type) {
    //tips and notice
    let dfg = {
      type: 'warning',        //类型 sucess fail warning
      itemClass: '',          //
      timer: 3000,             //为false的时候，不自动关闭 
      showClose: false,
      cbCancel: false,        //方法
      mask: this.config.mask,
      animation: this.config.mask,
      direction: 'right top'
    }
    let opts = Object.assign({}, dfg, params)

    const that = this
    this.curType = type
    this.elem[this.curType] = typeof this.elem[this.curType] === 'undefined' ? [] : this.elem[this.curType]
    this.wrapDiv[this.curType] = typeof this.wrapDiv[this.curType] === 'undefined' ? [] : this.wrapDiv[this.curType]
    const idx = this.elem[this.curType].length
    // this.idxArr.push(idx)
    this.animation = opts.animation


    let direCls = ''
    let noticetype = 1
    if (opts.direction.indexOf('bottom') > -1 && opts.direction.indexOf('left') > -1) {
      direCls =  ' bottom left'
      noticetype= 2
    } 
    else if (opts.direction.indexOf('bottom') > -1 && opts.direction.indexOf('right')) {
      direCls = ' bottom right'
      noticetype = 3
    }
    else if (opts.direction.indexOf('top') > -1 && opts.direction.indexOf('left')) {
      direCls = ' top left'
      noticetype = 4
    }
    else {
      direCls = ' top right'
      noticetype = 1
    }

    let isClick = false         //手动点击关闭后不执行自动关闭
    let ic = type === 2 ? 'ss-tips ' : 'ss-notice '
    let aniCls = opts.animation ? ' msgbox-fade-enter-active' : ''
    let cfg = {
      title: opts.body ? opts.showClose ? [{title: opts.title}, {title: ' ', itemClass: 'item-close', aim: 'onClose'}] : [{title: opts.title}] : opts.title,
      body: opts.body ? [{title: opts.body}] : '',
      itemClass: ic + opts.type + ' ' + opts.itemClass + aniCls,
      titleClass: 'item-header',
      bodyClass: opts.body ? 'item-body' : '',
      onClose() {
        if (typeof opts.cbCancel === 'function') {
          opts.cbCancel.call(that, idx, this.curType, noticetype)
        }
        else {
          that.close(idx, this.curType, noticetype)
        }
        isClick = true
      }
    }
    const temp = ui_item(cfg)
    this.inst.push(temp)

    
    let iwrap = type === 2 ? 'ss_tips_wrap' : 'ss_notice_wrap' + direCls
    if (document.getElementsByClassName(iwrap).length <= 0) {
      this.wrapDiv[this.curType][noticetype] = document.createElement('div')
      this.wrapDiv[this.curType][noticetype].className = iwrap
      cbody.appendChild(this.wrapDiv[this.curType][noticetype])
    }
    this.elem[this.curType].push({idx: idx, box: document.createElement('div')})
    this.wrapDiv[this.curType][noticetype].appendChild(this.elem[this.curType][idx].box)

    this.popup(<temp.UI />, this.elem[this.curType][idx].box)
    if(opts.timer !== 0) {
      let timeId = setTimeout(() => {
        !isClick ? that.close('', type, noticetype) : ''
      }, opts.timer);
      if (isClick) {
        clearTimeout(timeId)
      }
    }
  }

  close(idx, type, noticetype) {
    type = type ? type : this.curType
    let i = 0
    if (typeof idx === 'number') {
      this.elem[type].map((item, ii) => {
        item.idx === idx ? i = ii : ''
      })
    }
    if (this.animation) {
      type === 1 ? this.inst[i].addClass('msgbox-fade-leave-active-x') : this.inst[i].addClass('msgbox-fade-leave-active')
      this.inst.shift()
      setTimeout(() => {
        //延迟是为了动画先执行
        this._closeCom(type, idx, i, noticetype)
      }, 300);
    }
    else {
      this._closeCom(type, idx, i, noticetype)
    }
  }
  _closeCom(type, idx, i, noticetype = null) {
    let wrap = noticetype !== null ? this.wrapDiv[type][noticetype] : this.wrapDiv[type]
    if (typeof idx === 'number') {
      wrap.removeChild(this.elem[type][i].box)
      this.elem[type].splice(i, 1)
    }
    else {
      if (type === 1){
        wrap.remove()
        this.elem[type] = []
      }
      else {
        wrap.removeChild(this.elem[type][0].box)
        this.elem[type].shift()
      }
    }
    wrap.children.length === 0 ? wrap.remove() : ''
  }
}
export default function (params) {
  let dfg = {
    mask: true,               //遮盖层
    animation: true,          //动画 false时无动画
    bgClose: false,
    cbBg: false
  }
  let opts = Object.assign({}, dfg, params)
  return new Popx(opts)
}




// export default function (params) {
//   let dfg = {
//     type: 'normal',           //normal 提示性, options 操作性
//     showClose: false,         //是否显示关闭按钮
//     showFooter: false,        //是否有底部 为true时，才会出现取消，确认等按钮
//     showCancel:  false,
//     showConfirm: false,
//     cancelText: '取消',
//     confirmText: '确定',
//     bgClose: false,           //是否需要点击背景关闭弹出层
//     titleClass: '',
//     bodyClass: '',
//     footerClass: '',
//     itemClass: '',
//     width: '20%',
//     cbConfirm: '',             //点击确定按钮的回调方法
//     cbCancel: '',               //点击取消按钮的回调方法
//     cbBg: ''                   //点击背景关闭弹出层时的回调方法
//   }
//   let opts = Object.assign({}, dfg, params)
//   return new Popx(opts)
// }















// function Modal(props){
//   const {show, setShow} = useState({})
//   if (props.show === false) {
//     setShow({
//       show: false
//     })
//   }
//   return (
//     <div style=`display: ${show ? 'block':'none'}`>{props.children}</div>
//   )
// }
// export default function(params) {
//   const elem = document.createElement('div');
//   modalRoot.appendChild(elem);

//   const config = {
//     data: {
//       title: '',
//       itemClass: 'xxx'
//     }
//   }
//   let opts = Object.assign({}, config, params)

//   const alertTemp = function (state, props) {
    
    
//     console.log(state, props, '============ 11', React);
    
//     const temp = ui_item(state)

//     return ReactDom.createPortal(
//       <temp.UI />,
//       elem
//     )
//   };
//   console.log(opts, '======= opts');
//   let count = createComponent(opts, alertTemp);
//   return <count.UI />
// }

// 调用 tips({title: '这是一条提示', type: 'success'})

// const dft = {
//   cpType: 'tip',      //tips modal  组件类型
//   title: '默认我是tips',
//   itemClass: '',
//   type: ''        
// }
// let opts = Object.assign({}, dft, params)

// if (opts.type === 'tip') {
//   opts.itemClass = 'ss-tip ' + opts.type + ' ' + opts.itemClass
// }
// else {
//   opts.itemClass = 'ss-modal ' + opts.itemClass
// }