# aotoo套件

aotoo现在的工作涉及web/node/小程序/公众号/app，aotoo并不是开发一个跨端的工具，aotoo试图用相同的开发思想统一各端的开发，比如我们的元组件概念，aotoo开发了一些前端工具库，用于简化前端的开发工作。

## aotoo-hub

一个纯粹的前端全栈脚手架工具，支持react/vue/angular/小程序框架，支持多项目并行开发及衍生出的前端微服务架构，<https://github.com/webkixi/aotoo-hub>

## aotoo-cli

配合aotoo-hub的命令行工具  
> npm i -g aotoo-cli

## aotoo-inject

前端注入工具，无依赖性，可独立应用，用来在运行时注入JS/CSS，支持node端注入，<https://github.com/webkixi/aotoo-inject>
> npm install aotoo-inject

```javascript
const inject = require('aotoo-inject')()

// 动态注入css内联样式
inject.css(`
  body: {
    font-size: 16px;
  }
`);

// 注入样式表
inject.css([
  'http://www.abc.com/container.css'
], function(){
  console.log('注入完成')
})

inject.js([
  'http://www.abc.com/jquery.js'
], function(){
  console.log('注入完成')
})

// 高级用法

// 注册js/css库
inject.maper = {
  js: {
    jquery: 'http://www.abc.com/jquery.js'
  },
  css: {
    animat: 'http://www.abc.com/animat.css'
  }
}

// 注入jquery库到header
inject(['jquery'])
```

## aotoo-xquery

小程序组件库，多形态日历组件，联动表单组件，多级筛选组件，小程序makdown/html富文本组件，小程序水果老虎机，刮刮卡，悬浮导航球，分类导航栏等，<https://github.com/webkixi/aotoo-xquery>

## aotoo-hub自带demo

aotoo-hub自带demo是一套markdown的文档系统，你正在浏览的这篇文档，由node端支撑，基于React技术栈，将SEO与前端路由妥协融合。aotoo在这个项目中大量借鉴小程序的开发理念，包含路由与组件开发，尽量降低web开发与小程序开发间的差异。比如我们提供了高仿`navigateTo和redirectTo`的路由方法，page模块，组件开发模式等
