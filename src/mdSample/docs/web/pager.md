# page

## 初始化路由

```js
import Pager from 'vendors/page'

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: import('./_subpages/c')},
], {
  header,
  menus: <menuInstance.UI />,
  select: '/index/a?file=readme.md'
})
```

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
{JSX|Object}  
配置路由页面的头部，支持JSX，或者item组件配置  

`options.footer`  
{JSX|Object}  
配置路由页面的底部，支持JSX，或者item组件配置  

`options.menus`  
{JSX}  
配置路由页面的菜单部分，支持JSX  

`options.select`  
{String}  
默认菜单项，默认显示页面，填写路由子线配置的`url`属性，该属性支持query方式传递参数给进入页面

`options.beforeNav`  
{Function}  
全局路由守卫，手动拦截/放行所有路由

## 路由  

目前实现了小程序的一下路由方法

- navigateTo
- navigateBack
- redirectTo
- redirectBack
- reLaunch

### reLaunch

关闭所有页面，打开到应用内的某个页面  

参数
Object object  

| 属性 | 类型 |  默认值 |  必填 |  说明 |
| :----: | :----: |  :----: |  :----:  |  :----  |
| url | string |  |  是  | 跳转的应用内页面路径  |
| beforeNav | function |  |  否  | 跳转前动作  |
| success | function |  | 否 | 未实现，暂无使用场景 |
| fail | function | | 否 | 未实现，暂无使用场景 |
| complete | function |  | 否 | 未实现，暂无使用场景 |
| events | object |  | 否 | 未实现，暂无使用场景 |

#### url

需要跳转的应用内页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2'

#### beforeNav(to, from, next)

跳转前方法，该方法可阻止跳转
`to`  
{Object}  
将要跳转的目的页面的配置  

`from`  
{Object}  
当前页面的配置  

`next`  
{Function}  
`next(param)`: param将被合并到to的参数中，允许修改将要跳转页面页面参数
允许跳转  

```js
onClick(e, param, inst){
  nav.redirectTo({
    url: '/index/a?file=' + file,
    beforeNav(to, from, next) {
      if (满足条件) {
        next()
      }
    }
  })
}
```

### navigateTo  

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层

配置参考 reLaunch

### navigateBack

关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。  

配置参考 reLaunch

### redirectTo

关闭当前页面，跳转到应用内的某个页面。  

配置参考 reLaunch

### redirectBack

关闭当前页面，返回上一页面  

配置参考 reLaunch

## 路由页面  

每个页面都需要在页面对应的 js 文件中进行注册，指定页面的初始数据、生命周期回调、事件处理函数等。

使用 Pager 构造器注册页面

代码示例：

```js
function template(state, props) {
  return <div>{state.xxx}</div>
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      file: 'readme.md'
    },

    onLoad(options){
      console.log(options, '======= onLoad options');
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    onShow(){

    },

    onUnload(){

    },

    onReady(){

    }
  })
}
```
