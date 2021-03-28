# 远程项目  

远程项目是一些常用的环境，比如react全家桶环境，或者vue全家桶环境等等，我们推出了一些基础项目。hub支持自定义项目，可以自定义自己熟悉的环境并开源的gitee(比较快)，通过命令行安装下来

远程项目必须在hub的工作目录中安装，你需要先初始化Hub的工作环境，如果不清楚请查看上面《安装》等基础文章  

```bash
aotoo install https://github.com/webkixi/hub-aotoo-admin.git
```

使用`aotoo install`可安装远程项目，上述示例代码将安装一套基于aotoo的简易中台系统

## 远程项目  

**vue2初始化项目, vue2 + vue-router**

```
aotoo install https://gitee.com/webkixi/hub-vue2.git  # gitee版
```

**react初始化项目, react + react-router**  

```
aotoo install https://gitee.com/webkixi/hub-react.git 
```

**react + aotoo初始化项目， 基于aotoo的路由实现**

```
aotoo install https://gitee.com/webkixi/hub-aotoo-case.git
```

**基于aotoo的简易中台系统**

```
aotoo install https://gitee.com/webkixi/hub-aotoo-admin.git
```

**基础小程序(与官方模板一致)**

```
aotoo install https://gitee.com/webkixi/hub-xcx.git

```

**小程序 with queryui，小程序精简项目，包含queryui的组件示例**

```
aotoo install https://gitee.com/webkixi/aotoo-xquery.git
```

## 目录结构  

安装完成后大致如下结构

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
