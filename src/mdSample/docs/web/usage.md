# 使用文档系统  

文档系统是 AOTOO-HUB 自带的 WEB 演示系统

**首页模块路由表**  

```js
// js/index/index.js

import Pager from '@aotoo/react-pager'
export default Pager.pages(
  [
    {url: '/index/a', content: import('./_subpages/a')},  // 子页模块
    {url: '/index/b', content: import('./_subpages/b')},  // 子页模块
    {url: '/index/c', content: import('./_subpages/c')},  // 子页模块
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

## 路由模块列表  

```js
[
  {url: '/index/a', content: import('./_subpages/a')},  // 子页模块
  {url: '/index/b', content: import('./_subpages/b')},  // 子页模块
  {url: '/index/c', content: import('./_subpages/c')},  // 子页模块
],
```

上面的代码片段包含首页模块(index)的各个路由页面，路由模块会缓存所有页面以备路由切换时调用  

## 创建头部结构  

```js
{
  // 定义所有路由页头部，支持返回JSX结构
  header: function(){
    return <Header />
  },
  ...
}
```

上面的代码片段生成路由页面的头部部分，header 属性可以直接指定为 JSX 结构，也可以指定为方法

## 创建底部结构  

```js
{
  // 定义所有路由页头部，支持返回JSX结构
  footer: function(){
    return <Footer />
  },
  ...
}
```

上面的代码片段生成路由页面的头部部分，footer 属性可以直接指定为 JSX 结构，也可以指定为方法

## 创建菜单部分  

```js
{
  // 导航菜单，返回JSX结构
  menus: function() {
    return mkmenus([
      {title: 'AOTOO-HUB', itemClass: 'menu-caption active', idf: 'a1' },
      {title: '简介', attr: {file: 'readme.md'}, select: true, parent: 'a1'},

      {title: '分类菜单', itemClass: 'menu-caption active', idf: 'a2' },
      {title: '子菜单-1', attr: {file: 'article-1.md'}, parent: 'a2'},
      {title: '子菜单-2', attr: {file: 'article-2.md'}, parent: 'a2'},
      ...
      ...
    ])
  }
}
```

### 菜单属性  

**title**  
菜单显示标题  

**itemClass**  
单独指定该菜单的样式类  

**select**  
是否选中状态  

**attr**  
attr 属性会作为 data-* 存储在 html 结构上，`attr.file` 指定载入的文档内容  

>> _撰写文档_  
文档统一存放在 /doc 目录，如 doc/web/abc.md，对应 attr.file 的value值为 attr.file = 'web/abc.md'

**idf**  
父级标识  

**parent**  
子级标识(指定父级idf)，构建菜单层级  

## 路由导航  

在子页逻辑中切换不同页面  

```js
// _subpages/a  

export default function(Pager) {
  const nav = Pager.nav
  return Pager({

    data: {
      file: 'readme.md'
    },
    
    onLoad(options){
      let $file = this.getData().file
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    onReady(){
      
    },
    
    navto(e){
      nav.redirectTo({
        url: '/index/b?file=/path/to/file',  带参跳转
        beforeNav(to, from, next){  // 执行 next 方法放行路由，否则截断路由
          if (满足条件) {
            next()
          }
        }
      })
    },
    
    template(state, props){
      return (
        <button onClick={this.navto}></button>
      )
    }
  })
}
```
