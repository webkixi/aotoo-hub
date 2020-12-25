/* 
  包含了四种类型的组件
  1 modal 
  2 tip
  3 notice
  4 drawer top bottom left  right 多层
  5 alert  未做
*/

let cbody = null
class Popx {
  constructor(config){
    this.config = config
    this.animation = false
    // idx = ''
    this.idxArr = []
    this.curType = 1    //1为modal   2为tip 3 为通知
    this.wrapDiv = {}   //this.wrapDiv[this.curType] 
    this.elem = {}      //this.elem[this.curType] 对应分类所有的节点集合
    this.animationCls = null
    this.animationOutCls = null
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
    cbody = document.body;
    const that = this
    this.curType = 'modal'
    this.elem[this.curType] = typeof this.elem[this.curType] === 'undefined' ? [] : this.elem[this.curType]
    const idx = this.elem[this.curType].length
    let cfg = null
    
    if (React.isValidElement(params)) {
      //直接传结构进来，默认只有一个蒙版
      if (this.config.animation) {
        this.animationCls = ' msgbox-fade-enter-active-x'
        this.animationOutCls = ' msgbox-fade-leave-active-x'
      }
      cfg = {
        title: params,
        dot: [{title: ' ', itemClass: this.config.mask ? 'ss-modal-bg' : 'ss-modal-bg transparent', aim: this.config.bgClose ? 'onCloseBg' : ''}],
        itemClass: 'ss-modal-wrap' + this.animationCls,
        onCloseBg() {
          //背景
          if (typeof opts.cbBg === 'function') {
            opts.cbBg.call(that, that.curType, idx)
          }
          else {
            that.close(that.curType, idx)
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
        headClass: '',
        bodyClass: '',
        footerClass: '',
        modalClass: '',
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
      if (opts.animation) {
        this.animationCls = ' msgbox-fade-enter-active-x'
        this.animationOutCls = ' msgbox-fade-leave-active-x'
      }
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
          itemClass:'ss-modal item-animation ' + opts.type + ' ' + opts.modalClass,
          titleClass: 'item-header ' + opts.headClass,
          itemStyle: opts.width ? {'width': opts.width} : ''
        },
        dot: [{title: ' ', itemClass: opts.mask ? 'ss-modal-bg' : 'ss-modal-bg transparent', aim: opts.bgClose ? 'onCloseBg' : ''}],
        itemClass: 'ss-modal-wrap' + this.animationCls,
        onCloseBg() {
          //背景
          if (typeof opts.cbBg === 'function') {
            opts.cbBg.call(that, that.curType, idx)
          }
          else {
            that.close(that.curType, idx)
          }
        },
        onClose(e, pm, inst) {
          //关闭按钮
          if (typeof opts.cbCancel === 'function') {
            opts.cbCancel.call(that, that.curType, idx)
          }
          else {
            that.close(that.curType, idx)
          }
        },
        onConfirm() {
          //确定按钮
          if (typeof opts.cbConfirm === 'function') {
            opts.cbConfirm.call(that, that.curType, idx)
          }
          else {
            that.close(that.curType, idx)
          }
        }
      }
    }
    const temp = ui_item(cfg)

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
    let dfg = {
      type: 'warning',        //类型 sucess fail warning
      itemClass: '',          //
      timer: 3000,             //为false的时候，不自动关闭 
      showClose: false,
      cbCancel: false,        //方法
      mask: false,
      animation: this.config.mask,
      direction: false,
      containersClass: ''
    }
    let opts = Object.assign({}, dfg, params)
    this.animation = opts.animation

    if (opts.animation) {
      this.animationCls = ' msgbox-fade-enter-active'
      this.animationOutCls = ' msgbox-fade-leave-active'
    }

    let typeCls = opts.type
    typeCls = typeCls + this.animationCls
    let noticetype = opts.type === 'error' ? 2 : opts.type === 'success' ? 3 : opts.type === 'warning' ? 1 : 0
    this._partCom(params, 'tips', opts, typeCls, noticetype)

  }

  notice(params) {
    let dfg = {
      itemClass: '',          //
      timer: 3000,             //为false的时候，不自动关闭 
      showClose: false,
      cbCancel: false,        //方法
      mask: false,
      animation: this.config.mask,
      direction: 'right top',
      containersClass: ''
    }
    let opts = Object.assign({}, dfg, params)
    this.animation = opts.animation

    let direCls = ''
    let noticetype = 1
    if (opts.direction.indexOf('bottom') > -1 && opts.direction.indexOf('left') > -1) {
      direCls =  ' bottom left'
      noticetype = 2
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
    if (opts.animation) {
      this.animationCls = ' msgbox-fade-enter-active'
      this.animationOutCls = ' msgbox-fade-leave-active'
    }
    direCls = direCls + this.animationCls
    this._partCom(params, 'notice', opts, direCls, noticetype)
  }

  drawer(params) {
    let dfg = {
      containersClass: '',    //容器class
      itemClass: '',          //item class
      showClose: false,
      cbCancel: false,        //方法
      mask: this.config.mask,
      animation: false,
      direction: 'right',
      bgCloseSmall: false,    //用于多层抽屉时
    }
    let opts = Object.assign({}, dfg, params)
    this.animation = opts.animation
    let direCls = ''
    let noticetype = 1

    if (opts.direction.indexOf('top') > -1) {
      if (opts.animation) {
        this.animationCls = ' drawer-fade-to-bottom'
        this.animationOutCls = ' drawer-fade-out-bottom'
      }
      direCls = 'top' + this.animationCls
      noticetype = 4
    }
    else if (opts.direction.indexOf('bottom') > -1) {
      if (opts.animation) {
        this.animationCls = ' drawer-fade-to-top'
        this.animationOutCls = ' drawer-fade-out-top'
      }
      direCls = 'bottom' + this.animationCls
      noticetype = 3
    }
    else if (opts.direction.indexOf('left') > -1) {
      if (opts.animation) {
        this.animationCls = ' drawer-fade-to-right'
        this.animationOutCls = ' drawer-fade-out-right'
      }
      direCls ='left' + this.animationCls
      noticetype = 2
    }
    else {
      if (opts.animation) {
        this.animationCls = ' drawer-fade-to-left'
        this.animationOutCls = ' drawer-fade-out-left'
      }
      direCls = 'right' + this.animationCls
      noticetype = 1
    }
    this._partCom(params, 'drawer', opts, direCls, noticetype)
  }

  _partCom(params, type, opts, cls = '', noticetype = null) {
    cbody = document.body;    
    const that = this
    let iwrapClass = type !== 'drawer' ? 'ss_'+type+'_wrap ' + opts.containersClass + ' ' + opts.direction + ' ' + opts.type : 'ss_'+type+'_wrap ' + opts.containersClass + ' ' +cls            //容器类名
    let bgClass = 'ss-modal-bg'                            //容器背景
    

    this.curType = type
    this.elem[this.curType] = typeof this.elem[this.curType] === 'undefined' ? [] : this.elem[this.curType]
    this.wrapDiv[this.curType] = typeof this.wrapDiv[this.curType] === 'undefined' ? [] : this.wrapDiv[this.curType]
    
    const idx = this.elem[this.curType].length
    let cfg = type !== 'drawer' ? {
      title: opts.body ? opts.showClose ? [{title: opts.title}, {title: ' ', itemClass: 'item-close', aim: 'onClose'}] : [{title: opts.title}] : opts.title,
      body: opts.body ? [{title: opts.body}] : '',
      itemClass: opts.itemClass + ' ss-'+type +' '+ cls + (opts.type ? ' ' +opts.type : ''),
      titleClass: 'item-header',
      bodyClass: opts.body ? 'item-body' : '',
      onClose() {
        if (typeof opts.cbCancel === 'function') {
          opts.cbCancel.call(that, that.curType, idx, noticetype, opts.direction || opts.type )
        }
        else {
          that.close(that.curType, idx, noticetype, opts.direction || opts.type )
        }
      }
    } : {
      title: {
        title: opts['@item'],
        itemClass: opts.itemClass + ' ss-'+type,
      },
      dot: [{title: ' ', itemClass: opts.bgCloseSmall ? 'ss-modal-bg' : '', aim: opts.bgClose ? 'onCloseBg' : ''}],
      onClose() {
        if (typeof opts.cbCancel === 'function') {
          opts.cbCancel.call(that, that.curType, idx, noticetype)
        }
        else {
          that.close(that.curType, idx, noticetype)
        }
      },
      onCloseBg() {
        const _idx = that.wrapDiv[that.curType][noticetype].length - 1
        //背景
        if (typeof opts.cbBg === 'function') {
          opts.cbBg.call(that, that.curType, _idx, noticetype)
        }
        else {
          that.close(that.curType, _idx, noticetype)
        }
      },
      __ready() {
          var bg = document.getElementById("ss-modal-bg");
          bg.onclick=function(){
            const cur = that.wrapDiv[that.curType][noticetype]
            const _idx = type === 'drawer' ? cur.length - 1 : that.elem[that.curType][that.elem[that.curType].length - 1].idx
            cur[0].className = cur[0].className.replace(that.animationCls, that.animationOutCls)
            setTimeout(() => {
              if (typeof opts.cbBg === 'function') {
                opts.cbBg.call(that, that.curType, _idx, noticetype)
              }
              else {
                that.close(that.curType, _idx, noticetype)
              }
              if (document.getElementsByClassName(bgClass).length > 0) {
                document.getElementsByClassName(bgClass)[0].remove()
              }
            }, 500);
          }
      }
    }
    const temp = ui_item(cfg)

    if (opts.mask && document.getElementsByClassName(bgClass).length <= 0) {
      const bg = document.createElement('div')
      bg.className = bgClass
      bg.id = bgClass
      cbody.appendChild(bg)
    }
    if (type === 'drawer') {
      this.wrapDiv[this.curType][noticetype] = this.wrapDiv[this.curType][noticetype] || []
      const _idx = this.wrapDiv[this.curType][noticetype].length
      this.wrapDiv[this.curType][noticetype][_idx] = document.createElement('div')
      this.wrapDiv[this.curType][noticetype][_idx].className = iwrapClass
      cbody.appendChild(this.wrapDiv[this.curType][noticetype][_idx])

      this.popup(<temp.UI />, this.wrapDiv[this.curType][noticetype][_idx])
    }
    else {
      if (document.getElementsByClassName(iwrapClass).length <= 0) {
        this.wrapDiv[this.curType][noticetype] = document.createElement('div')
        this.wrapDiv[this.curType][noticetype].className = iwrapClass
        cbody.appendChild(this.wrapDiv[this.curType][noticetype])
      }
      this.elem[this.curType].push({idx: idx, dire: opts.direction || opts.type, box: document.createElement('div')})
      this.wrapDiv[this.curType][noticetype].appendChild(this.elem[this.curType][idx].box)
      this.popup(<temp.UI />, this.elem[this.curType][idx].box)
    }

    if (opts.timer) {
      const timerx = setInterval(() => {
        clearInterval(timerx)
        //延迟是为了动画先执行
        this.close(this.curType, idx, noticetype)
      }, opts.timer);
    }
  }

  close(type, idx, noticetype = null, dire) {
    type = type || this.curType
    let wrap = noticetype !== null ? this.wrapDiv[type][noticetype] : this.wrapDiv[type]
    // wrap.className = wrap.className +' active'
    
    if (!idx && idx != 0) {
      wrap.remove()
      this.elem[type] = []
    }
    else {
      if (type === 'drawer') {
        // wrap[idx].className = wrap[idx].className.replace(this.animationCls, this.animationOutCls)
        // setTimeout(() => {
        // }, 500);
        wrap[idx].remove()
        wrap.splice(idx, 1)
      }
      else {
        let indexs = []
        this.elem[type].map((item, ii) => {
          if (dire ? item.idx === idx && item.dire === dire : item.idx === idx) {
            item.box.children ? item.box.children[0].className = item.box.children[0].className.replace(this.animationCls, this.animationOutCls) : ''
            indexs.push(item)
          }
        })

        setTimeout(() => {
          indexs.forEach(it=>{
            let index = (()=>this.elem[type].findIndex($it=>$it.idx === it.idx))()
            if (index > -1) {
              this.elem[type].splice(index, 1)  
            }
            setTimeout(() => {
              wrap.removeChild(it.box)
            }, 100);
          })  
        }, 500);
        
        this.elem[type].length === 0 ? wrap.remove() : ''
      }
    }
  }

  closeHooks(elem, type, box, ii) {
    wrap.removeChild(item.box)
    this.elem[type].splice(ii, 1)
  }
}
export default function (params) {
  let dfg = {
    mask: true,               //遮盖层
    animation: true,          //动画 false时无动画
    bgClose: false,
    cbBg: false,
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
//   cpType: 'tips',      //tips modal  组件类型
//   title: '默认我是tips',
//   itemClass: '',
//   type: ''        
// }
// let opts = Object.assign({}, dft, params)

// if (opts.type === 'tips') {
//   opts.itemClass = 'ss-tip ' + opts.type + ' ' + opts.itemClass
// }
// else {
//   opts.itemClass = 'ss-modal ' + opts.itemClass
// }