# 自带的演示示例  

`aotoo-hub`支持安装远程项目，我们清除了一些本地的示例项目，使得安装包更加快速，精简。

## 远程项目  

使用`aotoo install`可安装远程项目，快速搭建本地开发环境，示例

```bash
# 在hub环境下安装
aotoo install https://github.com/webkixi/hub-vue2.git
```

上例为使用命令行安装远程的vue项目，目前包含以下远程项目  

```bash
#vue2初始化项目, vue2 + vue-router
aotoo install https://github.com/webkixi/hub-vue2.git
aotoo install https://gitee.com/webkixi/hub-vue2.git  # gitee版


# react初始化项目, react + react-router
aotoo install https://github.com/webkixi/hub-react.git
aotoo install https://gitee.com/webkixi/hub-react.git  # gitee版


# 小程序初始化项目，小程序开发工具初的始化项目
aotoo install https://github.com/webkixi/hub-xcx.git
aotoo install https://gitee.com/webkixi/hub-xcx.git  # gitee版


# react + aotoo初始化项目， react路由新轮子
aotoo install https://github.com/webkixi/hub-aotoo-case.git
aotoo install https://gitee.com/webkixi/hub-aotoo-case.git # gitee版


# 小程序 with queryui，小程序精简项目，包含queryui的组件示例
aotoo install https://github.com/webkixi/aotoo-xquery.git
aotoo install https://gitee.com/webkixi/aotoo-xquery.git # gitee版
```

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       ├─ mdSample
       ├─ hub-react
       ├─ hub-vue2
       └─ hub-xcx
```

## 文档演示示例

**mdSample**，文档系统是一套完整的全栈 DEMO，REACT 技术栈

- 全栈系统
- SPA/MPA(多单页系统)
- 仿小程序的路由
- 支持 markdown
- 支持 SEO
- 多场景化
- 支持动态样式编译(stylus/sass)

**启动命令**

```bash
# 开发模式
aotoo dev

# 生产模式
aotoo build-clean
node index.js
```

## vue 演示 DEMO

vue的演示项目已迁移至github，可以通过install安装远程项目到本地

**启动命令**

```bash
# 安装远程vue demo项目至本地
aotoo install https://github.com/webkixi/hub-vue2.git
# 或者 
aotoo install https://gitee.com/webkixi/hub-vue2.git

# 开发模式
aotoo dev hub-vue2

# 生产模式
aotoo build-clean hub-vue2
node index.js
```

## REACT 演示 DEMO

react的演示项目已迁移至github，可以通过install安装远程项目到本地

**启动命令**

```bash
# 安装远程react demo项目至本地
aotoo install https://github.com/webkixi/hub-react.git
# 或者 
aotoo install https://gitee.com/webkixi/hub-react.git

# 开发模式
aotoo dev hub-react

# 生产模式
aotoo build-clean hub-react
node index.js
```

## 小程序演示 DEMO

小程序初始化演示项目已迁移至github，可以通过install安装远程项目到本地

**启动命令**

```bash
# 安装远程小程序 demo项目至本地
aotoo install https://github.com/webkixi/hub-xcx.git
# 或者 
aotoo install https://gitee.com/webkixi/hub-xcx.git

# 开发模式
aotoo dev hub-xcx

# 生产模式
aotoo build-clean hub-xcx
```

## 项目配置

创建工作空间后，打开根目录下`aotoo.config.js`文件，修改 apps 字段

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
