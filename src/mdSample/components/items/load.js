const {lib} = ao2
class Load {
  constructor(params) {
    this.config = params
    this.emptyDiv = null
  }
  popup(val, ele, cb){
    if (React.isValidElement(val)) {
      return ReactDom.render(
        val,
        ele
      )
    }
  }
  show() {
    const opts = {
      title: this.config.title,
      itemClass: this.config.itemClass
    }
    const temp = ui_item(opts)
    const ele = this.config.innerEle.indexOf('#') > -1 ? document.getElementById(this.config.innerEle.substr(1)) : document.getElementsByClassName(this.config.innerEle.substr(1))[0]
    const loadcls = '_ss_load'

    this.emptyDiv = document.createElement('div')
    this.emptyDiv.className = loadcls
    ele.appendChild(this.emptyDiv)
    this.popup(<temp.UI />, this.emptyDiv)

    if (this.config.absolute) {
      setTimeout(() => {
        this.hide()
      }, this.config.timer || 3000);
    }
  }
  hide() {
    this.emptyDiv.remove()
  }
}

export default function(params) {
  let dft = {
    $$id: lib.uniqueId('ss-load-'),
    title: '',
    itemClass: 'load-01',
    html: true,       //两个形式，一种是直接在结构上添加load 一种是通过点击事件触发添加load
    innerEle: '.container',     //指定在某个元素下 限id或class
    absolute: false,
    timer: false
  }
  let opts = Object.assign({}, dft, params)
  let $class = opts.itemClass
  let $absoluteCls = opts.absolute ? ' item-absolute' : ''
  if ($class) {
    opts.itemClass = 'ss-load ' + $class + $absoluteCls
  }
  if (opts.html) {
    return <UI_item {...opts} />
  }
  else {
    return new Load(opts)
  }
}