# 路由

文档系统是一套全栈型的静态文档系统，包含 NODE 端路由和前端路由两个路由部分，使用 MPA + SPA 的混合模式切换页面

**MPA 路由**

多个模块间切换(URL切换)属于 NODE 路由的范畴，每一个模块对应 NODE 路由的一个URL，模块间的切换等于一个页面切换到另一个页面，浏览器向 NODE 端发送请求，NODE 端响应并渲染对应 URL 页面

**SPA 路由**  

每一个模块由多个页面构成，模块内切换使用 SPA 路由模式，由JS调起相关文件，并渲染到指定的ID结构中

## 前端路由组件

文档系统使用自研的路由库 @aotoo/react-pager ，基于 REACT&HOOKS&AOTOO 技术。仿造微信小程序路由逻辑，可应用在 PC/公众号项目中。

### @aotoo/react-pager

**安装**  

```bash
npm install @aotoo/react-pager
# 或者
yarn add @aotoo/react-pager
```

#### 构建路由表

**页面结构**  

![](http://www.agzgz.com/imgs/agzgz/pageitem.jpeg)  

如上图，路由页面由Header, footer, menus, body四大部分构成，Body部分作为分页展示区域，每次路由切换页面时，BODY部分会被新页面替换或者遮盖

路由表用来记录若干预先定义的路由子页面，在路由切换时匹配到正确的路由子页面并显示在 BODY 容器中

**语法**

```js
import Pager from '@aotoo/react-pager'
Pager.pages([
  item,
  item,
  ...
], options)
```

Pager.pages 方法用于定义路由表，默认会自动渲染结构到 `#root` 容器

**实例**  

定义文档项目首页模块路由 js/index/index.js

```js
import Pager from '@aotoo/react-pager'
export default Pager.pages(
  [
    {url: '/index/a', content: import('./_subpages/a')},  // 子页模块
  ], 
  {
    // 定义所有路由页头部，支持返回JSX结构
    header: function(){
      return header
    },
    
    // 默认页，支持QUERY传递首页参数
    select: '/index/a?file=readme.md',
    
    // 导航菜单，返回JSX结构
    menus: function() {
      return mkmenus([
        {title: 'AOTOO-HUB', itemClass: 'menu-caption active', idf: 'a1' },
        {title: '简介', attr: {file: 'readme.md'}, select: true, parent: 'a1'},
        ...
        ...
      ])
    }
  }
)
```

> 注意：导出 Pager.pages(...) 的结果可在 NODE 中被渲染(默认页会被解析为字符串并被 NODE 渲染)  

#### 说明

`item.url`  
{String}  
路由地址，该条路由的ID，必须指定唯一值，地址栏的hash部分将显示该值

`item.content`  
{Function}  
指定路由子页内容，支持全量引入(require)，支持按需引入(import)  

`item.select`  
{Boolean}  
是否是激活选项

`options.root`  
{String}  
默认为`root`，指定路由容器ID，路由结构将显示在该容器下

`options.sep`  
{String}  
默认为`#`，路由URL的分隔符，置为空则转为内存路由

`options.maxAge`  
{String}  
将路由的历史记录缓存到LOCALSTORAGE中，并设置其过期时间，使用route.saveHistory()方法时触发存储动作，默认最大时间为 2 小时

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
全局路由守卫，触发返回动作后执行该回调

`options.unLoad`  
{Function}  
路由卸载时，触发此方法

### 构建路由子页面  

我们按照小程序的生命周期方式来定义每一个路由子页面，使小程序开发与WEB开发能够比较平滑切换

```js
// _subpages/a.js

export default function(Pager) {
  const nav = Pager.nav
  return Pager({
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
    },
    template(state, props){
      return (
        <div onClick={this.env.ontap}>
          <span>{state.title}</span>
        </div>
      )
    }
  })
}
```

> this.setData 方法用于设置Data数据，并渲染页面

### 路由方法

通过引入 Pager.nav 进行路由导航。`Pager.nav`是一个对象，包含下面路由方法，路由方法的设计参考自小程序

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

#### reLaunch

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

**url**

需要跳转的应用内页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2'

**beforeNav(to, from, next)**

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

#### navigateTo  

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层

配置参考 reLaunch

#### navigateBack

关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。  

配置参考 reLaunch

#### redirectTo

关闭当前页面，跳转到应用内的某个页面。  

配置参考 reLaunch

#### redirectBack

关闭当前页面，返回上一页面  

配置参考 reLaunch

### 路由实例

Pager是路由的封装方法，支持嵌套路由，每一次路由初始化将会产生一个新的路由实例，使用nav对象做路由跳转时，nav对象会自动匹配路有实例并实现路由跳转。

但有一些特殊点的实例方法需要手动操作  

#### 获取路由实例

```js
let router = Pager.getRouter()  // 获取当前操作的路由实例  
let rootRouter = Pager.getRootRouter() // 获取祖先路由实例  
```

### 路由实例方法  

#### router.getCurrentPages

获取当前路由的参数信息  

#### router.saveHistory

保存路由的历史数据到localstorage，通常这个操作只针对rootRouter。如果希望用户关闭页面，再回来时打开时恢复历史记录需要使用此方法先将历史记录存储到localStorage中

#### router.clearHistory

清空路由的历史记录，当我们使用`reLaunch`路由方法时会自动调用，通常这个操作只针对rootRouter

#### router.restoreHistory

由localstorage恢复路由的历史记录，通常这个操作只针对rootRouter。当使用saveHistory后，restoreHistory会恢复历史记录到内存中，这样用户可以还原跳出时的历史记录。这一步一般自动完成。
