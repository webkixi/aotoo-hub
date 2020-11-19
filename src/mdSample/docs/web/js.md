# JS目录  

最重要的JS目录，编译器会自动扫描JS目录的文件和目录，用于生成所有静态资源及自动生成server端的contoler文件

## 项目结构图

```bash
workspace
 ├─aotoo.config.js  # 包含version版本参数
 └─src
    ├─ 其他系统
    └─ 文档系统
        ├── configs # node环境配置文件，默认包含default.js
        ├── venders # 第三方库文件目录+自定义公共库(前端)
        ├── dist      # 静态资源输出目录
        ├── css       # 样式资源输出目录
        ├── js        # 前端业务js目录(前端)
        └── server    # node端的源码目录
             │── pages  # node端的业务目录
             └── plugins # 自定义插件目录
```

在一个`aotoo-hub`的工作空间中可以包含若干项目，它们共同享有相同的编译环境，文档系统只是其中一个项目，并且所有项目的目录结构一致

`aotoo.config.js`  
项目配置文件  

## JS业务目录

该目录存放业务js文件，业务JS是我们开发的重心，此处依据小程序的开发原则，将样式，模板统统至于业务目录之下，由编译器自动处理静态资源而无需在业务中引入

```bash
├── js           # 业务js目录(前端)
     └─ vendors
         └─ index.js

     └─ index      # 首页
         │── index.js       # 首页js文件
         │── anyname.css    # 样式，支持stylus/sass/css
         └── anyname.html   # 模板，除非自定义，否则自动生成

     └─ product    # 商品页
         │── index.js
         └── anyname.css  
```

### `vendors目录`  

该目录下的js文件是独立打包的，我们可以将其理解为webpack的dll文件，但其实它是另一个编译进程，与业务的编译进程不是一条线，`vendors/index.js`会编译打包成`dist/js/vendors.js`，在模板中会被最先引入。

### `业务目录`  

hub编译环境会分别为每个业务模块生成独立的html、js、css静态资源  

index目录，对应`http://localhost/index`模块
product目录，对应`http://localhost/product`模块

### `静态资源`  

如上例目录结构`index`，编译器会将该目录生成`dist/index.html`并包含该页面所需静态资源JS和CSS

```
js/index/index.js ==> dist/js/index.js
js/index/anyname.css ===> dist/css/index.css
js/index/anyname.html ===> dist/html/index.html
```  

> `注意：`html文件和css文件不是必须的，CSS文件既可以如本例中使用，也可以放置在css目录中，而模板，如果不需要特殊模板，编译器会自动生成

### `模板源码`  

没有特殊指定模板时，编译器自动以下列模板作为标准模板，自定义模板请在下面的模板源码上增加相关静态资源

```html
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <title>~~pagetitle~~</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    ~~commoncss~~
    ~~env~~
  </head>
  <body>
    <div class="container" id="root">~~root~~</div>
  </body>
</html>
```

> `注意：`自定义模板时，保持上例中的模板并添加自由的静态资源
