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

安装与运行
---------------

`aotoo-cli`是aotoo-hub的命令行工具库，aotoo-hub需要使用该工具进行安装，编译[更多说明](http://www.agzgz.com)

### 系统环境

- mac osx
- linux
- 不支持~~windows~~，但 win10 的 linux 子系统可以
- node >= 12

### 命令行一览

```bash
aotoo init <work-space-name> # 新建工作空间
aotoo create <project-name> # 新建本地项目  
aotoo install <url> # 安装远程项目

aotoo dev [project-name] # 启动项目开发环境  
aotoo dev-clean [project-name] # 启动项目开发环境，并清空缓存

aotoo build [project-name] # 生产编译项目资源
aotoo build-clean [project-name] # 生产编译项目资源，并清空缓存

aotoo start [project-name] # 本地启动生产模式，需要先以生产模式编译

aotoo dev [project-name] --config test # 启动测试环境，开发模式
aotoo dev [project-name] --config test1 # 启动测试环境，开发模式
aotoo dev [project-name] --config test2 # 启动测试环境，开发模式
aotoo dev [project-name] --config ....  # 启动测试环境，开发模式

aotoo dev --name proj1 --name proj2 --name proj3 # 同时启动多个项目的开发环境

# 部署
node index.js --config test  # 使用node启动测试环境的生产项目(需完成生产编译)
pm2 start index.js -- --config test
```

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

#### 安装远程项目  

支持远程git项目和zip项目

```bash
cd workspace

# 安装远程git项目到本地
aotoo install https://github.com/webkixi/hub-vue2.git  # 从远程安装vue2基础项目

# 安装远程zip项目到本地 
aotoo install https://github.com/webkixi/hub-vue2/archive/master.zip # 从远程安装vue2基础项目zip版
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
