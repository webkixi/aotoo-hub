# 文档系统

`aotoo-hub`的自带演示文档系统，就是你现在看到的文档系统，它包含以下特点

- 全栈系统
- SPA/MPA(多单页系统)
- 仿小程序的路由
- 支持 markdown
- 支持 SEO
- 多场景化
- 支持动态样式编译(stylus/sass)

文档系统是一套完整的示例项目，阅读文档系统的代码，有助于你熟悉和使用hub系统

## 全栈

文档系统是一套全栈项目，前端 webpack4 提供编译服务，node 端由 koa2 提供渲染服务

### 项目目录结构

```bash
workspace
 ├─aotoo.config.js
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

#### `dist 目录`

存放前端编译后的静态资源，包含版本，js/css/html 等静态资源目录

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录，包含js/html/css文件及目录
         │── js/index.js
         └── html/index.html
          ...
     └─ pro # 生产目录
         └── js/index_[hash].js
             ...
```

#### `css 目录`

该目录存放样式资源，同名业务样式(与 js 中对应)会自动引入模板，建议将业务样式页业务 JS 放置在 js 业务目录中

```bash
├── css             # css目录(前端)
  ├── common.css  # 公共样式，如此文件不存在，则不会生成和引入到模板中
  └── index.css   # 同名(对应js业务)样式文件
```

#### `js 业务目录`

业务 JS 是我们开发的重心，依据小程序的开发原则，支持将样式，模板放置于此目录之下，编译器自动处理静态资源，并在模板中自动引入静态资源

```bash
js
 └─ index    # 首页
     │── index.js       # 首页js文件
     │── anyname.css    # 样式，支持stylus/sass/css
     └── anyname.html   # 模板(ejs)，除非自定义，否则自动生成

 └─ product    # 商品页
     │── index.js
     └── anyname.css
```

#### `server 目录`

该目录存放 node 端的路由业务页面(Controller)，当启动 server=true 的配置时，会自动生成对应的路由页

```bash
server
  └── pages  # node端业务目录
     │── index.js    # 同名镜像文件(对应js业务目录)，node端的controler层
     └── product.js  # 同上，皆为编译器自动生成
```

#### `server 的自动路由页`

编译器依据镜像原则，在 pages 目录下创建同名 node 端的 controler 文件，包含`GET/POST`处理方法，同时也可以作为 API 方法对外提供数据服务

```js
module.exports = function (oridata) {
  return {
    get: function name(ctx) { ... },
    post: function name(ctx) { ... }
  }
}
```

#### `SEO`

同构首页，对应的 JS 中定义路由表的页面

```js
import index from "js/index";
module.exports = function(oridata) {
  return {
    get: async function name(ctx) {
      oridata.root = await index;
      return oridata;
    },
  };
};
```

### 配置化

打开`aotoo.config.js`文件，修改项目配置

```js
apps: [
 // 项目aaa
    {
      name: 'aaa',
      version: '1.0.1',  // 项目版本号
      startup: true,
      server: true,  // 是否提供node服务，否则由webpack-dev-server提供
      src: path.join(ROOT, 'src/aaa'),
      options: {
        scenes: 'default' // 指定默认场景
      },
      port: 8500  // 指定项目端口
    }
  ],
}
```

> 编译器会依据目录名生成业务 js，并自动生成相关静态资源，如 css/html

### 仿小程序路由

实现小程序路由方法

- navigateTo
- navigateBack
- redirectTo
- redirectBack

### SPA/MPA(多单页系统)

hub 是一套全栈前端脚手架，我们做了大量的开发，使前后端能够有机的结合，hub 本身的起源就是多页(MPA)系统，如上例中`index/product`都会生成相应的模板和链接

在切入小程序后，hub 又融入了小程序的开发思想，使用 aotoo(基于 react)我们仿造了小程序的路由，这是又一个前端轮子，但非常值得

同时这一套路由能够支持 node 端的 seo 输出

### 命令操作

安装完`aotoo-hub`之后，通过`dev、build`简单命令就能启动该项目

```bash
aotoo dev  # 开发模式，编译+服务+热更新
aotoo build # 生产编译

node index.js # 启动项目
pm2 start index.js # 使用pm2启动项目
```

### 多环境

通过命令行切换多个环境，如测试、生产等环境

```bash
# 开发启动环境
$ aotoo dev --config test

# pm2 启动测试环境
$ pm2 start index.js -- --config test
```
