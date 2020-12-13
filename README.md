在一个小公司最大的好处是什么都要搞，几年下来PC/公众号/小程序，前台，后台，中台，react，vue、UI都要搞搞吧，这么多乱七八糟的东西揉到一起就够糟心的了。产品需求不断，项目越做越多，人还是那几个，还有历史包袱(前期自己挖的坑也要填)。接下来老板说了要上APP。

迫于以上压力，迫切需要规范统一，思路统一，要多端输出，要快速迭代的好框架。整理一下，从上手的工具开始，就是下面这个了，我们用在生产了。喜欢折腾的可以研究下。

`aotoo-hub`是一套前端/NODE 端一体化设计的全栈脚手架，将它定位明确一点，专职编译，与业务去耦合，webpack4编译环境，node端由koa2提供服务

* 一条命令启动开发环境、编译、构建、node
* 技术栈无关(支持react/vue/jquery)
* 多项目开发，多项目部署，多项目互通，多项目共享编译资源
* 支持快速开发/完整开发模式，配置是否启动node端
* 支持sass/stylus动态样式  
* 支持多环境部署，一条命令切换不同环境，测试，预生产，生产等
* node端自动生成镜像路由，镜像API
* node端支持插件，插件支持自定义路由/自定义API/自定义功能模块
* 支持自定义同构方法(前端+node端)
* 支持小程序编译

