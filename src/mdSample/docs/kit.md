# aotoo 套件

aotoo 现在的工作涉及 web/node/小程序/公众号/app，aotoo 并不是开发一个跨端的工具，aotoo 试图用相同的开发思想统一各端的开发，比如我们的元组件概念，aotoo 开发了一些前端工具库，用于简化前端的开发工作。

## aotoo-hub

一个纯粹的前端全栈脚手架工具，支持 react/vue/angular/小程序框架，支持多项目并行开发及衍生出的前端微服务架构，<https://github.com/webkixi/aotoo-hub>

## aotoo-cli

配合 aotoo-hub 的命令行工具

```bash
npm i -g aotoo-cli
```

## @aotoo/react-cell

开放性表单组件，支持自定义容器，自定义表单 <https://github.com/webkixi/aotoo-react-cell>

```bash
npm install @aotoo/react-cell
```

## @aotoo/aotoo

一套react栈的工具库，使用小程序的方式构建react组件，<https://github.com/webkixi/aotoo>

```bash
npm install @aotoo/aotoo
```

## @aotoo/react-pager

基于aotoo的路由组件，支持node端渲染首屏，<https://github.com/webkixi/aotoo-react-pager>

```bash
npm install @aotoo/react-pager
```

## aotoo-inject

前端注入工具，无依赖性，可独立应用，用来在运行时注入 JS/CSS，支持 node 端注入，<https://github.com/webkixi/aotoo-inject>

```bash
npm install aotoo-inject
```

```javascript
const inject = require("aotoo-inject")();

// 动态注入css内联样式
inject.css(`
  body: {
    font-size: 16px;
  }
`);

// 注入样式表
inject.css(["http://www.abc.com/container.css"], function() {
  console.log("注入完成");
});

inject.js(["http://www.abc.com/jquery.js"], function() {
  console.log("注入完成");
});

// 高级用法

// 注册js/css库
inject.maper = {
  js: {
    jquery: "http://www.abc.com/jquery.js",
  },
  css: {
    animat: "http://www.abc.com/animat.css",
  },
};

// 注入jquery库到header
inject(["jquery"]);
```

## aotoo-xquery

小程序组件库，多形态日历组件，联动表单组件，多级筛选组件，小程序 makdown/html 富文本组件，小程序水果老虎机，刮刮卡，悬浮导航球，分类导航栏等，<https://github.com/webkixi/aotoo-xquery>
