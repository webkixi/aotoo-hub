import createComponet, {lib, _elements, render, html, ReturnPromiseComponent} from '../ao2'
import Pager, { page } from "../page";
import md5 from "md5";

import {
  getRenderContainer,
  setRouterEventType,
  getRouterEventType
} from "./_common/routercontainer";

import {
  restoreRouterHistory,
  memeryHistory,
  memeryHistoryStorageBack,
  findHistoryIndex,
  findHistoryItem
} from "./_common/routerhistory";

const ROUTERHOOKS = lib.hooks('router-hooks')
const ROUTERSTOREHOOKS = lib.hooks('router-store-hooks', true)
const Loading = ReturnPromiseComponent

if (lib.isClient()) {
  require('./_common/popstate').default(ROUTERHOOKS)
}

// 是否为嵌套路由
// 在路由页面中调用路由
function isChildRouter(params) {
  let pagesPath = Pager.getAllPages()
  return pagesPath.length ? true : false
}

function genarateRouterUniqId(){
  let pages = this.pages
  let urlstr = pages.reduce((p, n)=>{
    let url = n.url
    return p+url
  }, '')
  return md5(urlstr)
}

function genarateReallyPages(params) {
  let config = this.config
  return params.map((pageItem, ii)=>{
    let pageConfig = null
    let pageUrl = pageItem.url
    let pageContent = pageItem.content.default || pageItem.content
    let pageId = pageItem.id || (pageUrl.replace(/[\.\/\\]/g, ''))

    if (lib.isFunction(pageContent) || lib.isPromise(pageContent) || React.isValidElement(pageContent)) {
      pageConfig = pageContent
    }

    pageItem.routerContext = this
    pageItem.id = pageId
    pageItem.index = ii
    pageItem.content = pageConfig
    pageItem.rootId = pageItem.rootId || 'dom_' + pageId
    // pageItem.query = {...}  // onLoad接收参数
    return pageItem
  })
}

// 路由容器UI
function renderUI({$query, selectPageItem, selectPageContent}) {
  const ContainerInstance = getRenderContainer.call(this, {$query, selectPageItem, selectPageContent})
  
  // navigateTo 导航返回值
  // 多页
  if (!ContainerInstance) {
    return {
      selectPageContent,
      selectPageItem,
      rootId: 'root'
    }
  }

  // redirectTo 导航返回值
  const JSX = <ContainerInstance.UI />
  return {
    JSX,
    ContainerInstance,
    selectPageContent,
    selectPageItem,
    rootId: 'root'
  }
}

class Route {
  history = []
  historyStorage = []
  
  constructor(config) {
    let that = this
    let oriConfig = lib.cloneDeep(config)
    this.config = config
    this.config.root = this.config.root || 'root'
    this.oriConfig = oriConfig
    this.oriPages = oriConfig.pages
    this.pages = genarateReallyPages.call(this, config.pages)
    // this.uniqId = lib.uniqueId('route_')
    this.uniqId = genarateRouterUniqId.call(this)
    this.hooks = lib.hooks(this.uniqId)
    this.sep = config.sep || '#' // 默认路由分隔符
    this.maxAge = config.maxAge || 2 * 60 * 1000  // 默认路由存储localStorage最大时长
    this.isChildRouter = isChildRouter()  // 窗口路由，Pager.pages子页面使用Pager.pages生成的窗口路由
    if (this.isChildRouter) {
      this.sep = '' // 窗口路由不走window.history接口
    }
    this.containerClass = config.containerClass || config.routerClass || ''
    this.ContainerInstance = null  // 当前路由实例
    this.history = []
    this.historyStorage = []
    this.hasMounted = false


    this.header = config.header
    this.footer = config.footer
    this.menus = config.menus
    this.layout = config.layout || 1


    let _select = config.select
    if (lib.isNumber(_select)) {
      let pageItem = this.pages[_select]
      _select = pageItem.url
    }

    if (lib.isString(_select)) {
      let {url, query, hasQuery} = lib.urlTOquery(_select)
      // _select = url
      this.selectPageItemConfigQuery = query // 从浏览器地址栏传递过来的数据
    }

    let historyList = this.restoreHistory()
    this.routerPrepare()
    // this.select = _select

    this.UI = function(props={}) {
      let dft = {
        loadingClass: 'router-loading',
        content: (()=>{
          return new Promise((resolve, reject)=>{
            that.hasMounted = true
            that.hooks.once('render-ui', function(param){
              resolve(param.JSX)
            })
          })
        })()
      }
      let target = Object.assign({}, dft, props)
      return <Loading {...target}/>
    }

    if (lib.isClient()) {
      if (historyList) {
        let JSX = restoreRouterHistory.call(this, historyList)
        this.render(JSX, this.config.root)
      } else {
        this.redirectTo({
          url: _select
        })
      }
    }
  }

  getCurrentPages(){
    return this.selectPageItem
  }

  findPageIndex(select) {
    return (this.pages.findIndex((pg, ii) => (ii === select || pg.id === select || pg.url === select))) || 0
  }

