# CSS目录  

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

## CSS目录

该目录存放样式资源，可以将业务对应的样式文件放在此目录下(同名)，也可以将样式资源放置在JS业务目录中  

```bash
├── js           # 业务js目录(前端)
     └─ index      # 首页
         │─ index.js       # 首页js文件
         └─ anyname.css    # 样式，支持stylus/sass/css
     └─ product
         └─ anyname.css
├── css
  ├─ common.css  # 公共样式，如此文件不存在，则不会生成和引入到模板中
  ├─ index.css   # 同名规则，需要定义样式文件名与js模块目录名相同
  └─ product.css   # 同名规则，需要定义样式文件名与js模块目录名相同
```

### `common样式`  

common样式可以支持`stylus|sass`动态等动态样式，common样式必自动被页面模板引用

### `业务样式`  

```bash
css/index.css合并js/index/anyname.css --> dist/css/index.css  
css/product.css合并js/product/anyname.css --> dist/css/product.css  
```

将业务样式放置在css目录中或者js模块目录中取决于你的项目规范，业务样式会自动
编译并被插入到模板当中
