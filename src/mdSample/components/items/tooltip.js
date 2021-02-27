/* 
  tooltip
*/
const createComponent = ao2
const {lib} = ao2

const cpConfig = {
  ready() {
    
    this.domBound = null
    this.direction = null
    this.autoRemoveContainer = true
    this.tooltipDiv = null
    this.tooltipDivTop = null
    this.isBody = true
    this.containerClass = null
    if (this.data.monitorScroll) {
      this._windownScroll(this.data.monitorScroll)
    }
    
  },
  _windownScroll(ele) {
    const that = this
    const top = $(ele).scrollTop()
    let scrolltop=0, oldSt=0; 
    if (this.isBody) {
      $(ele).scroll(function(e) {
        scrolltop = $(this).scrollTop();
        if (oldSt <= scrolltop) {
          //向下滚
          that.updateTop(-(scrolltop - oldSt))
        } else {
          //向上滚
          that.updateTop(oldSt- scrolltop)
        }
        setTimeout(function() {
          oldSt = scrolltop;
        }, 0);
      })
    }
  },
  _comPopConent(val, ele, cb){
    if (React.isValidElement(val)) {
      return ReactDom.render(
        val,
        ele
      )
    }
  },
  _changeAutoDire(domBound, posElemBound, bodyElemBound, _newCfg) {
    //通过当前元素 弹出元素 以及 body元素 等来自动改变弹出层的方向
    if (_newCfg.direction.indexOf('right') > -1) {
      if (bodyElemBound.width - domBound.right < (posElemBound.width + domBound.width)) {
        _newCfg.direction = _newCfg.direction.replace('right', 'left')
      }
      if ((posElemBound.height * 2) < bodyElemBound.height || ((posElemBound.width - domBound.left) * 2) < bodyElemBound.height) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.height - domBound.top) < posElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (domBound.top + posElemBound.height) > bodyElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('left') > -1) {
      if (domBound.left < posElemBound.width) {
        _newCfg.direction = _newCfg.direction.replace('left', 'right')
      }
      if ((posElemBound.height * 2) < bodyElemBound.height) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.height - domBound.top) < posElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (domBound.top + posElemBound.height) > bodyElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('top') > -1) {
      if (domBound.top < posElemBound.height) {
        _newCfg.direction = _newCfg.direction.replace('top', 'bottom')
      }
      if (((posElemBound.width - domBound.left) * 2) < bodyElemBound.width) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.width - domBound.left) < posElemBound.width) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (domBound.left + posElemBound.width) > bodyElemBound.width) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('bottom') > -1) {
      if ((domBound.bottom + posElemBound.height) > bodyElemBound.height) {
        _newCfg.direction = _newCfg.direction.replace('bottom', 'top')
      }
      if (((posElemBound.width - domBound.left) * 2) < bodyElemBound.width) {
      if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.width - domBound.left) < posElemBound.width) {
        _newCfg.direction = _newCfg.direction.replace('start', 'end')
      }
      else if (_newCfg.direction.indexOf('end') > -1 && posElemBound.width > domBound.left) {
        _newCfg.direction = _newCfg.direction.replace('end', 'start')
      }
      }
    }
  },
  showPop(params) {
    // this._createDiv()
    const that = this
    const _newCfg = Object.assign({}, this.data, params)
    _newCfg.itemClass = 'item_tooltip ' + _newCfg.itemClass
    this.setData(_newCfg)

    let _top, _left, _arrowTop, _arrowLeft, _topVal, _leftVal, bodyX, domParent = ''
    const dom = _newCfg.dom
    bodyX = document.body
    domParent = _newCfg.isBody === true ? bodyX : dom.parentElement     //pop生成在点击事件的同级，也就是点击元素的父级下
    const domBound = dom.getBoundingClientRect()                              //点击元素
    const bodyElemBound = domParent.getBoundingClientRect()                       //body元素
   
    
    //判断弹出层是在点击的元素下 还是元素外body里的
    if (_newCfg.isBody === true) {
      _topVal = domBound.y
      _leftVal = domBound.x
      
    }
    if (_newCfg.event === 'click') {
      //给body添加一个点击事件
      bodyX.addEventListener('click', (e) => {
        let isHasVal = false
        e.path.find((value, i) => {
          if (value.className && value.className.indexOf(_newCfg.containerClass) > -1) {
            isHasVal = true
          }
        })
        if (!isHasVal) {
          that.hidePop(e, true)
        }
      })
    }
    else {
      //鼠标移开pop自动关闭
      _newCfg.onMouseLeave = 'onPopLeave'
      _newCfg.methods = {
        onPopLeave(e, p, i) {
          that.hidePop(e, true)
        }
      }
    }
    
    let iwrap = _newCfg.containerClass
    if (document.getElementsByClassName(iwrap).length > 0 && _newCfg.autoRemoveContainer) {
      document.getElementsByClassName(iwrap)[0].remove()
    }
    let tooltipDiv = document.createElement('div')
    tooltipDiv.className = iwrap
    // tooltipDiv.id = lib.uniqueId('ss-pop-')
    domParent.appendChild(tooltipDiv)
    this._comPopConent(<this.UI />, tooltipDiv)
    
    let posElemBound = tooltipDiv.getBoundingClientRect()  
    const iconSize = _newCfg.iconWid || 6
    const halfIconSize = (iconSize / 2)
    const _height = posElemBound.height > domBound.height ? posElemBound.height - domBound.height : domBound.height - posElemBound.height       //计算弹出元素
    const _width = posElemBound.width > domBound.width ? posElemBound.width - domBound.width : domBound.width - posElemBound.width       //计算弹出元素
    
    //执行下面的方法通过弹出的范围不够时可进行方向的调整 _changeAutoDire
    // this._changeAutoDire(domBound, posElemBound, bodyX.getBoundingClientRect(), _newCfg)

    //通过传进来的参数 来显示弹出的位置,除了上下左右，另外支持弹出的层是在点击元素的上方 还是中间 还是下方 默认都是中间
    if (_newCfg.direction.indexOf('top') > -1) {
      _top       = _topVal ? _topVal - (posElemBound.height + iconSize): - (posElemBound.height + iconSize)
      _left      = _leftVal ? _leftVal - ((posElemBound.width - domBound.width) / 2) : - ((posElemBound.width - domBound.width) / 2)
      _arrowLeft = '--arrowLeft: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('left') > -1) {
      _top      = _topVal ? _topVal - (_height / 2) : -(_height / 2)
      _left     = _leftVal ? _leftVal - (posElemBound.width + iconSize) : -(posElemBound.width + iconSize)
      _arrowTop = '--arrowTop: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('right') > -1) {
      _top      = _topVal ? _topVal - (_height / 2) : -(_height / 2)
      _left     = _leftVal ? _leftVal + (domBound.width + iconSize) : (domBound.width + iconSize)
      _arrowTop = '--arrowTop: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('bottom') > -1){
      _top       = _topVal ? _topVal + domBound.height + iconSize : (domBound.height + iconSize)
      _left      = _leftVal ? _leftVal - ((posElemBound.width - domBound.width) / 2) : -((posElemBound.width - domBound.width) / 2)
      _arrowLeft = '--arrowLeft: calc(50% - '+halfIconSize+'px)'
    }

    if (_newCfg.direction.indexOf('start') > -1) {
      if (_newCfg.direction.indexOf('left') > -1 || _newCfg.direction.indexOf('right') > -1) {
        _arrowTop = '--arrowTop: ' + parseInt((domBound.height / 2) - halfIconSize)+ 'px;'
        _top = _topVal ? _topVal : 0
      }
      else {
        _arrowLeft = '--arrowLeft:' +parseInt((domBound.width / 2) - halfIconSize) +'px;'
        _left = _leftVal ? _leftVal : 0
      }
    }
    if (_newCfg.direction.indexOf('end') > -1) {
      if (_newCfg.direction.indexOf('left') > -1 || _newCfg.direction.indexOf('right') > -1) {
        _arrowTop = '--arrowTop: ' + parseInt((domBound.height / 2) - halfIconSize)+ 'px;'
        _top = _topVal ? _topVal - (_height) : -(_height)
      }
      else {
        _arrowLeft = '--arrowLeft:' + parseInt((domBound.width / 2) - halfIconSize) +'px;'
        _left = _leftVal ? _leftVal - _width : -(_width)
      }
    }

    let popMinWid = _newCfg.minWid || domBound.width
    let sty = "--minwid:"+parseInt(popMinWid) +"px;--top: " + parseInt(_top) + "px;--left: " + parseInt(_left) + 'px; ' + (_arrowTop ? _arrowTop : '') + (_arrowLeft ? _arrowLeft : '')
    this.direction = _newCfg.direction
    this.autoRemoveContainer = _newCfg.autoRemoveContainer
    this.containerClass = _newCfg.containerClass
    this.isBody = _newCfg.isBody
    this.domBound = domBound
    tooltipDiv.setAttribute('data-arrow', _newCfg.arrow)     //通过设置data-dire来决定弹出方式时箭头的方法
    tooltipDiv.setAttribute('data-dire', _newCfg.direction)     //通过设置data-dire来决定弹出方式时箭头的方法
    tooltipDiv.style = sty
    this.tooltipDiv = tooltipDiv
    this.tooltipDivTop = _top
  },
  hidePop(e, autoClose = false) {
    const {onBodyCb, direction, domBound} = this.data
    //判断不同方向离开时，离开的方向是否是弹出层的方向 如果是就不执行关闭
    if (autoClose || (direction.indexOf('right') > -1 && e.clientX < domBound.right) || (direction.indexOf('left') > -1 && e.clientX > domBound.left) || (direction.indexOf('top') > -1 && e.clientY > domBound.top) || (direction.indexOf('bottom') > -1 && e.clientY < domBound.bottom)) {
      let iwrap = this.containerClass
      if (document.getElementsByClassName(iwrap).length > 0) {
        if (this.autoRemoveContainer) {
          typeof onBodyCb === 'function' ? onBodyCb.call(this) : ''
          document.getElementsByClassName(iwrap)[0].remove()
        }
      }
    }
  },
  updateTop(val) {
    this.tooltipDivTop = this.tooltipDivTop + val
    let sty = "--top: "+parseInt(this.tooltipDivTop) +'px'
    this.tooltipDiv.style = this.tooltipDiv.style.cssText + sty
  }
}
class Popx extends React.Component {
  filterObj(obj, arr) {
		if (typeof (obj) !== "object" || !Array.isArray(arr)) {
			throw new Error("参数格式不正确")
		}
		const result = {}
		Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
			result[key] = obj[key]
		})
		return result
	}
  render() {
    const params = this.filterObj(this.state, ['title', 'body', 'footer', 'dot', 'itemClass', 'titleClass', 'bodyClass', 'footerClass'])
    const abc = ui_item(params)
    return <abc.UI/>
  }
}


