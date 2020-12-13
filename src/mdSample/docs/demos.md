# 自带的演示示例  

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       ├─ mdSample
       ├─ vueSample
       ├─ reactSample
       └─ xcxSample

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

**vueSample**，vue2.0 的开发环境

**启动命令**

```bash
# 开发模式
aotoo dev vueSample

# 生产模式
aotoo build-clean vueSample
node index.js
```

## REACT 演示 DEMO

**reactSample**，REACT16 的演示

**启动命令**

```bash
# 开发模式
aotoo dev reactSample

# 生产模式
aotoo build-clean reactSample
node index.js
```

## 小程序演示 DEMO

**xcxSample**，由`queryUI`构建，糅合了一些 jQuery 特性及一些方便好用的特性，用于简化小程序开发成本及帮助后期能更好的维护项目

- 原生微信小程序
- 动态模板构建
- template less
- 支持钩子方法
- 内置支持 MARKDOWN 富文本
- 内置支持 HTML 富文本

**启动命令**

```bash
# 开发模式/生产模式 -> 使用微信开发者工具打开dist目录
aotoo dev xcxSample
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
