# @aotoo/react-pager

文档项目是一套`多-单页`系统，多个栏目由独立的SPA构成，多个栏目共同构成MPA系统，由node渲染直出

文档项目的路由是一套基于`react+aotoo`技术栈实现的前端路由，仿造微信小程序，实现了微信小程序的各种路由方法，路由逻辑等。

## 路由页面构成  

如下图，路由页面由Header, footer, menus, body四大部分构成，除了body部分，其他均非必须，可以省略。我们在设计路由的时候就考虑到适配PC/移动

![](http://www.agzgz.com/imgs/agzgz/pageitem.jpeg)  

## 安装

```bash
npm install @aotoo/react-pager
# 或者
yarn add @aotoo/react-pager
```

### 远程示例项目  

在`aotoo-hub`的环境下可以安装远程示例项目  

```bash
aotoo install https://github.com/webkixi/hub-aotoo-case.git
aotoo install https://gitee.com/webkixi/hub-aotoo-case.git # gitee版
```

## Pager方法

使用`Pager`来构建单页面，仿小程序页面生命周期

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Pager from '@aotoo/react-pager'

function template(state, props) {
  return <div>{state.file}</div>
}

const page = Pager({
  // page的模板方法
  template,

  // 可以通过setData方法修改此处参数
  data: {
    file: 'readme.md',
  },

  // 页面开始的方法
  // 接收上一个页面传递的数据
  onLoad(param){
    let file = param.file
    let $file = this.getData().file
    if (file && file !== $file) {
      this.setData({ file })
    }
  },

  // 页面显示时调用
  // 每个页面都会调用onLoad和onShow方法，
  // 当使用navigateTo方法跳转页面时, back回来此页面时会调用onShow的方法
  onShow(){},

  // 页面卸载时
  onUnload(){},

  // 页面dom元素全部加载完成时
  onReady(){}
})

ReactDOM.render(<page.UI />, document.getElementById('root'))

```

### setData

该方法参考小程序，可以使用此方法修改`data`里面的数据，同时会触发模板的渲染  

```js
onLoad(){
  this.setData({file: '...'})

  // 支持深层更新数据  
  this.setData({'obj.title': '...'})

  // 数组也是支持的
  this.setData({
    'ary[0].title': '...'
  })
}
```

## Pager.pages

该方法用于定义路由表，构建SPA项目。支持node端渲染。默认会自动渲染结构到 `#root` 容器

### 语法

```js
Pager.pages([
  item,
  item,
  ...
], options)
```

### items

路由表数组

`item.url`  
{String}  
路由地址，该条路由的ID，必须指定唯一值，地址栏的hash部分将显示该值

`item.content`  
{Function}  
指定路由子页内容，支持全量引入(require)，支持按需引入(import)  

### options

`options.root`  
{String}  
默认为`root`，指定路由容器

`options.sep`  
{String}  
默认为`#`，置为空则转为内存路由

`options.maxAge`  
{String}  
路由历史记录的缓存事件，使用saveHistory方法时调用  

`options.header`  
{[JSX|Function]}  
配置路由页面的头部，支持JSX，或者item组件配置  

`options.footer`  
{[JSX|Function]}  
配置路由页面的底部，支持JSX，或者item组件配置  

`options.menus`  
{[JSX|Function]}  
配置路由页面的菜单部分，支持JSX  

`options.select`  
{[String]}  
默认菜单项，默认显示页面，填写路由子线配置的`url`属性，该属性支持query方式传递参数给进入页面，不填写则默认第一条路由数据作为首页

`options.beforeNav`  
{Function}  
全局路由守卫，手动拦截/放行所有路由  

`options.goback`  
{Function}  
全局路由守卫，返回后执行该回调

`options.unLoad`  
{Function}  
路由卸载时，触发此方法

### 定义SPA路由表示例

**路由表**

```js
// index.js

import Pager from '@aotoo/react-pager'
const nav = Pager.nav

// 构建SPA路由，并自动渲染至#root容器(默认)
export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: require('./_subpages/c')},
], {
  select: '/index/a',
})
```

**子页面**  

```js
// ./_subpages/a.js

function template(state, props) {
  return (
    <div onClick={this.env.ontap}>
      <span>{state.title}</span>
    </div>
  )
}

export default function(Pager) {
  const nav = Pager.nav
  return Pager({
    template,

    data: {
      title: '这是a页面'
    },
    
    ontap(e){
      nav.redirectTo({url: '...'})
    }
    
    onLoad(param){ // param为页面传递参数
      // 页面加载时
    },

    onUnload(){
      // 页面卸载时
    },

    onReady(){
      // 页面dom已被渲染完成时
      this.setData({
        title: '为a页面设置新的内容'
      })
    }
  })
}
```

**server**

```js
import index from '../index'
const htmlStr = await index
```

## Pager.nav

`Pager.nav`是一个对象，包含下面路由方法，路由方法的设计参考自小程序

- navigateTo
- navigateBack
- redirectTo
- redirectBack
- reLaunch

```js
const nav = Pager.nav

nav.navigateTo(...)
nav.relaunch(...)
...
```

### reLaunch

关闭所有页面，打开到应用内的某个页面  

使用

```js
nav.reLaunch({
  url: '',
  success: function(){}
  ...
})
```

| 属性 | 类型 |  默认值 |  必填 |  说明 |
| :----: | :----: |  :----: |  :----:  |  :----  |
| url | string |  |  是  | 跳转的应用内页面路径  |
| beforeNav | function |  |  否  | 跳转前动作  |
| success | function |  | 否 | 跳转成功执行 |
| fail | function | | 否 | 跳转失败执行 |
| complete | function |  | 否 | 跳转执行(成功&失败) |
| events | object |  | 否 | 未实现 |

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
`next(param)`: 执行该方法允许路由跳转，param将被合并到to的参数中，允许修改将要跳转页面页面参数  

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

## 路由实例

Pager是路由的封装方法，支持嵌套路由，每一次路由初始化将会产生一个新的路由实例，使用nav对象做路由跳转时，nav对象会自动匹配路有实例并实现路由跳转。

但有一些特殊点的实例方法需要手动操作  

### 获取路由实例

```js
let router = Pager.getRouter()  // 获取当前操作的路由实例  
let rootRouter = Pager.getRootRouter() // 获取祖先路由实例  
```

### 路由实例方法  

**router.getCurrentPages**  
获取当前路由的参数信息  

**router.saveHistory**  
保存路由的历史数据到localstorage，通常这个操作只针对rootRouter。如果希望用户关闭页面，再回来时打开时恢复历史记录需要使用此方法先将历史记录存储到localStorage中

**router.clearHistory**  
清空路由的历史记录，当我们使用`reLaunch`路由方法时会自动调用，通常这个操作只针对rootRouter

**router.restoreHistory**  
由localstorage恢复路由的历史记录，通常这个操作只针对rootRouter。当使用saveHistory后，restoreHistory会恢复历史记录到内存中，这样用户可以还原跳出时的历史记录。这一步一般自动完成。
