const nav = Pager.nav
const {lib, render, inject} = ao2

let item = ui_item({
  title: 'fjdkflsf'
})

// vueDemo输出的样式与js作为微服务为当前服务提供静态资源
Fetcher.get('http://localhost:8500/mapper').then(res=>{
  let statics = res.data
  inject.css([
    statics.origin+'/css/'+'common.css',
    statics.origin+'/css/'+'index.css',
  ], ()=> {
    inject.js([
      statics.origin+`/js/vendors.js`,
      statics.origin+`/js/index.js`,
    ])
  })
})

render(<item.UI />, 'root')