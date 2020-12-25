# 介绍  

`aotoo-hub`作为一套通用型前端脚手架，无技术栈依赖，聚焦于多人协作及工程化。可以帮助开发者快速产出项目，喜欢折腾的可以研究下。

`aotoo-hub`是一套前端/NODE 端一体化设计的全栈脚手架，前端使用webpack4编译，node端使用koa2提供服务。hub可独立运行作为前端编译工具，也可配合node端部署线上服务

**独立运行时**，仅作为前端编译、输出静态资源工具，hub采用webpack对前端的资源进行编译，开发模式下由webpack-dev-server提供热更新支持，生产环境下仅产出压缩后的代码

**融合运行时**，node(koa2，koa-router)将接管webpack-dev-server提供后端服务，此时可实现SSR服务，API服务，可用于部署，提供线上服务

**一些特点**  

* 提供简单的命令行工具
* 编译环境支持多项目，共享编译资源及node_module
* 支持为React/Vue/Jq/原生js/小程序等项目提供编译环境  
* 规范的前端、node端目录结构
* 支持动态样式(sass/stylus)
* 支持多环境，命令行切换测试，生产等环境
* 支持node端(koa2)

**脚手架源码结构**  

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

**[GITHUB](https://www.github.com/webkixi/aotoo-hub)**  
**[更多说明](https://www.agzgz.com)**

hub脚手架开发的一些思路
--------------  

前端项目架构比后端项目架构更具有挑战性，为啥呢？一般后端架构(大部分中小项目)稳定在一个环境，语言，项目下，可能几年更新一次，而前端要应对多端输出，项目繁杂，多种框架，复杂组件等等情况，框架的更新还特别活跃，经常有学不动想放弃的感觉。

脚手架作为一个重要前端工具，特别需要有统一的，标准化的思想。好的脚手架能够能让开发，测试、运维的工作变得很爽。我们需要脚手架能约束、规范工程项目结构；有统一的编译环境；与项目去耦合；方便进行多人协作；还应该要简单，开箱即用，开发者只需关注业务，在生成的项目结构的基础上进行开发即可

### 与项目解耦

为什么需要将架构与项目去耦合，试想下，当一个公司存在n个项目时，架构师更新、维护不同项目，不同框架的脚手架，造成项目不稳定的风险，同时增加了架构师、开发人员、测试人员、运维人员，运营人员的时间成本，沟通成本。

### 技术栈无关  

公司项目类型很多，轻量，且需要快速迭代上线的项目，一般我们用vue；比较复杂，由多人协作共同完成的项目。一般我们用react；小程序也是前端的热门方向，还有老旧基于jq项目，因此脚手架需要能够支持编译多种前端框架

这个不是很难，在webpack中添加各种框架所需的配置就可以实现，hub目前支持React、Vue、Angular、Jquery、小程序等技术栈。

### 多项目支持

架构与项目去耦合，即可单个项目独立编译运行，又可以同时运行。所有项目共享hub工作空间的编译环境，共享工作空间的node_module。项目自有dist目录，启动时有分配唯一服务端口。如下图所示

```bash
工作空间
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

### 命令行工具

命令行需要简洁高效，能够实现环境初始化、项目初始化、开发模式、生产模式，环境切换，可以传递参数，支持一键部署

### 配置化

命令行、配置文件相辅相成，一个都不能少，配置能够简化命令行操作，比如需要同时启动多项目，设置某项目的环境等。

下例是hub项目的具体配置项

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

### 版本管理  

`环境与项目隔离`

隔离是为了更专注，各司其职，架构师更新环境，开发人员更新业务，互不干扰，编译环境与项目去耦合。使用git能够很方便的实现这一设想，如下图  

```bash
工作空间  # ==> 设置环境git，忽略src/*
  ├── build
  └── src 
       └─ vueSample # ==> 设置项目git
```

在使得命令行工具可以支持在项目源码目录中执行，开发人员使用vscode仅仅打开vueSample目录就可以心无旁骛的开始开发工作。

```bash
# 在hub工作空间目录下  
aotoo dev vueSample # 运行开发环境

# 在项目vueSample目录下
cd src/vueSample
aotoo dev vueSample # 在项目源码目录中也可以启动开发环境
```

`项目版本`  
项目版本基于配置文件的version，项目的静态资源会被全部编译至`dist/${version}`目录，多个版本就会存在多个目录，方便回滚，备份等等保险操作，如下图  

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录
            │── js/index.js
            │── html/index.html
             ...
```

### 多环境  

test1环境，test2环境，test3环境...，脚手架通过命令行参数指定项目当前运行时环境配置，也可以设置配置文件来切换。  

现在很多公司都用到了apollo这样的云配置中心，这对于开发者来说非常不方便，有两种方案可以考虑，一是使用命令行传递不同参数，使项目调用云配置或者本地配置；二是在项目初始化时，在配置文件中创建方法去自动抓取云配置。

```bash
aotoo dev --config test1
```

### 规范项目目录  

设计合理、规范、灵活的模板对于项目结构的合理性非常有好处，因为我们都围绕模板来建立目录，产出资源，而任何资源最终都被用在模板上。

`模板的静态资源`  

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

如上例模板较为规范，可以很容易输出规范的项目目录结构，大致有如下  

```bash
 project
    ├── html
         └── index.html
    ├── css
         └── index.css
    └── js
         └── index.js
```

在hub项目中，大部分情况下我们可以省略html目录和css目录(无额外需求)，目录结构可以精简如下

```bash
 project
    └── js
         └── index.js
```

作为hub项目，它可以正常运行，hub在编译时会自动为该项目生成模板、样式、node等等。

`仿小程序目录结构`  
hub项目的目录结构也可以项小程序或者Vue这样设置，如下例

```bash
 project
    └── js
         └── user 
              ├── index.js  # 输出业务JS => user.js
              ├── index.css # 输出业务CSS => user.css
              └── index.html # 输出业务模板 => user.html
```

### 关于webpack的entry

前面刚说了模板很重要，但却选择了基于JS索引生成webpack的entry，这里有一个假设前提，即每一个模板页面必然包含一个业务JS。

基于JS索引构建的entry对于webpack来说有天然的亲和性，可以使用webpack-html-plugins自动生成其对应的模板。

作为编译入口，我们可以为webpack的entry赋予了更多的职能，为entry的每一个trunk编译其静态资源、生成node端路由、生成node端api等等。

`reactSample`  
hub的演示项目reactSample目录结构非常简单，构成如下

```bash
reactSample
     ├── configs/default.js # 环境配置，实际上也是编译时生成的
     └── js/index/index.js
```

该项目所需的资源文件在编译时自动生成，样式在运行时由JS注入，生产环境提供node服务，开发环境提供dev-server服务。服务端提供模板渲染、镜像路由，镜像API等服务。而这些只是一个命令`node index.js`就ok了

### 多页和单页

终极目标当然是实现MPA-SPA混合模式，即多-单页模式，H5需要SPA，PC需要MPA+SPA。MPA很简单，node端输出的页面都是独立的页面，有模板就行，是天然的MPA模式。

```bash
hub工作空间
  ├── mdSample
       ├─ dir1 # => page1.html
       ├─ dir2 # => page2.html
       └─ dir3 # => page3.html
```  

hub也能够很容易的为react，vue提供MPA-SPA模式，这是hub脚手架自带的buf

### Node中间层

引入node端可以解决  

* 跨域
* 独立部署
* 自定义API
* mock服务
* seo

#### 路由  

`镜像路由`  
通过webpack的entry构建的node路由，称之为镜像路由，镜像路由可以提供页面渲染服务和API数据接口服务

镜像路由示意结构  

```bash
reactSample
     └── js
       └── user/index.js # 前端
  └── server
       └── pages/user/index.js # node端

# 访问镜像路由  http://www.abc.com/user
# 请求API数据路由  ajax.post('/user', {...}).then(res)  
# node端controler文件  server/pages/user/index.js  
```

我们知道koa2是典型的MVC后端模型，view对应模板，model对应数据层(由业务驱动，大部分是ajax数据)。将entry的trunk与koa-router绑定，就构成与前端的镜像路由关系(一一对应)，同时输出其controler文件用来处理GET/POST/PUT/DELETE等事务

`自定义路由`  
有些路由与页面没有关系，比如上传，API接口就属于这一类特殊的路由，所以我们还需要通过plugins来手动创建自定义的路由

#### 插件

插件用来创建自定义路由与创建功能模块，自定义路由如上所述。

功能模块的典型应用是数据库请求。controler层一般都需要发起数据库请求，插件将功能模块绑定到koa的context上。注意这个过程是一个预处理过程，而controler层的运行则属于运行时过程，因此只要controler层有需要就可以从koa的上下文中获得数据处理模块用来发起数据库请求

### 小程序支持

对于小程序项目，我们要控制webpack输出，不要让它做多余的事情，最终输出代码由微信小程序开发工具来处理

按照1:1对等输出小程序源码，仅利用webpack处理一下小程序的一些小毛病，比如markdown，动态样式，html等等。(输出不会产生webpack的冗余代码)，支持热更新

使用webpack参与小程序编译，我们可以使用loader/plugins实现一些想法，比如写个loader，将微信小程序转译成其他小程序，只是对照表有点麻烦，思路应该是可行的

### 兼容老旧项目

我也是个前端老人了，前端切图仔的岁月依稀在眼前，前端后端的融合开发模式(java渲染模板)痛点在于你要搭一个java环境，你需要知道模板中的每一个ID，你对模板庞杂的结构了若指掌。  

在脚手架编译的同时，将所有资源收集起来并整理一份资源文件(mapfile.json)，包含JS/HTML/CSS/IMAGE等信息。将mapfile.json交给java大佬，将静态资源文件目录(dist)交给运维大哥，请求java大佬写一份脚本自动匹配静态资源。

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

![](/images/structor.jpg)

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

`aotoo-cli`是aotoo-hub的命令行开发工具库，安装、编译都需要通过此工具来操作[更多说明](http://www.agzgz.com)

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

#### 安装一个新的hub空间

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

**[GITHUB](https://www.github.com/webkixi/aotoo-hub)**  
**[更多说明](https://www.agzgz.com)**
