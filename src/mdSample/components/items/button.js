const {lib} = ao2

export default function(params ={}) {
  let dft = {
    $$id: lib.uniqueId('ss-btn-'),
    title: '',
    disable: false,
    itemClass: 'ss-button',
    loading: false,
    loadType: '1', //1 文字存在 2 文字不存在
    loadClass: 'icon-loading',
    itemStyle: '',
  }

  let opts = Object.assign({}, dft, params)

  let $class = opts.itemClass
  if ($class) {
    if (!(/ ?button ?/g.test($class))) {
      opts.itemClass = 'ss-button ' + $class
    }
  }

  if (opts.loadClass) {
    if (!(/ ?loading ?/g.test($class))) {
      opts.loadClass = 'icon-loading ' + opts.loadClass
    }
  }

  opts.methods = {
    __ready(){
    },
    showLoad() {
      if (opts.loadType === '1') {
        this.update({
          title: {
            title: ' ', 
            itemClass: opts.loadClass,
          },
          dot: [{
            title: opts.title
          }]
        })
      }
      else {
        this.update({
          title: {
            title: ' ', 
            itemClass: opts.loadClass,
          }
        })
      }
    },
    hideLoad() {
      this.reset()
    }
  }
  return <UI_item {...opts}/>
}

// export default abc()