# 快速开始 web 项目

默认项目为空，只输出了目录结构

`新建hub的工作空间`

```bash
aotoo init workspace
cd workspace
```

`新建web项目和首次启动`

```bash
aotoo create project # 新建项目
```

> `注意：`看到提示，选择 y

`再次启动`

```bash
cd workspace
aotoo dev project
```

`配置项目`

你应该填写好该项目的配置，打开 aotoo.config.js，编辑 apps 字段

```js
apps: [
 // 默认项目，hub自带项目
   {
      name: 'aotooSample',
      startup: false,    // 改为false，使该项目默认不启动
      ...
    },

 // 新建的自定义项目
    {
      name: 'project',
      startup: true,    // 设为true，命令行不用指定--name参数
      server: true, // 是否需要node提供服务
      src: path.join(ROOT, 'src/project'),  // 指定项目源码目录
      port: 8500  // 指定项目端口
    }
  ]
}
```

`启动项目`

开发模式启动，编译并启动服务

```bash
aotoo dev # 或者 `aotoo dev-clean` 更彻底的启动，但慢一点
```

`生产模式`

生产模式，需要手动启动服务

```bash
aotoo build # 或者 aotoo build-clean
node index.js

# pm2启动服务
pm2 start index.js
```

## 编译思路

`aotoo-hub`的思路有些不同，通常我们从模板 html 开始构建，并为其匹配相应的静态资源，如 js，css，node 端路由等。hub 的不同之处在于我们从前端业务 js 开始

**从前端业务 js 开始，镜像生成与之匹配的静态资源**

为所有业务页面配置对应 js 文件，比如 shop 对应 shop.js(也可以是 shop/index.js)，user 对应 user.js。编译时会索引所有业务 js，并自动生成对应的静态资源，css，html，node 路由页，我们称之为镜像模式

### 目录结构

启动项目后，新项目目录结构如下

```bash
hub工作空间
  └── src
       └─ project
             ├── configs # 配置文件目录，默认包含default.js配置文件
             ├── venders # 第三方库文件目录+自定义公共库
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录，适用于node端
```

### 隐藏的目录

镜像模式中，html 目录和 css 目录默认不存在，但 dist 目录中则有，它们是编译时自动生成的。除非你需要自定义模板或者 css(手动创建)，如下面一样

```bash
hub环境
  └── src
       └─ newProject
              ├── html
              │    └── index.html
              ├── css
              │    └── index.styl # 自动编译，无需index.js中引入，并自动插入index.html模板中
              └── js
                   └── index.js
```

>

- 同名的模板 html 具有高权重，编译时将依据自定义模板生成
- 当存在 css 目录时，css 目录中的样式文件将自动生成并不依赖 js 文件中是否引入

### 代码分离

#### vendors.js

上例中的 vendors 目录将会生成`vendors.js`文件，模板会自动引入该文件，vendors 目录建议存放公共库，自定义公共方法

#### commmon.js

该文件根据 webpack 的代码分离方式产出，`common.js`会被模板页面自动引入

#### 模板中的 js

html 模板由 webpack 自动生成，并包含相关 JS 文件

```html
  <body>
    ...
    ...
    <script src='/js/vendors.js'>
    <script src='/js/common.js'>  <!-- 该文件有可能不存在 -->
    <script src='/js/index.js'>
  </body>
```

### configs 目录

```bash
project
   └── configs
         └── default.js # 默认生成
```

存放 node 端需要的配置文件，包括开发环境、测试环境，生产环境，通过命令行参数`--config`自动生成

```bash
$ aotoo dev --config test

# 目录文件
# configs
#   ├── default.js # 默认生成
#   └── test.js # 默认生成
```

上例命令执行后，`configs`目录中存在两个文件，`default.js和test.js`，最终 node 端获取到的配置文件是它们合并后的结果

### server 目录

```bash
 js
  ├── index.js
server
  │── pages  # node端的业务目录
  │     └── index.js
  └── plugins # node端插件目录
```

依据镜像原则，当配置中的 server 字段为 true 时，会自动扫描 js 目录中的所有目录及文件，并对应生成`server/pages/***` 下的路由文件

#### pages

server/pages/index.js

```javascript
module.exports = function(oridata) {
  return {
    get: async function name(ctx) {
      oridata.pageTitle = "aotoo-hub全栈脚手架";
      return oridata; // 返回数据并渲染index.html
    },
    post: function name(ctx) {
      return oridata; // 作为接口返回数据
    },
  };
};
```

#### plugins

node 端插件目录，用于自定义动态路由，node 端工具方法等

### dist 目录

webpack 编译后的输出目录
