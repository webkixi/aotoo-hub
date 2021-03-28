# 从0开始创建一个web空项目

创建工作空间
----------------

```bash
aotoo init xxx  # 新建工作空间目录
```

创建新项目
-----------------

```bash
cd xxx 
aotoo create project  
```

编辑配置文件
-----------------

```bash
vim aotoo.config.js # 或者使用vs code打开该文件
```

**编辑 apps 字段**  

```js
apps: [
    // 新建的自定义项目
    {
      name: 'project',
      version: '1.0.0',  // 项目版本
      startup: true,    // 设为true，命令行不用指定--name参数
      server: false,    // 是否需要node提供服务
      src: path.join(ROOT, 'src/project'),  // 指定项目源码目录
      port: 8500  // 指定项目端口
    }
  ]
}
```

启动新项目
----------------

**启动新项目方法-1**  
在工作空间中启动新项目

```bash
aotoo dev # 配置startup为true的项目会自动启动

# 或者  
aotoo dev project
```

**在项目目录中启动项目**  
在方法一种，我们的位于工作空间目录中，在这一层目录中可以方便的启动多个项目。开发人员也可以进入项目目录启动本项目

```bash
cd xxx/project  # 进入项目目录中
aotoo dev project
```

上例这种启动方式可以更专注于项目开发，比如我们使用vs code打开项目目录，并直接在该目录中启动项目，不会受到其他项目文件的影响

目录结构  
----------------------

当新项目创建完成，会生成如下的目录结构。

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       └─ project
             ├── configs # node环境配置文件，默认包含default.js
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录(前端)
                 │── venders # 第三方库文件目录+自定义公共库(前端)
                 └── index   # 业务首页
                 ...
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录
                   
```

### 新建业务页面  

观察上述项目目录`JS`目录中，webpack会将vendors目录下的文件打包成vendors.js，非vendors目录作为业务文件打包，如index目录作为首页的依赖js文件，业务中重复引用的js库文件打包成common.js，最终生成的html结构如下  

```html
<html>
  ...
  ...
  <script type="text/javascript" src="/js/vendors.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/index.js"></script>
</html>
```

现在我们需要新增一个用户页面`user.html`，其访问地址为`http://www.xxx.com/user.html`，我们应该如何操作呢？只需要新增一个js文件即可  

**前端文件结构**  

```bash
...
...
├── js    # 前端业务js目录(前端)
     │── venders # 第三方库文件目录+自定义公共库(前端)
     │── index   # 业务-首页目录
     └── user   # 业务-用户目录
          └── index.js   # 用户核心js文件  
```

hub编译环境将自动为`user`模块新增html模板，css样式(如果有)，server端control文件(配置server为true)，在dist目录中会看到如下文件结构  

**静态输出文件结构**  

```bash
...
...
├── dist  # 输出目录
     ├── pro # 生产环境
          └── ...
          
     └── dev # 开发环境目录
          └── 1.0.0   # 版本目录
                │── common.js   # 业务-用户目录
                │── index.js   # 用户核心js文件  
                └── user.js   # 用户核心js文件  
```

**node端文件结构**  

如果需要提供node端的服务，请在`aotoo.config.js`文件中找到该项目的配置项，并将server置为true状态。

```bash
├── js    # 前端业务js目录(前端)
     │── index   # 业务-首页目录
     └── user   # 业务-用户目录

├── server    # node端
     │── pages # pages为node端业务目录
          │── index.js   # 业务-首页control文件
          └── user.js   # 业务-用户control文件
```

当server配置为true时，hub会自动为前端业务js构建koa的`镜像路由`。pages目录下的js文件，它们实际上是koa的control层文件，与前端js文件程镜像模式(1对1)，并提供`GET/POST`服务。hub会将前端模板(上例模板为自动生成)作为node端的view层模板输出(ejs模板)。

### 样式

**业务样式**  
为业务-用户模块(user.js)配置独立的样式文件(支持less, sass, stylus)

```bash
...
...
├── js    # 前端业务js目录(前端)
     │── venders # 第三方库文件目录+自定义公共库(前端)
     │── index   # 业务-首页目录
     └── user   # 业务-用户目录
          │── index.js     # 用户核心js文件  
          └── index.less   # 用户核心css文件  
```

html输出结构如下  

```html
<!-- user.html -->
<html>
  <head>
    ...
    ...
    <link rel="stylesheet" href="user.css"></link>
  </head>
  ...
  ...
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/index.js"></script>
</html>
```

**公共样式**  

```bash
...
├── css    # 前端业务js目录(前端)
     └── common.less # 生成公共样式common.css
├── js
     └── ... 
```

输出结构为

```html
<head>
  ...
  <link rel="stylesheet" href="common.css"></link>
  <link rel="stylesheet" href="user.css"></link>
</head>
```
