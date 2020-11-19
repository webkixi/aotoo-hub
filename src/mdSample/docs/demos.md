# 自带的演示示例  

## 文档演示示例

__mdSample__，文档系统是一套完整的全栈DEMO，REACT技术栈  

* 全栈系统  
* SPA/MPA(多单页系统)
* 仿小程序的路由
* 支持markdown
* 支持SEO
* 多场景化
* 支持动态样式编译(stylus/sass)

## vue演示DEMO

__vueSample__，vue2.0的开发环境  

## REACT演示DEMO

__reactSample__，REACT16的演示

## 小程序演示DEMO

__xcxSample__，由`queryUI`构建，糅合了一些jQuery特性及一些方便好用的特性，用于简化小程序开发成本及帮助后期能更好的维护项目

* 原生微信小程序  
* 动态模板构建
* template less
* 支持钩子方法
* 内置支持MARKDOWN富文本
* 内置支持HTML富文本  

## 项目配置  

创建工作空间后，打开根目录下`aotoo.config.js`文件，修改apps字段  

```javascript
apps: [
  {
    name: 'mdSample',  // 项目名称
    version: '1.0.1', // 项目版本号
    startup: true, // 是否默认启动
    server: false, // 是否提供node服务
    type: 'web', // 项目类型
    src: path.join(ROOT, 'src/mdSample'), // 项目真实地址
    options: {
      scenes: 'default' // 项目环境
    },
    port: 8500  // 指定项目端口
  },

  {
    name: 'vueSample',  // 项目名称
    version: '1.0.0', // 项目版本号
    startup: false, // 是否默认启动
    server: false, // 是否提供node服务
    type: 'web', // 项目类型，默认web类型
    src: path.join(ROOT, 'src/vueSample'), // 项目真实地址
    options: {
      scenes: 'default' // 项目环境
    },
    port: 8600  // 指定项目端口
  },

  {
    name: 'xcxSample',  // 项目名称
    version: '1.0.0', // 项目版本号
    startup: false, // 是否默认启动
    server: false, // 是否提供node服务
    type: 'mp', // 项目类型，默认web类型
    src: path.join(ROOT, 'src/xcxSample'), // 项目真实地址
    options: {
      scenes: 'default' // 项目环境
    },
    port: 8700  // 指定项目端口
  },
],

```

## 项目启动

__启动默认项目__  

```bash
aotoo start # 启动startup===true的项目
```

__启动指定项目__  
使用该方法，将忽略startup的配置，并只启动指定的项目  

```bash
aotoo start vueSample
```

__启动多项目__  
可以将配置文件中多个项目配置为startup=true，也可以使用命令行启动多项目，下例启动3个项目  

```bash
aotoo start vueSample --name reactSmple --name mdSample
```