**[GITHUB](https://www.github.com/webkixi/aotoo-hub)**  
**[更多说明](https://www.agzgz.com)**

hub开发的一些思路
--------------

### 模板与目录  

目录结构越精简，上手越快，越容易理解，hub的一个项目可以精简到只有一个js文件，其他资源编译时或者运行时由编译器自动生成。

一个项目的目录构成受基础是资源，一个页面也是由资源(css/js/image)构成，理论上每一种静态资源都应有其对应的目录。hub的默认html模板中包的资源文件  

`模板的静态资源`  
hub自动生成的模板结构

```html
<html>
 <head>
  <link href="common.css" />
  <link href="[filename].css" />
 </head>
 <body>
 <div id="root"><%- root %></id>
  <script src="vendors.js" />
  <script src="common.js" />
  <script src="[filename].js" />
 </body
</html>
```

* common.js 分离的公共JS代码，由webpack编译时提取，注入
* vendors.js 第三方框架库及通用库，对应js/vendors目录
* common.css 公共CSS，对应css/common.[css|scss|styl]文件
* [ filename ].js 业务JS，对应业务目录/文件名称如 user.js
* [ filename ].css 业务CSS，对应业务目录/文件名称如 user.css
* hub使用ejs解析模板，由node 或 webpack-dev-server解析模板  

目录构成大致结构如下  

```bash
 src
  ├── html
  ├── css
  └── js
       ├── vendors/index.js
       └── index.js
```

* 可省略html目录，如无特殊模板结构要求
* 可省略css目录，如使用css-in-js

去年搞了一年的小程序，觉得小程序的目录结构也挺合理的，也来仿一把，user作为webpack entry的一个trunk，在JS打包过程中同时输出模板页面，css样式以及node的controler。

```bash
 src
  └── js
       ├── vendors/index.js
       └── user
            ├── index.js  # 输出业务JS => user.js
            ├── index.css # 输出业务CSS => user.css
            └── index.html # 输出业务模板 => user.html
```

### webpack的entry

hub通过索引业务JS构建webpack的entry，hub构建entry不基于html模板，而是业务JS文件，此处有个假设前提，即每一个模板都必须包含业务JS。

基于业务JS索引的entry有几个好处，一是webpack入口文件本来就是JS，二是可以使用webpack-html-plugins自动生成模板。少了一层逻辑。

观察reactSample演示项目的目录，该项目甚至精简到只有js目录和configs目录

```bash
# react的演示项目是一套完整项目，hub会自动产出相关静态资源
reactSample
     ├── configs/default.js # 实际上也是编译时生成的
     └── js/index/index.js
```

该项目使用默认模板，注入样式，是一个非常简单的SPA项目，所需的资源文件在编译时自动生成，样式在运行时由JS注入

该项目是一个完整项目，生产环境提供node服务，开发环境提供webpack-dev-server服务，生产环境下编译器会依据entry自动生成其对应的node文件，匹配不同的端口以提供模板渲染服务、镜像路由服务，镜像API接口服务，这一切都由编译器自动完成，而我们则只需要关注JS业务开发

### 编译小程序

`hub`按照小程序源码1:1的对等输出，不改变原有代码/目录结构，利用webpack处理一下小程序的一些小毛病，比如markdown，动态样式，html等等。(这里的输出不会产生webpack的冗余代码)

使用webpack参与小程序编译的好处是可以使用loader/plugins实现一些想法，现在更进一步的思路是写个loader，将微信小程序转译成其他小程序，只是对照表有点麻烦，思路应该是可行的

### 多项目支持

我用了4年的250g的macbook塞满了node_module，这好吗？这不好！前端人还是应该耗子尾汁，把编译和业务分开不香吗？hub允许不同项目共享一套编译环境(webpack4)，所有项目置于SRC目录下，所有编译文件输出到源目录dist目录下  

```bash
hub工作空间
  ├── build
  └── src
       └─ vueSample
             └─ dist
       └─ reactSample
             └─ dist
       └─ mdSample
             └─ dist
       └─ xcxSample
             └─ dist
```  

每个项目都可独立编译运行，有分配唯一node端口。所有项目共享hub工作空间的编译环境，共享hub工作空间的node_module。

#### 环境、项目隔离

环境是环境，项目是项目，编译环境与项目应该去耦合，使用git将环境与项目隔离。第一步将hub工作空间设置为git目录，忽略src/*。将hub工作空间的编译环境与项目隔离开来，这样环境的升级更新都不会影响项目源码(src/*)。下一步我们将src/vueSample等项目源码目录分别设置git，开发人员的推送与拉取都被限制在指定的项目中。

```bash
hub工作空间  # ==> 设置环境git，忽略src/*
  ├── build
  └── src
       └─ vueSample # ==> 设置项目git
```

#### 启动项目  

使用命令行可以支持单项目启动和多项目启动，也可以通过配置文件指定启动的项目。

### SPA && MPA

是SPA项目，是MPA项目，甚至是MixPA。`hub`作为全栈脚手架必须都得支持。MPA很简单，node端输出的页面都是独立的页面，有模板就行，是天然的MPA模式。

`hub`的文档演示项目是一个MPA+SPA混合的演示项目，下面是文档项目的目录结构，每个目录输出一个页面，每个页面由SPA构成

```bash
hub工作空间
  ├── mdSample
       ├─ dir1 # => page1.html
       ├─ dir2 # => page2.html
       └─ dir3 # => page3.html
```  

SPA需要引入前端路由，vueSample的演示项目使用vue-router，文档项目中我们仿造小程序造了个新轮子

### NODE端

MPA这样的项目，前端必然有很多入口文件，如果手动去生成node端的文件就有那么一点点低级了，因为你很大可能还要手动生成css/html/store/reducer。`hub`可以依据前端的业务JS动态创建node端服务

#### 路由  

`镜像路由`  
通过webpack的entry构建的node路由，称之为镜像路由，镜像路由可以提供页面渲染服务和API数据接口服务

镜像路由示意结构  

```bash
reactSample
     └── js
       └── user/index.js
  └── server
       └── user/index.js #

# 镜像路由  http://www.abc.com/user
# node端controler文件  server/user/index.js
```

我们知道koa2是典型的MVC后端模型，view对应模板，model对应数据层(由业务驱动，大部分是ajax数据)。所以`hub`真正要处理的是构建路由关系，并创建controler文件。

将entry的trunk与koa-router绑定，就构成与前端的镜像路由关系(一一对应)，同时输出其controler文件用来处理GET/POST/PUT/DELETE等事务

`自定义路由`  
有些路由与页面没有关系，比如上传，API接口就属于这一类特殊的路由，所以我们还需要通过plugins来手动创建自定义的路由

#### 插件

插件用来创建自定义路由与创建功能模块，自定义路由如上所述。

功能模块的典型应用是数据库请求。controler层一般都需要发起数据库请求，插件将功能模块绑定到koa的context上。注意这个过程是一个预处理过程，而controler层的运行则属于运行时过程，因此只要controler层有需要就可以从koa的上下文中获得数据处理模块用来发起数据库请求

自带的演示项目
----------------

项目包含（REACT/VUE/小程序/MD 文档系统）等 4 套 DEMO 演示项目，每个项目即是独立项目，又能够通过node端实现资源互通。方便快速上手各套环境。

### Vue 演示 DEMO

**vueSample**，基于vue2.0 的空项目，包含vue-router简单项目演示  

vue的演示项目没有上vue3.0，因为开发时vue3.0周边库还没有稳定，打算让它再飞一会，你也可以自行引入，[**更多说明**](http://www.agzgz.com)

### REACT 演示 DEMO

**reactSample**，一个空项目，包含REACT16 的简单演示。

### 小程序演示 DEMO

**xcxSample**，是原生微信小程序开发，支持云开发，该项目包含我们开发的小程序库queryUI库及相关组件，清空相关引用就是一个完整的小程序官方示例代码。[**更多说明**](http://www.agzgz.com/minip)

- 动态样式支持
- webpack的各种插件支持
- 原生微信小程序
- 动态模板构建
- template less
- 支持钩子方法
- 内置支持 MARKDOWN 富文本
- 内置支持 HTML 富文本
- 由aotoo库构建

### MD文档系统

这里重点讲一下文档系统，文档系统是一套hub环境的完整演示，包含前端编译，路由，NODE 端镜像路由、插件，MPA/SPA应用，命令行的使用等等，[**更多说明**](http://www.agzgz.com/doc)  

- 全栈系统
- 栏目首页由 node.js 做服务端渲染 (SSR)，浏览器端复用后渲染 (CSR & SPA)  
- 栏目项是多页应用(MPA)切换页面；菜单项是单页应用(SPA)切换路由
- 自定义同构方法，Fether/requireMarkdown等，Fetcher前端axios构建，node端got构建
- 仿小程序的前端路由，构建时可以根据路由切割代码，按需加载 js 文件，支持SSR
- 仿小程序生命周期，让page代码、component代码有更清晰的功能划分
- template less，尽可能的少写模板，将模板逻辑交由JS实现(aotoo库的核心功能)
- 支持 markdown
- 支持 SEO，内部自动解决在浏览器端复用服务端渲染的 html 和数据，无缝过渡
- 多场景化，测试，生产一应俱全
- aotoo库构建(react的封装库，react组件jquery化)([说明](http://www.agzgz.com/aotoo))  

目录结构
---------------

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb7a50c76e2e4d5099891fe22166fcac~tplv-k3u1fbpfcp-watermark.image)

`aotoo-hub`安装完成后的目录结构

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

### 说明  

#### aotoo.config.js

项目配置文件，包含项目版本，项目类型，项目源码目录等各种配置  

```js
apps: [
    {
      name: 'reactSample', // 项目名称
      version: '1.0.1',   // 项目版本，每个项目有自己的版本
      startup: true,      // 是否默认启动
      server: false,      // 是否提供node端服务，默认为`dev-server`提供服务
      type: 'web',        // 项目类型, 'mp'为小程序
      src: path.join(ROOT, 'src/reactSample'), // 源码目录
      micro: false,       // 是否微服务模式(开发中，未完善)
      options: {          // 项目扩展参数
        scenes: 'default',// 默认项目环境，将生成环境配置文件
        cloud: false,     // 小程序项目是否启动云端
      },
      port: 8500          // 项目端口
    },

    {
      name: 'vueSample',
      ...
    },

    {
      name: 'xcxSample',
      ...
    }
  ],
}
```

#### configs目录

该目录存放环境配置，编译器会根据命令行所给出的环境参数生成相关的配置，比如测试环境(test=>test.js)

```bash
aotoo dev --config test
```

#### dist目录

该目录存放前端编译文件，包含版本目录，开发目录，生产目录

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录
            │── js/index.js
            │── html/index.html
             ...
            └── mapfile.json # 静态资源镜像文件

        └─ pro # 生产目录
            │── js/index_[hash].js # 生产文件会带上hash
             ...
            └── mapfile.json # 静态资源镜像文件
```

#### js目录

该目录存放前端JS源码，公共JS源码，业务JS源码

```bash
├─ js
    │─ vendors # 公共JS
    └─ index # 前端业务目录
      │─ index.js  # 业务 => dist/.../index.js
         │─ index.scss # 样式 => dist/.../index.css
         └─ index.html # 模板 => dist/.../index.html

    └─ shop # 前端业务目录
      │─ index.js  # 业务 => dist/.../shop.js
         │─ index.scss # 样式 => dist/.../shop.css
         └─ index.html # 模板 => dist/.../shop.html
```

**`编译思路`**  
编译器遍历业务JS文件并生成其配套资源(html/css/node)  

**`dll打包(vendors目录)`**  
这里dll打包指代打包`vendors.js`和`common.js`，需要注意的是，vendors是一套独立的webpack打包进程，与业务JS打包不在一个进程，将生成`dist/.../vendors.js`文件，`common.js`来自业务JS的分离代码(webpack的split)。其中`vendors.js`文件不支持热更新

**`业务打包`**  
业务打包以JS文件作为webpack的entry，通过loader模块同时生成其相关静态资源，如上例的shop目录

#### js/vendors目录

该目录存放通用代码或者框架库，比如在`vendors/index.js`中引入react或者vue，需要注意，该目录的内容会被应用到`node端`(如果启用了server服务)，所以一定要注意两端的兼容性写法

#### server目录

当你在配置中设置server参数为true时，编译器将会自动生成server目录，并将后端服务由`webpack-dev-server`转向由node端提供的服务  

**`镜像路由server/pages`**  
当你在配置中设置server参数为true时，编译器会遍历entry(业务JS)，并镜像生成其node端的controler文件，如上例shop

```bash
server
  └─ pages
      └─ shop
          └─ index.js
```

> controler文件默认提供渲染服务、GET、POST接口服务

**`node端插件server/plugins`**  
该目录需要手动生成，插件支持自定义路由，支持自定义功能模块

命令行工具
---------------

`aotoo-cli`是aotoo-hub的开发工具库，通过命令行模式操作[更多说明](http://www.agzgz.com)

### 系统环境

- mac osx
- linux
- 不支持~~windows~~，但 win10 的 linux 子系统可以
- node >= 12

### INSTALL

```bash
npm install -g aotoo-cli
aotoo -V # 检查是否安装成功
```

### USAGE

#### 新建工作空间

`init <dir>`

```bash
# 新建xxx项目
$ aotoo init xxx
```

#### 新建web类项目

`create <dir>`

自动创建pc/h5/公众号等web项目并启动项目  

```bash
# 新建项目
$ cd xxx
$ aotoo create projectName
```

> 将会在xxx/src目录下，创建项目目录`projectName`，按照提示输`Y`，回车继续  
> 完成安装后，修改`aotoo.config.js`，补充项目描述

#### 新建小程序项目  

`create <dir>`

适用于创建小程序项目

```bash
# 新建项目
$ cd xxx
$ aotoo create minip_name
```

> 将会在xxx/src目录下，创建项目目录`minip_name`，提示请输入`n`
> 完成安装后，打开`aotoo.config.js`，补充项目描述，重新启动项目

### 启动自带项目  

安装完成后，hub的src目录下包含4个演示项目，通过以下命令可以分别启动  

#### 启动文档项目  

```bash
# 文档项目属于默认项目，可以直接启动
$ aotoo dev
```

#### 启动VUE项目  

```bash
aotoo dev vueSample
```

#### 启动REACT项目  

```bash
aotoo dev reactSample
```

#### 启动小程序项目

编译完成后需要使用小程序开发工具打开终端黄色字体指示的目录  

```bash
aotoo dev xcxSample
```

### 工作模式

#### dev [name]

开发模式编译，并启动服务，前端支持热更新

```bash
# 启动aotoo.config中apps中的启动项目
$ aotoo dev

# 启动指定项目
$ aotoo dev project_name
```

#### dev-clean [name]

开发模式编译，清除common/vendors等dll文件，重新生成，并启动服务

```bash
$ aotoo dev-clean

# 启动指定项目，并清除该项目common的缓存
$ aotoo dev-clean project_name
```

#### dev-build [name]

开发模式编译，清除common/vendors等dll文件，重新生成，不启动服务

```bash
$ aotoo dev-build

# 编译指定项目
$ aotoo dev-build project_name
```

### 生产模式

#### build [name]

生产模式，纯编译输出，不启动服务

```bash
$ aotoo build

# 编译指定项目
$ aotoo build project_name
```

#### build-clean [name]

生产模式，清除common/vendors等dll文件，并重新生成，不启动服务

```bash
$ aotoo build-clean

# 编译指定项目
$ aotoo build-clean project_name
```

### 部署  

部署之前，需要先以生产模式编译

```bash
aotoo build-clean project_name
```

#### start [name]

生产模式，启动node服务

```bash
$ aotoo start

# 编译指定项目
$ aotoo start project_name
```

#### node启动  

```bash
# 编译项目，生产模式
$ node index.js

# 启动测试环境
$ node index.js --config test

# 进入源码server目录启动  
$ cd src/project_name/server
$ node index.js
```

#### pm2启动  

```bash
# 编译项目，生产模式
$ aotoo build-clean project_name

# 启动测试环境
$ pm2 start index.js -- --config test
```

### EXTEND PARAM 扩展参数

#### `--config <name>`

指定环境配置文件，配合node端一起使用  

```bash
# 开发模式，启动测试环境
aotoo dev --config test

# 生产模式，启动测试环境  
aotoo build --config test
```

#### `--name <name>`

启动指定项目，该参数可多项目同时启动

```bash
# 同时启动 xxx 及 yyy的项目
$ aotoo dev --name vueDemo --name reactDemo
```
