/* 
  tooltip
*/

let cbody = null
class Popx {
  constructor(config){
    this.config = config
    this.chekcedElemBound = null
    this.direction = null
  }
  _comPopConent(val, ele, cb){
    if (React.isValidElement(val)) {
      return ReactDom.render(
        val,
        ele
      )
    }
  }
  changeAutoDire(chekcedElemBound, posElemBound, bodyElemBound, _newCfg) {
    //通过当前元素 弹出元素 以及 body元素 等来自动改变弹出层的方向
    // console.log('======================= tooltip c p b', chekcedElemBound, posElemBound, bodyElemBound);
    if (_newCfg.direction.indexOf('right') > -1) {
      if (bodyElemBound.width - (chekcedElemBound.right + chekcedElemBound.width) < posElemBound.width && ((chekcedElemBound.right + posElemBound.width) >  bodyElemBound.width)) {
        _newCfg.direction = _newCfg.direction.replace('right', 'left')
      }
      if ((posElemBound.height * 2) < bodyElemBound.height || ((posElemBound.width - chekcedElemBound.left) * 2) < bodyElemBound.height) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.height - chekcedElemBound.top) < posElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (chekcedElemBound.top + posElemBound.height) > bodyElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('left') > -1) {
      if (chekcedElemBound.left < posElemBound.width) {
        _newCfg.direction = _newCfg.direction.replace('left', 'right')
      }
      if ((posElemBound.height * 2) < bodyElemBound.height) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.height - chekcedElemBound.top) < posElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (chekcedElemBound.top + posElemBound.height) > bodyElemBound.height) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('top') > -1) {
      if (chekcedElemBound.top < posElemBound.height) {
        _newCfg.direction = _newCfg.direction.replace('top', 'bottom')
      }
      if (((posElemBound.width - chekcedElemBound.left) * 2) < bodyElemBound.width) {
        if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.width - chekcedElemBound.left) < posElemBound.width) {
          _newCfg.direction = _newCfg.direction.replace('start', 'end')
        }
        else if (_newCfg.direction.indexOf('end') > -1 && (chekcedElemBound.left + posElemBound.width) > bodyElemBound.width) {
          _newCfg.direction = _newCfg.direction.replace('end', 'start')
        }
      }
    }
    else if (_newCfg.direction.indexOf('bottom') > -1) {
      if (chekcedElemBound.bottom > bodyElemBound.height) {
        _newCfg.direction = _newCfg.direction.replace('bottom', 'top')
      }
      if (((posElemBound.width - chekcedElemBound.left) * 2) < bodyElemBound.width) {
      if (_newCfg.direction.indexOf('start') > -1 && (bodyElemBound.width - chekcedElemBound.left) < posElemBound.width) {
        _newCfg.direction = _newCfg.direction.replace('start', 'end')
      }
      else if (_newCfg.direction.indexOf('end') > -1 && posElemBound.width > chekcedElemBound.left) {
        _newCfg.direction = _newCfg.direction.replace('end', 'start')
      }
      }
    }
  }
  show(params) {
    const that = this
    cbody = document.body;
    const _newCfg = Object.assign({}, this.config, params)
    _newCfg.itemClass = 'item_tooltip ' + _newCfg.itemClass
    const checkedElem = _newCfg.checkedEvent
    const chekcedElemBound = checkedElem.target.getBoundingClientRect()       //点击元素
    this.chekcedElemBound = chekcedElemBound
    const bodyElemBound = cbody.getBoundingClientRect()                       //body元素

    const temp = ui_item(_newCfg)                                             //弹出层内容
    const iconSize = _newCfg.width || 10
    const halfIconSize = (iconSize / 2)

    let iwrap = _newCfg.containerClass
    if (document.getElementsByClassName(iwrap).length > 0) {
      document.getElementsByClassName(iwrap)[0].remove()
    }
    const tooltipDiv = document.createElement('div')
    tooltipDiv.className = iwrap
    cbody.appendChild(tooltipDiv)
    this._comPopConent(<temp.UI />, tooltipDiv)
    
    const posElemBound = tooltipDiv.getBoundingClientRect()                          //弹出元素
    let _top, _left, _arrowTop, _arrowLeft = ''
    const _height = posElemBound.height > chekcedElemBound.height ? posElemBound.height - chekcedElemBound.height : chekcedElemBound.height - posElemBound.height       //计算弹出元素
    const _width = posElemBound.width > chekcedElemBound.width ? posElemBound.width - chekcedElemBound.width : chekcedElemBound.width - posElemBound.width       //计算弹出元素
    
    
    //需要通过各种元素自动改变弹出方向，可调用以下方法
    // console.log('========= show', chekcedElemBound, _newCfg.direction);
    this.changeAutoDire(chekcedElemBound, posElemBound, bodyElemBound, _newCfg)
    tooltipDiv.setAttribute('data-dire', _newCfg.direction)

    if (_newCfg.direction.indexOf('top') > -1) {
      _top = chekcedElemBound.y - posElemBound.height - iconSize
      _left = chekcedElemBound.x - (_width / 2)
      _arrowLeft = '--arrowLeft: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('left') > -1) {
      _top = chekcedElemBound.y - (_height / 2)
      _left = chekcedElemBound.x - posElemBound.width - iconSize
      _arrowTop = '--arrowTop: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('right') > -1) {
      _top = chekcedElemBound.y - (_height / 2) 
      _left = chekcedElemBound.x + chekcedElemBound.width + iconSize
      _arrowTop = '--arrowTop: calc(50% - '+halfIconSize+'px)'
    }
    else if (_newCfg.direction.indexOf('bottom') > -1){
      _top = chekcedElemBound.y + chekcedElemBound.height + iconSize
      _left = chekcedElemBound.x - (_width / 2)
      _arrowLeft = '--arrowLeft: calc(50% - '+halfIconSize+'px)'
    }

    if (_newCfg.direction.indexOf('start') > -1) {
      if (_newCfg.direction.indexOf('left') > -1 || _newCfg.direction.indexOf('right') > -1) {
        _arrowTop = '--arrowTop: ' + parseInt((chekcedElemBound.height / 2) - halfIconSize)+ 'px;'
        _top = chekcedElemBound.y
      }
      else {
        _arrowLeft = '--arrowLeft:' +parseInt((chekcedElemBound.width / 2) - halfIconSize) +'px;'
        _left = chekcedElemBound.x
      }
    }
    if (_newCfg.direction.indexOf('end') > -1) {
      if (_newCfg.direction.indexOf('left') > -1 || _newCfg.direction.indexOf('right') > -1) {
        _arrowTop = '--arrowTop: ' + parseInt((chekcedElemBound.height / 2) - halfIconSize)+ 'px;'
        _top = chekcedElemBound.y - _height
      }
      else {
        _arrowLeft = '--arrowLeft:' + parseInt((chekcedElemBound.width / 2) - halfIconSize) +'px;'
        _left = chekcedElemBound.x - _width
      }
    }

    let sty = "--top: " + parseInt(_top) + "px;--left: " + parseInt(_left) + 'px; ' + (_arrowTop ? _arrowTop : '') + (_arrowLeft ? _arrowLeft : '')
    tooltipDiv.style = sty
    this.direction = _newCfg.direction
  }
  hide(e) {
    //判断不同方向离开时，离开的方向是否是弹出层的方向 如果是就不执行关闭
    if ((this.direction.indexOf('right') > -1 && e.clientX < this.chekcedElemBound.right) || (this.direction.indexOf('left') > -1 && e.clientX > this.chekcedElemBound.left) || (this.direction.indexOf('top') > -1 && e.clientY > this.chekcedElemBound.top) || (this.direction.indexOf('bottom') > -1 && e.clientY < this.chekcedElemBound.bottom)) {
      let iwrap = this.config.containerClass
      if (document.getElementsByClassName(iwrap).length > 0) {
        document.getElementsByClassName(iwrap)[0].remove()
      }
    }
  }
}
export default function (params) {
  let dfg = {
    title: '',
    content: '',
    direction: 'bottom',
    isValidElement: false,
    itemClass: '',
    containerClass: 'ss_tooltip'
  }
  let opts = Object.assign({}, dfg, params)
  return new Popx(opts)
}