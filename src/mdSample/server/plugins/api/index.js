const fs = require('fs')
const path = require('path')

async function apiControl(ctx, next){
  const aks = ctx.aks
  let route = aks.routePath
  const isAjax = aks.isAjax()
  let body = (ctx.method === 'GET' ? ctx.query : ctx.request.body) || {}
  if (ctx.method == 'GET') {
    if (isAjax) ctx.body = await Fetcher.get(route, body)
  } else {
    ctx.body = await Fetcher.post(route, body)
  }
}

async function redirectControl(ctx, next) {
  let aks = ctx.aks
  let route = ctx.aotooRoutePath
  let apilist = Fetcher.apilist
  let body = (ctx.method === 'GET' ? ctx.query : ctx.request.body) || {}
  let redirect = body._redirect_
  if (ctx.method == 'GET') {
    let isAjax = aks.isAjax()
    if (isAjax) ctx.body = await Fetcher.get(redirect, ctx.query)
  } else {
    ctx.body = await Fetcher.post(redirect, ctx.request.body)
  }
}

async function docsControl(ctx, next) {
  let aks = ctx.aks
  let route = ctx.aotooRoutePath
  let body = (ctx.method === 'GET' ? ctx.query : ctx.request.body) || {}
  let filename = body.filename
  let md = await requireMarkdown(filename, true)
  ctx.body = md
}

// 自定义路由  
export default function(aks, app){

  // 前端通过 Fetcher.get 或者 Fetcher.post 向node端发起资源请求
  // await Fetcher.get('/api/test')  查看configs/default中的apis字段
  aks.routepreset('/api', {
    customControl: apiControl
  })

  // 前端通过Fetcher.get发起远程资源请求
  // await Fetcher.get('http://www.baidu.com')
  aks.routepreset('/_redirect_', {
    customControl: redirectControl
  })

  aks.routepreset('/docs', {
    customControl: docsControl
  })
}
