# pager

pager是路由实例的封装方法，我们使用`Pager`来构建SPA页面而不直接使用路由或者路由实例

### Pager.pages

该方法用于定义路由表，及路由页面配置  

#### 语法

```js
Pager.pages(items, options)
```

#### items

路由表数组

`item.url`  
{String}  
路由地址，该条路由的ID，必须指定唯一值，地址栏的hash部分将显示该值

`item.content`  
{Function}  
指定路由子页内容，支持全量引入(require)，支持按需引入(import)  

#### options

`options.sep`  
{String}  
默认为`#`，置为空则转为内存路由

`options.header`  
{[JSX|Function]}  
配置路由页面的头部，支持JSX，或者item组件配置  

`options.footer`  
{[JSX|Function]}  
配置路由页面的底部，支持JSX，或者item组件配置  

`options.menus`  
{JSX|Function}  
配置路由页面的菜单部分，支持JSX  

`options.select`  
{String}  
默认菜单项，默认显示页面，填写路由子线配置的`url`属性，该属性支持query方式传递参数给进入页面

`options.beforeNav`  
{Function}  
全局路由守卫，手动拦截/放行所有路由  

#### 定义SPA路由表

```js
const nav = Pager.nav

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: require('./_subpages/c')},
], {
  header: ()=> <div className="nav-header">...</div>,
  footer: <div className="nav-footer">...</div>
  menus: function(){
    return <Menus />
  },
  select: '/index/a',
})

// 菜单栏
function Menus(props){
  let methodClick = function(e){
    let target = e.target; let dataset = target.dataset;
    let url = dataset.url
    nav.redirectTo({url})  // 参考路由方法
  }
  return (
    <>
      <div className="menu-item" data-url='/index/a' onClick={methodClick}>菜单1</div>
      <div className="menu-item" data-url='/index/b' onClick={methodClick}>菜单2</div>
      <div className="menu-item" data-url='/index/c' onClick={methodClick}>菜单3</div>
    </>
  )
}
```
