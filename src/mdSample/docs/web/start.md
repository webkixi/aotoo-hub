# 启动文档系统  

`aotoo-hub`自带有4个DEMO

- 文档
- vue演示项目
- react演示项目
- 小程序演示项目

文档系统是默认启动项目

## 安装

安装`aotoo-hub`环境需要先安装全局命令`aotoo`

__全局安装aotoo-cli__  

```bash
npm install aotoo-cli -g

aotoo -V # 显示版本则为安装成功
```

__创建工作空间__  

```bash
aotoo init workspace # workspace是指定创建的目录名
```

该命令将新建一个目录，并将安装初始环境

## 编辑文档目录

文档系统是`hub`自带的演示DEMO，进入文档系统目录`src/mdSample/js/index`，首页文档，其他栏目以此类推  

```js
const nav = Pager.nav
const lib = ao2.lib

// 文档顶部topbar
const header = require('../_common/header')('index')

// 文档的菜单栏sidebar
let menuInstance = ui_list({
  data: [
    // 菜单项
    {title: 'AOTOO-HUB', itemClass: 'menu-caption' },
      {title: '简介', attr: {file: 'readme.md'}, select: true},  // webpack支持
      {title: '安装', attr: {file: 'install.md'} },  // 编译模式易扩展
      {title: 'CLI', attr: {file: 'cli.md'} },
      {title: '目录结构', attr: {file: 'structor.md'} },
      {title: '项目配置', attr: {file: 'asset.md'} },  // 开发、测试、生产、部署
      {title: '拥抱小程序', attr: {file: 'assetmini.md'} }, // 小程序
      {title: '4个DEMO', attr: {file: 'demos.md'} }, // 小程序
      {title: '套件', attr: {file: 'kit.md'} },
      {title: '约定', attr: {file: 'agreement.md'} },
  ],
  itemMethod: {
    // 菜单响应事件
    onClick(e, param, inst){
      let file = inst.attr('file')
      if (file) {
        inst.addClass('active')
        inst.siblings().removeClass('active')
        nav.redirectTo({
          url: '/index/a?file=' + file,

          // 菜单项点击拦截方法，设置高亮
          beforeNav(to, from, next) {
            setTimeout(()=>{
              document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
              });
            }, 100);
            next()
          }
        })
      }
    }
  },
  // 菜单栏列表类名
  listClass: 'router-menu-list'
})


// 部署路由
export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header,
  menus: <menuInstance.UI />,
  select: '/index/a?file=readme.md'
})
```

## 开始写文档

文档系统是`hub`自带的演示DEMO，进入文档系统目录`src/mdSample/docs`，并开始撰写markdown文档  

## 启动文档系统  

```bash
cd workspace
aotoo dev
```

等待编译完成则会弹开浏览器展示文档  