  switchSelect(select, ourl){
    this.selectUrl = select || this.select
    this.selectOurl = ourl
    this.selectIndex = this.findPageIndex((select||this.select))
    this.selectPageItem = this.pages[this.selectIndex]
  }

  routerPrepare(){
    let that = this
    function getHistoryItem(time){
      let index = findHistoryIndex.call(that, {time})
      let historyIndex = index - 1 // 取上一个
      return findHistoryItem.call(that, historyIndex)
    }

    function setPopstateTime(time){
      let historyItem = getHistoryItem(time)
      that.popstateTime = (historyItem && historyItem.time) || that.popstateTime || 0
    }

    if (lib.isClient()) {
      this.popstateTime = 0
      ROUTERHOOKS.once('__goback', (e) => {
        if (e.state) {
          // let id = e.state.id
          // let curId = this.selectPageItem.id
          if (this.popstateTime === 0) {
            setPopstateTime(e.state.time)
            this._redirectBack()
          } else {
            if (e.state.time >= this.popstateTime) {
              // this.popstateTime = e.state.time  // 前进
            } else {
              setPopstateTime(e.state.time)
              this._redirectBack()
            }
          }
        } else {
          window.history.go(-1)
        }
      })
  
      this.hooks.once('__pushstate', (param)=>{
        if (lib.isClient()) {
          let query = param.$query
          let url = param.url
          let ourl = param.ourl
          let title = param.title
          if (this.sep) {
            if (this.sep === '#') {
              let hash = location.hash
              if (hash === url) return
            }
            url = this.sep + ourl
            window.history.pushState(param, title, url)
          }
          // window.history.replaceState(param, title, url)
        }
      })
    }

    function _redirectBack(opts){
      if (this.ContainerInstance.multipage) {
        let lastOne = this.history[(this.history.length-1)]
        let navPages = lastOne.navPages||[]
        if (navPages.length) {
          let curContainer = lastOne.ContainerInstance
          let curPage = navPages.pop()
          if (navPages.length) {
            let lastPage = navPages[(navPages.length-1)]
            this.switchSelect(lastPage.url, lastPage.ourl)
          } else {
            this.switchSelect(lastOne.url, lastOne.ourl)
          }
          lastOne.multipage = navPages.length ? true : false
          lastOne.navPages = navPages
          this.history[(this.history.length - 1)] = lastOne
          curContainer.pull(this.config.goback)
        } else {
          this.ContainerInstance.multipage = false
          _redirectBack.call(this)
          return
        }
      } else {
        let prevPage = this.history[(this.history.length-2)]
        if (prevPage) {
          let curPage = this.history.pop()
          this.switchSelect(prevPage.url, prevPage.ourl)
          let options = {
            url: prevPage.url,
            $query: prevPage.$query,
            selectPageItem: prevPage.selectPageItem,
            selectPageContent: prevPage.selectPageContent
          }

          // if (prevPage.multipage && prevPage.navPages && prevPage.navPages.length) {
          //   this.ContainerInstance.multipage = true
          // } else {
          //   this.ContainerInstance.multipage = false
          // }

          renderUI.call(this, options)
          let goback = this.config.goback // 后退后
          if (lib.isFunction(goback)) {
            goback()
          }


          // let curPage = this.history.pop()
          // this.switchSelect(prevPage.url)
          // let ContainerInstance = prevPage.ContainerInstance
          // this.ContainerInstance = ContainerInstance
          // let JSX = <ContainerInstance.UI goBack={true} />
          // this.render(JSX, 'root')
          // curPage.ContainerInstance.destory()
          
        } else {
          let parentRouter = this.__parentRouter
          if (parentRouter) {
            parentRouter.routerPrepare()
            parentRouter._redirectBack()
          }
        }
      }
      memeryHistoryStorageBack.call(this)
    }

    function _onPageReady(pageInst) {
      // 实时同步pageInstance的state数据
      // 在restore时保证数据为最新数据
      let that = this
      let syncTimmer = null
      pageInst.hooks.once('sync-state-data', function (data) {
        clearTimeout(syncTimmer)
        syncTimmer = setTimeout(() => {
          let historyStorage = that.historyStorage
          let lastHistoryStorageItem = historyStorage[historyStorage.length - 1]
          lastHistoryStorageItem.selectPageContent.data = data
          historyStorage[historyStorage.length - 1] = lastHistoryStorageItem
        }, 200);
      })
    }

    Object.defineProperty(this, "_redirectBack", lib.protectProperty(_redirectBack.bind(this)));
    Object.defineProperty(this, "onPageReady", lib.protectProperty(_onPageReady.bind(this)));
  }

  clearHistory() {
    this.history = []
    ROUTERSTOREHOOKS.removeItem('router-history-data')
  }

  saveHistory() {
    if (lib.isClient()) {
      // 只将历史数据存储2分钟
      // 基于使用场景(两个不同子域名的站之间访问)，一般都是快速交换数据，此时间间隔应该很短促
      // 超时将不予恢复
      ROUTERSTOREHOOKS.setItem('router-history-data', this.historyStorage, this.maxAge)
    }
  }

