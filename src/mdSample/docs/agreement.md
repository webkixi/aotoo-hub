# 约定

## 命名约定

- `_`  
  `_`下划线开始的文件和目录，如`_a.js` 或者 `/_a/`在编译时会自动忽略不会生成对应的文件，但你可以引入该文件，或者该目录下的文件

- `-`  
  不要以`-`中划线命名文件，如`a-b.js`

## 别名约定  

hub将项目中的一些常用目录可以通过别名的方式访问(webpack别名)，这样我们在项目中可以快速引用相关的库文件。别名配置请查看`build/webpack.alias.config.js`文件

### 常用别名目录  

#### components  

通用组件库，前端和node端都可以直接引入该目录下的库文件

位置  

```bash
└─ project
      └── components    # 组件库目录
      └── js        # 前端业务js目录(前端)
```

使用

```js
const button = require('components/button')
```

#### common

通用库目录，前端和node端都可以直接引入该目录下的库文件
位置  

```bash
└─ project
      └── common        # 通用库目录
      └── components    # 组件库目录
      └── js        # 前端业务js目录(前端)
```

使用

```js
const lib = require('common/lib')
```

#### configs

通用配置文件存放目录，前端和node端都可以直接引入该目录下的库文件
> 注意： node端有全局配置变量`CONFIG`，由hub在编译时挂载在global上

位置  

```bash
└─ project
      └── configs        # 通用配置目录
      └── common        # 通用库目录
      └── components    # 组件库目录
      └── js        # 前端业务js目录(前端)
```

使用

```js
const config = require('configs/default')
```

#### css  

业务样式目录，仅前端支持
> 注意：同构项目中，node端并不支持引入动态样式  

位置  

```bash
└─ project
      └── css        # 样式目录
      └── configs        # 通用配置目录
      └── common        # 通用库目录
      └── components    # 组件库目录
      └── js        # 前端业务js目录(前端)
```

使用

```js
// /index.js
require('css/index.less')  // 第二种业务样式引入方式
```

## 特殊文件

### common.css

`common.css`是页面的公共样式文件。当我们在项目 CSS 目录中定义了`common.css|common.styl|common.scss`的时候，编译器将会输出`dist/css/common.css`，该文件作为公共样式文件被自动插入到 html 模板当中

### common.js

`common.js`是页面的公共 JS 文件。`common.js`由 webpack 通过代码分离的设置自动生成，该编译文件请参考`build/env_attrs.js`文件

### vendors.js

`vendors.js`是每个项目必须文件，对应项目目录为`js/vendors`，该文件默认为空，该文件应该放置前端公共库，编译器将自动编译输出`dist/vendors.js`

> `注意：`该文件会被前端、NODE端分别引入，需要注意对于两端的兼容性写法

**vendors.js的正确写法**  

/js/vendors/index.js

```js
function isClient() {
  return typeof window === "undefined";
}

function getGlobalContext() {
  if (isClient()) {
    return window;
  }
  return global;
}

let context = getGlobalContext();

context.a = "123";

context.axios = function() {};

if (isClient()) {
  /* 前端代码 */
} else {
  /* node端代码实现 */
}
```
