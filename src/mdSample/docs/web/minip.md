# 仿小程序路由  

文档系统是一套`Multiple-SPA`系统，多个栏目由独立的SPA构成，SPA系统通过前端路由为用户提供导航服务，切换不同的SAP子页面

文档系统的路由仿造自微信小程序，实现了微信小程序的各种路由方法，路由逻辑等。该路由基于react栈，文档路由源码包含  

`src/mdSample/js/vendors/page`  
`src/mdSample/js/vendors/router`  

文档路由使用`@aotoo/aotoo`库(基于react的工具库)开发而成。暂不是一个NPM项目，如果在项目外使用该路由，可以复制源码目录，并参考文档系统路由项目源码  

## 路由页面构成  

如下图，路由页面由Header, footer, menus, body四大部分构成，除了body部分，其他均非必须，可以省略。我们在设计路由的时候就考虑到适配PC/移动

![](http://www.agzgz.com/imgs/agzgz/pageitem.jpeg)  

### page

page是路由组件库的表层，用于处理初始化路由组件，注册路由页面，路由页面查询等，page库支持嵌套路由设计，类似于画中画这样的设计  

### router  

路由组件核心库，支持node，支持seo，支持多层路由，现阶段实现小程序全套路由方法(非tab方法)

### 使用路由

#### 定义路由页面  

onLoad, onReady, onUnload等生命周期的方法可以参考微信小程序路由生命周期方法

```js
export default function(Pager) {
  
  function template(state, props) {
    return (
      <div>{state.title}</div>  // 你好
    )
  }
  
  return Pager({
    template,  // 页面模板

    data: {  // react的state
      title: '你好'
    },

    onLoad(options){
      // 页面创建时执行
    },

    onShow(){
      // 页面出现在前台时执行
    },

    onUnload(){
      // 页面销毁时执行
    },

    onReady(){
      // 页面首次渲染完毕时执行
    }
  })
}
```

#### 定义路由

下例是路由最简配置，创建路由实例并引入路由页面，可以在页面中使用`nav`导航对象进行路由跳转

```js
const nav = Pager.nav

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: require('./_subpages/c')},
])

setTimeout(()=>{
  nav.redirectTo({url: '/index/b'})  // 此处跳转到 B 页面

  setTimeout(()=>{
    nav.redirectTo({url: '/index/c?name=mike&age=18'})  // 此处带参跳转到 C 页面
  }, 1000)
}, 1000)
```