  restoreHistory() {
    if (lib.isClient()) {
      let historyStorage = ROUTERSTOREHOOKS.getItem('router-history-data')
      if (historyStorage) {
        return historyStorage
      }
    }
  }

  reLaunch(param){
    setRouterEventType('reLaunch', this)
    this.clearHistory()
    this.redirectTo(param)
  }

  async navigateTo(param){
    setRouterEventType('navigate', this)
    this.ContainerInstance.multipage = true
    this.redirectTo(param, true)
  }

  navigateBack(){
    setRouterEventType('navigateBack', this)
    this.ContainerInstance.multipage = true
    this.redirectBack(null, true)
  }


  /**
   * 
   * 跳转页面
   * @param {Object} param 参考小程序，未实现success，faile，event
   * 当页面跳转完成，将当前页数据推送至history变量
   * 是否推送至window.history，取决于this.sep
   */
  async redirectTo(param={}, delegate){
    if (!delegate) {
      setRouterEventType('redirect', this)
      this.ContainerInstance && (this.ContainerInstance.multipage = false)
    }
    let that = this
    let url = param.url
    let success = param.success
    let fail = param.fail
    let complete = param.complete
    let events = param.events
    let beforeNav = param.beforeNav || param.beforenav || this.config.beforeNav || this.config.beforenav // 路由前

    let res = lib.urlTOquery(url)
    let $hasQuery = res.hasQuery
    let $url = res.url
    let $query = $hasQuery ? res.query : {}

    let from = this.selectPageItem || {}

    // 相同路由地址+多开路由 不跳转
    // if ((this.ContainerInstance && this.ContainerInstance.multipage === true) &&
    // ($url === this.selectUrl || url === this.selectUrl)) {
    //   return
    // }

    // if ((this.ContainerInstance && !this.ContainerInstance.multipage) && 
    // ($url === this.selectUrl || url === this.selectUrl)) {
    //   return 
    // }

    if ($url === this.selectUrl && url === this.selectOurl) {
      return
    }
    this.switchSelect($url, url)
    this.selectPageItem.runtime = {
      param,
      query: $query,
    }

    let selectPageItem = this.selectPageItem
    let selectPageContent = selectPageItem.content
    let selectPageItemQuery = selectPageItem.query || {}
    if (!selectPageContent) {
      console.error('请正确指定page页内容!');
      return 
    }

    $query = Object.assign({}, selectPageItemQuery, this.selectPageItemConfigQuery, $query)
    let options = {
      url: $url,
      ourl: url,
      $query,
      selectPageItem,
      selectPageContent
    }

    let result = null
    if (lib.isPromise(selectPageContent)) {
      let res = await selectPageContent
      options.selectPageContent = res.default || res
    }

    function next(opts) {
      return navto(opts)
    }

    function navto(opts){
      options = Object.assign({}, options, opts)
      result = renderUI.call(that, options)
  
      let {
        JSX,
        ContainerInstance
      } = result
  
      // 路由初始化
      // 路由初始化时没有ContainerInstance
      if (ContainerInstance) {
        that.ContainerInstance = ContainerInstance
        that.ContainerInstance.multipage = false
      }
  
      // 清空从浏览器传过来的query数据
      that.selectPageItemConfigQuery = {}
  
      // history存储
      let evtType = getRouterEventType(that)
      if (that.isChildRouter) {
        if (evtType === 'navigate') {
          memeryHistory.call(that, result, options)
        }
      } else {
        memeryHistory.call(that, result, options)
      }
  
      // multipage为true时 不会返回JSX
      if (JSX) {
        if (!that.isChildRouter) {
          return that.render(JSX, that.config.root)
        } else {
          function render_ui(){
            if (that.hasMounted) {
              that.hooks.fire('render-ui', {JSX})
            } else {
              setTimeout('render_ui', 50);
            }
          }
          render_ui()
        }
      }
    }

    beforeNav = beforeNav || selectPageItem.beforeNav || selectPageItem.beforenav
    if (lib.isFunction(beforeNav)) {
      return beforeNav(options, from, next) // beforeNav(to, from, next)
    } else {
      return navto()
    }
  }

  redirectBack(options, delegate) {
    if (!delegate) setRouterEventType('redirectBack', this)
    if (lib.isClient() && this.sep) {
      window.history.go(-1)  // 该动作将触发popstate事件
    } else {
      this._redirectBack(options)
    }
  }

  render(pageJSX, rootId){
    if (this.isChildRouter) {
      let UI = this.UI
      if (UI) return <UI />
    }
    if (lib.isNode()) {
      return render(pageJSX)
    }
    if (lib.isClient()) {
      render(pageJSX, this.config.root)
    }
  }
}

export default function Router(params=[], options, collectAllPagesPath) {
  let param = {
    pages: params,
    ...options
  }
  let instance = new Route(param)
  collectAllPagesPath(instance.pages) //搜集所有路由的页面数据
  if (lib.isNode()) {
    return instance.redirectTo({
      url: options.select
    })
  }
  return instance
}