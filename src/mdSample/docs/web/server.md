# server目录  

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

## server目录

该目录将为项目提供node服务  

```bash
server
  └── pages  # node端的业务目录，由编译器自动创建
        │── index.js
        └── product.js

  └── plugins # 自定义插件目录
        │── api
        │    └── index.js
        └── uploader
          └── index.js
```

### pages  

当在配置中设置`server=true`时，编译器会扫描`js`目录，并创建`server/pages`目录以及对应业务(同名)的`controler`文件，如上述结构图中的`pages/product.js`  

`aotoo-hub`的server服务端是由`koa2`提供，默认支持3层路由，也支持自定义路由深度，这个在node服务中我们在细说  

```js
// 自动创建的controler文件
module.exports = function (oridata) {
  return {
    get: function name(ctx) {
      return oridata
    },
    post: function name(ctx) {
      return oridata
    }
  }
}
```

#### `get`

提供 `koa-router`的GET服务，支持页面渲染及ajax数据服务

#### `post`

提供 `koa-router`的POST服务，支持ajax数据服务

#### `oridata`  

模板(ejs)构建变量，挂载变量用于替换模板中的标记  

### plugins  

插件目录，该目录路需要手动创建  

我们可以使用插件来作自定义路由，当然插件也能够作为真正的插件使用，下面的例子中我们分别来介绍如何使用插件

#### `自定义路由`  

下例定义一个`/api`的路由作为接口地址前缀

```js
export default function(aks, app){
  aks.routepreset('/api', {
    customControl: apiControl
  })
}

async function apiControl(ctx, next){
  const aks = ctx.aks
  let route = aks.routePath
  if (aks.isAjax()) {
 ctx.body = {...}  // 返回响应数据
  }
}

// 前端通过ajax.get('/api/xxx', {...})请求数据
```

#### `自定义插件`

此例中定义了一个数据库插件，我们在运行时可以使用它来操作数据库

```js
// plugins/db/index.js
// db将作为插件名

class sqlClass {
  constructor(config){
  }
  append(){}
  find(){}
}

export default function(aks, app){
  return function(){  // 返回插件方法
    return new sqlClass({...})
  }
}
```

`使用插件`  
下例只是示范插件的用法  

```js
// 在自定义路由页面中使用  
export default function(aks, app){
  aks.routepreset('/api', {
    customControl: async function(ctx, next){
   const aks = ctx.aks
   const route = aks.routePath
   const dbConfig = {...}
   if (route === 'findUser') {
  let mysql = aks.db(dbConfig)
     let body = ctx.request.body
     let res = awiat mysql.find(body)
     ctx.body = res
   }
    }
  })
}
```
