import createComponet, {lib} from '../../ao2'
import { RouterContainer } from "./routerpart";
import { getRenderPage } from "./routerpage";

let routerEventType = 'redirect'
let roruterPages = {}

export function setRouterEventType(evt, ctx){
  if (ctx) {
    ctx.routerEventType = evt
  } else {
    routerEventType = evt
  }
}

export function getRouterEventType(ctx){
  if (ctx) {
    return ctx.routerEventType
  } else {
    return routerEventType
  }
}

export function setRouterMultiPages(pageInstance){
  let id = pageInstance.id
  roruterPages[id] = pageInstance
}

export function getRouterMultiPages(id){
  if (id) return roruterPages[id]
  return roruterPages
}

export function getRenderContainer(opts){
  let that = this
  let {$query, selectPageItem, selectPageContent} = opts
  let containerClass = this.containerClass
  let pageInst = getRenderPage.call(this, {$query, selectPageItem, selectPageContent})

  let template = function(state, props) {
    let PageInstance = pageInst
    let curQuery = this.currentQuery
    let goBack = props.goBack
    let Page = goBack ? <PageInstance.UI data={this.data} page-onload-query={curQuery}/>
    : <PageInstance.UI page-onload-query={curQuery}/>

    let layout = state.layout
    let header = state.header
    let footer = state.footer
    let subHeader = null;
    let subFooter = null;
    if (layout === 2) {
      subHeader = header
      subFooter = footer
      header = null
      footer = null
    }

    // let contents = [].concat(Page).map((p, ii)=>React.cloneElement(p, {key: 'page_'+ii}))
    let contents = [].concat(Page).map((p, ii)=>p)
    let routerItems = ui_list({
      $$id: this.uniqId+'_router_items',
      data: contents,
      header: subHeader,
      footer: subFooter,
      itemClass: 'router-item',
      listClass: 'router-page',
      didUpdate(){
        let runtimePageItem = that.selectPageItem.runtime
        let success = runtimePageItem.param && runtimePageItem.param.success
        let $data = this.getData().data
        if ($data.length) {
          success && lib.isFunction(success) && success()
        }
      }
      // type: 'expose'
    })

    this.routerItems = routerItems
    let body = routerItems.render()

    return (
      <RouterContainer 
        containerClass={containerClass}
        header={header} 
        footer={footer} 
        menus={state.menus} 
        content={body}
        myref={this.ref}
      />
    )
  }

  const containerConfig = {
    data: {
      $$id: this.uniqId + '_container',
      layout: this.layout,
      header: this.header,
      footer: this.footer,
      menus: this.menus,
      attachContent: [],
      contents: [opts],
    },
    currentQuery: $query,
    onReady(){
      that.hasMounted = true
      if (lib.isFunction(that.config.onReady)) {
        that.config.onReady.call(that)
      }
    },
    resetItems(param){
      this.routerItems.reset([param])
    },
    detached(){
      that.hasMounted = false
      that.hooks.fire('__unload')
    },
    push(param){
      let routerItems = this.routerItems
      routerItems.append(param, function () {
        let len = routerItems.length()
        let index = len - 1
        routerItems.select(index)
      })
    },
    pull(cb){
      let lastOne = that.history[(that.history.length-1)]
      let navPages = lastOne.navPages||[]
      let lastPage = navPages[(navPages.length-1)] || lastOne
      // let lastPage = navPages[(navPages.length-1)]
      let pageId = lastPage.id
      let inst = getRouterMultiPages(pageId)
      this.routerItems.pop(function(){
        if (lib.isFunction(cb)) cb()
        if (inst) {
          setTimeout(()=>{
            inst.onShow && inst.onShow()
          }, 50);
        }
      })
    }
  }

  let ContainerInstance = null
  let item = this.history[this.history.length - 1]
  if (this.ContainerInstance && this.ContainerInstance.multipage) {
    let container = item.ContainerInstance
    let detached = pageInst.detached
    pageInst.detached = function(){
      setTimeout(() => roruterPages[pageInst.id] = null, 50);
      detached.call(this)
    }
    setRouterMultiPages(pageInst)
    container.push(
      <pageInst.UI page-onload-query={$query}/>
    )
  } else {
    if (this.ContainerInstance){
      this.ContainerInstance.multipage = false
      this.ContainerInstance.resetItems(
        <pageInst.UI page-onload-query={$query}/>
      )
    } else {
      // ContainerInstance = createComponet(containerConfig, template, true)
      ContainerInstance = createComponet(containerConfig, template)
    }
    // ContainerInstance = createComponet(containerConfig, template)
  }
  return ContainerInstance
}