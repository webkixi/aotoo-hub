# 介绍  

`aotoo-hub`是一套前端全栈型脚手架

**[GITHUB](https://www.github.com/webkixi/aotoo-hub)**  
**[更多说明](https://www.agzgz.com)**  

* 多框架，支持react, vue, 小程序项目开发
* 工程化，适用于中大型项目
* 全栈化，支持前端并提供基于KOA2的node环境
* 一体化，项目是一个整体，无需额外启动其他服务
* 多项目，一套环境支持开发、部署多个项目，支持单独运行，同时运行
* 配置化，通过配置文件同时并行运行多个项目  
* 命令化，支持开发模式，生产模式，灵活切换测试环境，预发布环境，生产环境等
* 模板化，支持远程安装预置模板，可快速构建开发环境
* 动态样式，支持stylus, sass, less等

## 具体说明

### 工程化  

项目基于webpack-4编译构建，目录结构简单、清晰。渐进式项目结构设计。简单项目使用最简化目录，仅仅将业务文件置于js目录下，由hub自动匹对生成的html/node等相关文件。复杂项目中，hub可支持组件层，通用层，业务层，server层，配置层等目录结构  

可以通过命令行工具启动hub项目的各种环境配置

hub的输出目录可细分为开发、生产、版本，方便开发和部署  

`最简项目结构`  

```bash
└─ project
      └── js        # 前端业务js目录(前端)
          └── index.js # 业务-首页
```

`输出项目目录示例`  

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录
            │── js/index.js
            │── html/index.html
             ...
```

### 一体化

hub构建的项目可以作为独立的纯前端项目，也可以作为独立的node项目，同时也可以作为包含node端、前端的全栈项目。

在开发过程中hub提供了统一的开发环境。开发者启动一次即可以同时启动前端、node端，并实现热更新服务

`镜像`  
hub的node服务基于KOA2框架实现，前端与node端深度融合。当开启server端配置时，开发者仍然只需要关注前端代码的编写，node端路由，control层文件, view层模板，以及静态资源的引用均由hub自动镜像完成。

`插件`  
node端插件模块是hub的比较创新的设计，可以灵活地自定义路由，自定义API，自定义插件(供control层文件使用的各种类库)。满足各种开发需求

### 多项目  

在一个hub的工作目录中，可以并行开发、运行、部署多个项目，各个项目间通过端口互相隔离，既可以分开独立使用，也可以同时启用。

多个项目即可共享一套nodemoudle，也可以各自安装项目所需依赖(在项目下)  

支持多框架，react栈前端、vue栈前端均可支持  

### 远程模板  

我们开发了一些基础环境的远程模板(gitee开源项目)，比如react项目(包含react-router)，比如vue2项目，比如小程序项目等等，
通过命令行可快速安装、运行。

```
aotoo install https://gitee.com/webkixi/hub-aotoo-admin.git
```

上例远程安装一个我们开发的react的中台系统，拿来即用

### 配置化

下例是一个hub项目的具体配置项

```js
{
  // 项目名称
  name: 'mdSample', 

  // 指定项目版本
  version: 1.0.8,  

  // 是否启动项目，默认false
  // 启动时，可简化命令行输入项目名称
  startup: true,    

  // 是否启动node server，默认false，由webpack-dev-server提供服务
  // 如在组件开发过程中，关闭node服务，提升性能和效率
  server: false, 

  // 省略前端编译，默认false，需要设置server=true
  // 只启动node端，开发模式提升效率，生产模式可直接部署
  onlynode: false, 

  // 项目源码目录
  src: path.join(ROOT, 'src/mdSample'),  

  // 指定项目端口，不指定则分配随机端口
  port: 8400,

  options: {

    // 项目灰度环境，如测试，预发布，生产等
    // 建议使用命令行 --config test，选择环境配置
    // scenes: 'default' 
  }
},
```

### 支持小程序  

按照微信官方小程序模板1:1对等源码，使用webpack处理小程序的动态样式，markdown，html等等。(输出不会产生webpack的冗余代码)，支持热更新

使用webpack参与小程序编译，我们可以使用webpack的loader/plugins实现一些想法，比如写个loader，将微信小程序转译成其他小程序，只是对照表有点麻烦，思路应该是可行的

## 脚手架源码结构

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       # vue 项目演示
       └─ vueSample
             ├── configs # node环境配置文件，默认包含default.js
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录(前端)
                 │── venders # 第三方库文件目录+自定义公共库(前端)
                 ...
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录
                   
       # react 项目演示
       └─ reactSample
             ├── configs # node环境配置文件，默认包含default.js
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录(前端)
                 │── venders # 第三方库文件目录+自定义公共库(前端)
                 ...
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录
                   
       # 小程序项目演示
       └─ xcxSample 
             ...
             ...
             
       # 文档项目演示
       └─ mdSample 
             ...
             ...
```
