import createComponet, {lib, _elements, ReturnPromiseComponent, render, html} from '../ao2'
Pager.lib = lib

Pager.$$ = function (id) {
  return _elements.getElement(id)
}

/**
 * [
 *   {url: '', id: '', content: function(Pager){return Pager({...})}}  
 * ]
 */

// 根路由实例
let rootRouterInstance = null

// 当前路由实例
let curRouterInstance = null

function findPageIndex(select) {
  return (pagesPath.findIndex((pg, ii) => (ii === select || pg.id === select || pg.url === select))) || 0
}

function findPage(select) {
  if (!select) return
  let ary = select.split('?')
  select = ary[0].split('#')[0]
  let index = findPageIndex.call(this, (select || 0))
  return pagesPath[index]
}

function deletePagePath(select) {
  if (!select && select !== 0) return
  let ary = select.split('?')
  select = ary[0].split('#')[0]
  let indexPos = -1
  pagesPath.forEach((item, ii)=>{
    if (item.id === select || item.url === select) {
      indexPos = ii
    }
  })
  if (indexPos > -1) {
    pagesPath.splice(indexPos, 1)
  }
}

// 收集所有router实例的路由项信息
let pagesPath = []
let collectAllPagesPath = function(pages) {
  let thePages = pages
  thePages.forEach(function(item){
    deletePagePath(item.url)
  })
  pagesPath = pagesPath.concat(pages)
}

Pager.nav = {
  reLaunch(param){
    let url = param.url
    let pageItem = findPage(url)
    if (pageItem) {
      let routerContext = pageItem.routerContext
      curRouterInstance = routerContext
      routerContext.reLaunch(param)
    }
  },

  navigateTo: function(param) {
    let url = param.url
    let pageItem = findPage(url)
    if (pageItem) {
      let routerContext = pageItem.routerContext
      curRouterInstance = routerContext
      routerContext.navigateTo(param)
    }
  },
  
  navigateBack(){
    if (lib.isClient()) {
      window.history.go(-1)
    }
  },

  redirectTo: function(param) {
    let url = param.url
    let pageItem = findPage(url)
    if (pageItem) {
      let routerContext = pageItem.routerContext
      curRouterInstance = routerContext
      routerContext.redirectTo(param)
    }
  }, 
  
  redirectBack: function (param) {
    if (lib.isClient()) {
      window.history.go(-1)
    }
  },
}

Pager.getAllPages = function() {
  return pagesPath
}

Pager.pages = function(params=[], options={}) {
  let isrootRouter = true
  if (this.name === 'Pager') {
    pagesPath = []
  } else {
    isrootRouter = false
  }
  if (params.length) {
    let Router = require('../router').default  // 必须在此引入，否则Pager的附加方法不能传递给fakePager
    let router = Router(params, options, collectAllPagesPath)
    
    // containerInstance 卸载时执行
    lib.isClient() && router.hooks.once('__unload', function(){
      if (options.unLoad && lib.isFunction(options.unLoad)) {
        options.unLoad()
      }
    })
    
    if (!isrootRouter) {
      router.__ancestorRouter = rootRouterInstance // 路由的根路由
      router.__parentRouter = curRouterInstance  // 子路由的父级路由
    } else {
      rootRouterInstance = router
    }
    return router
  }
}


const SPLITPROPS = true
export function page(param={}) {
  if (!param.data) {
    param.data = {}
  }
  param.$$is = 'page'

  let childrenTemplate = param.template || param.children || null
  let template = function (state, props) {

    let childTemp = childrenTemplate
    if (lib.isFunction(childrenTemplate)) {
      childTemp = childrenTemplate.call(this, state, props)
    }

    return (
      <div 
        className={'page '+ (state.pageClass||props.pageClass||'')}
      >
        {lib.isFunction(childTemp.then) ? <ReturnPromiseComponent content={childTemp} /> : childTemp}
      </div>
    );
  }

  param.created = function () {
    lib.forEach(this.data, (item, ii, ky)=>{
      if (lib.isPlainObject(item)) {
        item.fromComponent = this.data.fromComponent
        item.__fromParent = this.data.__fromParent
        this.data[ky] = item
      }
    })
  }

  /** 创建page实例 */
  let instance = createComponet(param, template, SPLITPROPS)

  instance.onLoad = function(query) {
    if (lib.isFunction(this.config.onLoad)) {
      this.config.onLoad.call(this, query)
    }
  }

  instance.onShow = function() {
    if (lib.isFunction(this.config.onShow)) {
      this.config.onShow.call(this)
    }
  }

  instance.hooks.once('constructor-react-component', function (props) {
    let query = props['page-onload-query']
    if (lib.isFunction(this.onLoad)) {
      this.onLoad(query)
    }
    if (lib.isFunction(this.onShow)) {
      this.onShow() // 1、初始化时调用onShow，2、回到该页时调用(multipage模式)
    }
  })


  instance.hooks.once('onShow', function () {
    if (lib.isFunction(this.onShow)) {
      this.onShow() // 1、初始化时调用onShow，2、回到该页时调用(multipage模式)
    }
  })

  return instance
}

export default function Pager(param={}, template) {
  let temp = template || param.template || param.children
  param.template = temp
  if (!temp) {
    console.error('必须指定Pager的模板');
    return
  }
  let Page = page(param)
  // ReactDOM.render(<Page.UI />, document.getElementById('root'))
  render(<Page.UI />, 'root')
}

