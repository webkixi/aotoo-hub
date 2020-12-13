# 使用文档系统  

文档系统是`多-单页`结构，如下例中日志栏目`js/logs`对应`http://www.agzgz.com/logs`，该页面由SPA路由构成的单页系统

## 文档演示项目目录结构

```bash
workspace
 ├─aotoo.config.js
 └─src
    └─ 文档系统
        ├── configs
        ├── venders
        ├── dist
        └── docs      # 文档目录
             └── readme.md  # 说明文档
                 ...
                 ...
        ├── css
        └── js        # 前端业务js目录(前端)
             └── index  # 文档首页
                  ├── index.js
                  ├── index.styl  # 首页样式
                  └── index.html  # 首页模板

             └── logs  # 日志首页
                  └── ...
             └── minip  # 小程序文档
                  └── ...
```

**_对应网站首页_**  
js/index => `http://www.agzgz.com/index`

**_对应日志文档首页_**  
js/logs => `http://www.agzgz.com/logs`  

**_对应小程序文档首页_**  
js/minip => `http://www.agzgz.com/minip`  

## 新增markdown文档  

在`docs/`目录下新增md文档，或者创建新目录及其文档

## 配置路由

将`docs/`下的文档对应到菜单即可切换浏览不同文档，下例是`js/index/index.js`文件，日志或者其他栏目与此类似

```js
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('index')  // 定义页面头部，返回JSX
const mkmenus = require('../_common/mkmenus') // 创建菜单的方法，菜单由树列表构成

export default Pager.pages(

// 定义路由表
// 此部分无需处理
[
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: import('./_subpages/c')},
],

{
  // 定义头部导航栏，栏目切换菜单
  header: function(){
    return header
  },

  // 定义默认页面
  select: '/index/a?file=readme.md',

  // 定义侧栏菜单
  menus: function() {
    return mkmenus([
      {title: {title: 'AOTOO-HUB', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a1' },
      {title: '简介', attr: {file: 'readme.md'}, select: true, parent: 'a1'},  // webpack支持
      {title: '安装', attr: {file: 'install.md'}, parent: 'a1' },  // 编译模式易扩展
      {title: 'CLI', attr: {file: 'cli.md'}, parent: 'a1' },
      {title: '目录结构', attr: {file: 'structor.md'}, parent: 'a1' },
      {title: '项目配置', attr: {file: 'asset.md'}, parent: 'a1' },  // 开发、测试、生产、部署
      {title: '拥抱小程序', attr: {file: 'assetmini.md'}, parent: 'a1' }, // 小程序
      {title: '4个DEMO', attr: {file: 'demos.md'}, parent: 'a1' }, // 小程序
      {title: '套件', attr: {file: 'kit.md'}, parent: 'a1' },
      {title: '约定', attr: {file: 'agreement.md'}, parent: 'a1' },

      {title: {title: '上手指南', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a2'},
      {title: '快速开始web项目', attr: {file: 'start.md'}, parent: 'a2' }, // node端跨域 node端插件化 ssr
      {title: '快速开始小程序项目', attr: {file: 'startm.md'}, parent: 'a2' }, // node端跨域 node端插件化 ssr
      {title: '多项目配置', attr: {file: 'service.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: '文档项目上手', attr: {file: 'web/readme.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: 'react项目上手', attr: {file: 'reactdemo.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: 'vue项目上手', attr: {file: 'vuedemo.md'}, parent: 'a2' },  // 多服务模式 微服务模式
    ])
  }
})
```

### mkmenus

该方法用于创建菜单，需要传入一组列表(树状)数据。

#### 菜单项

`title`  
{String|Object|Array}  
菜单标题，通常我们使用字符串就可以了  

`attr`  
{Object}  
菜单项属性，菜单项将生成div结构，attr作为data-*属性被插入到该结构中，此处我们用于设置对应的文档  

`select`  
{String}  
该项是否被默认选中  

`itemClass`  
{String}  
指定该菜单的样式类  

**`idf | parent`**  
{String}  
此2属性将列表转化为树，mkmenus将列表数据转化为树数据，idf作为父级菜单，parent将作为其指向idf的子菜单
