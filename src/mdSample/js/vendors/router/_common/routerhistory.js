import {lib} from '../../ao2'


// savehistory后，从localstorage中恢复历史记录
export function restoreRouterHistory(historyStorage) {
  let MYJSX = null
  this.history = historyStorage.map(async (item, ii) => {
    let url = item.url
    let ourl = item.ourl
    let $query = item.$query
    let time = item.time
    let multipage = item.multipage
    let navPages = item.navPages

    let selectPageItem = null
    let selectPageContent = null
    // let selectPageItem = item.selectPageItem
    // let selectPageContent = item.selectPageContent

    let index = this.findPageIndex.call(this, url)
    selectPageItem = this.pages[index]
    selectPageContent = selectPageItem.content
    if (lib.isPromise(selectPageContent)) {
      let res = await selectPageContent
      selectPageContent = res.default || res
    }

    // 历史记录最后一条
    // 合并$query和页面location.search
    if (ii === (historyStorage.length - 1)) {
      let search = location.search
      if (search) {
        search = 'tmp' + search
        let res = lib.urlTOquery(search)
        $query = Object.assign({}, $query, res.query)
      }
    }

    let {
      JSX,
      ContainerInstance,
      rootId
    } = renderUI.call(this, {
      $query,
      selectPageItem,
      selectPageContent
    })

    if (ContainerInstance) {
      this.ContainerInstance = ContainerInstance
      this.ContainerInstance.multipage = multipage
    }

    if (ii === (historyStorage.length - 1)) {
      MYJSX = JSX
      this.selectUrl = url
      this.selectIndex = index
      this.selectPageItem = selectPageItem
    }

    // 分隔符 #
    if (this.sep) {
      this.hooks.emit('__pushstate', {
        url,
        ourl,
        $query,
        title: selectPageItem.title || '',
        id: selectPageItem.id,
        time
      })

      if (navPages.length) {
        navPages.forEach(state=>{
          this.hooks.emit('__pushstate', {
            url: state.url,
            ourl: state.ourl,
            $query: state['$query'],
            title: state.title||'',
            id: state.id,
            time: state.time
          })
        })
      }
    }

    return {
      id: selectPageItem.id,
      index: this.selectIndex,
      url,
      ourl,
      title: selectPageItem.title || '',
      ContainerInstance,
      selectPageItem,
      time,
      multipage,
      navPages
    }
  })
  return MYJSX
  // this.render(MYJSX, 'root')
  // console.log(this.history, '======= uuuu');
}

// 多页历史存储
// 多页是基于单页的基础之上，叠加若干子页面
function multipageHistory(result, options) {
  let {
    url,
    ourl,
    $query,
  } = options

  let {
    selectPageContent,
    selectPageItem,
    rootId
  } = result

  let lastHisotry = this.history[(this.history.length - 1)]
  lastHisotry.multipage = true
  lastHisotry.navPages = [].concat((lastHisotry.navPages||[])).concat({
    id: selectPageItem.id,
    index: this.selectIndex,
    url,
    ourl,
    $query,
    title: selectPageItem.title||'',
    selectPageItem,
    time: options.time
  })
  this.history[(this.history.length - 1)] = lastHisotry


  let lastHisotryStorage = this.historyStorage[(this.historyStorage.length-1)]
  lastHisotryStorage.multipage = true
  lastHisotryStorage.navPages = lastHisotry.navPages
  this.historyStorage[(this.history.length - 1)] = lastHisotryStorage


  // 分隔符 #
  if (this.sep) {
    this.hooks.emit('__pushstate', {
      url,
      ourl,
      $query,
      title: selectPageItem.title || '',
      id: selectPageItem.id,
      time: options.time
    })
  }
}

// 后退时historyStorage同步history
export function memeryHistoryStorageBack(){
  if (this.ContainerInstance.multipage) {
    let lastOne = this.history[(this.history.length - 1)]
    let lastOneStorage = this.historyStorage[(this.history.length - 1)]
    let navPages = lastOne.navPages || []
    let multipage = lastOne.multipage
    lastOneStorage.multipage = multipage
    lastOneStorage.navPages = navPages
    this.historyStorage[(this.history.length - 1)] = lastOneStorage
  } else {
    this.historyStorage.pop()
  }
}


// 单页历史存储
export function memeryHistory(result, options={}){
  options.time = (new Date()).getTime()
  if (!result.ContainerInstance && this.ContainerInstance.multipage) {
    multipageHistory.call(this, result, options)
    return
  }

  let {
    url,
    ourl,
    $query,
    selectPageItem,
    selectPageContent
  } = options
  
  let {
    JSX,
    ContainerInstance,
    rootId
  } = result

  this.history.push({ 
    ContainerInstance: (ContainerInstance||this.ContainerInstance),
    id: selectPageItem.id,
    index: this.selectIndex,
    url,
    ourl,
    $query,
    title: selectPageItem.title || '',
    selectPageItem,
    selectPageContent,
    time: options.time
  })

  // 将history存储到storage，考虑到storage不能存储实例，将关键数据存储起来
  // 该数据用于重构history的container实例
  // save/restore方法将使用此数据
  this.historyStorage.push({
    id: selectPageItem.id,
    index: this.selectIndex,
    url,
    ourl,
    $query,
    title: selectPageItem.title||'',
    selectPageItem: {id: selectPageItem.id, title: selectPageItem.title||''},
    selectPageContent: result.selectPageContent,
    time: options.time
  })


  // 分隔符 #
  if (this.sep) {
    this.hooks.emit('__pushstate', {
      url,
      ourl,
      $query,
      title: selectPageItem.title||'',
      id: selectPageItem.id,
      time: options.time
    })
  }
}

export function findHistoryIndex(query={}) {
  return lib.findIndex(this.history, query)
}

export function findHistoryItem(query={}) {
  let history = this.history
  let index = findHistoryIndex.call(this, query)
  if (index || index>-1) {
    return  history[index]
  }
}