export default function (params) {
  let dfg = {
    isBody: true,      //false（点击元素的同级下） , true(body下)
    autoRemoveContainer: true,
    title: '',
    itemClass: '',
    direction: 'bottom start',
    isValidElement: false,
    containerClass: 'ss_tooltip',
    event: 'hover',         //hover click
    minWid: false,          //可手动设置弹出层的宽度
    arrow: true,             //为false时 _arrowTop ， _arrowLeft 无效
    monitorScroll: false,   //监听滚动，分为 1 false/2 'window'/3 指定class，注：当body height: 100%等时 window.onscrll无效，需要指定class
    // assignElem: ''      //isBody为false的时候下起作用
  }
  let opts = Object.assign({}, dfg, params)
  cpConfig.data = opts
  const cp = createComponent(Popx, cpConfig);
  // const cp = createComponent(cpConfig, cpTemplate);
  return cp
  // return new Popx(opts)
}



// const config = {
//   title: '',
//   ready(){},
//   show(){}
// }

// const template = function(state, props) {
//   return <></>
// }

// const xxx = createComponent(config, template)


// function Pop(props) {

//   const [s, setS] = useState(false)

//   React.useEffect(()=>{
//     console.log('====== ready')
//     return function(){
//       console.log('====== willUnMount');
//       console.log('====== componentDidUpdate');
//     }
//   })

//   return (
//     <div className=`pop-container ${s}`>1234</div>
//   )
// }

// return {
//   show(){
//     createDiv
//     inertPop
//   }

// }
