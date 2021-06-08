# NODE 路由

文档系统是一套全栈型的静态文档系统，包含 NODE 端路由和前端路由两个路由部分，使用 MPA + SPA 的混合模式切换页面

**MPA 路由**  

多个模块间切换(URL切换)属于 NODE 路由的范畴，每一个模块对应 NODE 路由的一个URL，模块间的切换等于一个页面切换到另一个页面，浏览器向 NODE 端发送请求，NODE 端响应并渲染对应 URL 页面

**SPA 路由**  

每一个模块由多个页面构成，模块内切换使用 SPA 路由模式，由JS调起相关文件，并渲染到指定的ID结构中

## NODE端路由组件

文档系统使用自研的路由库 @aotoo/aotoo-react-router ，基于 KOA2 技术构建。支持镜像路由和自定义路由，支持自定义插件  

### @aotoo/aotoo-react-router  

@aotoo/aotoo-react-router 路由库只适用于 AOTOO-HUB 脚手架产出的前端架构，请勿在其他项目中使用

* 支持在配置中注册 KOA2 插件
* 支持镜像路由  
* 支持自定义路由  
* 支持自定义插件  
* 与 AOTOO-HUB 前端WEB项目深度融合

**安装**  
安装 AOTOO-HUB 脚手架后会自动安装该路由库

```bash
npm install @aotoo/aotoo-react-router
# 或者
yarn add @aotoo/aotoo-react-router
```

**默认依赖**  

```
"@koa/cors": "^3",
"@koa/multer": "^3",
"@koa/router": "^9",
"aotoo-inject": "^2",
"app-module-path": "^2.2.0",
"art-template": "^4",
"bluebird": "^3",
"chalk": "^4",
"debug": "^2.6.8",
"glob": "^7",
"got": "^11",
"htmlparser2": "^4.0.0",
"koa": "^2",
"koa-art-template": "^1.1.1",
"koa-bodyparser": "^4.2.0",
"koa-session": "^6",
"koa-static-cache": "^5",
"lodash": "^4.17.20",
"lru-cache": "^6",
"md5": "^2.2.1",
"multer": "^1.4.2",
"socket.io": "^2"
```

## 镜像路由  

MPA 路由模式的一种实现方法，使前端不同模块对应 NODE 端不同 URL，形成映射关系，可以很方便的就构建出了 NODE 端路由  

如果在配置中设置 server=true 时，AOTOO-HUB 在编译构建项目的同时会自动构建 NODE 端的镜像路由。默认镜像路由的深度为3层，即可以路由到模块的子页面，如 A/B/C.html

### 映射关系

**项目目录**  

```bash
workspace
 └─src
    └─ 文档项目
        ├── ...
        ├── js        # 前端业务js目录(前端)
        └── server    # node端的源码目录
```

上例仅仅列出了前端源码目录和SERVER端源码目录

**前端目录**  

```bash
文档项目
 └─js
    └─ product   # 产品模块
        └── index.js 
        
    └─ user   # user模块
        └── index.js 
```

**SERVER端目录**  
KOA2 是经典的 MVC 服务模式，HUB 会自动生成路由对应的 CONTROL 文件，返回 POST/GET 数据交由渲染层输出页面  

```bash
文档项目
 └─server
    └─ pages   
        ├── user.js    # 由 HUB 自动镜像生成
        └── product.js 
```

通过上面结构示例，可以清楚的了解到 AOTOO-HUB 镜像文件生成逻辑

### 控制层

KOA2 是经典的 MVC 模型，绝大部分逻辑在 CONTROL 层完成并生成数据交给渲染层。镜像路由的 CONTROL 层模板会被自动创建  

**NODE端 CONTROL 文件**  
接收前端的 GET/POST 请求并响应

```js
// server/pages/user.js 

module.exports = function (oridata) {
  return {
    get: async function name(ctx) {
      const aks = ctx.aks
      if (aks.isAjax()) {   // request.header._isajax_ = true
        ctx.body = {....}
      } else {
        oridata.title = 'aotoo-hub 多项目全栈脚手架'
        oridata.root = await index
        return oridata
      }  
    }, 
    
    post: function name(ctx) {
      return oridata
    }
  }
}
```

**前端GET请求**  

```js
// js/user/index.js

import axios from 'axios'
let data = {"code":"1234","name":"yyyy"};
axios.get(`/user`,{
  params: data,
  headers: {_isajax_: true}
})
.then(res=>{
  console.log('res=>',res);            
})
```

**前端POST请求**  

```js
// js/user/index.js

import axios from 'axios'
let data = {"code":"1234","name":"yyyy"};
axios.post(`/user`,data)
.then(res=>{
  console.log('res=>',res);            
})
```

## 自定义路由  

有些服务并不适合镜像路由，如上传服务。这时候我们需要自定义路由来响应这些请求  

### 存放目录

```bash
文档项目
 └─server
    └─ pages   
        ├── user.js    # 由 HUB 自动镜像生成
        └── product.js 
    └─ plugins   
        └── uploader.js    # 自定义路由文件，响应上传请求  
```

### 上传 CONTROL

```js
// server/plugins/uploader.js

const fs = require('fs')
const path = require('path')
const multer = require('@koa/multer');
const uploaderRoot = CONFIG.server.uploads
if (!fs.existsSync(uploaderRoot)) {
  fs.mkdirSync(uploaderRoot)
}

//上传文件存放路径、及文件命名
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploaderRoot)
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})

//文件上传限制
let defaultLimits = {
  fields: 10, //非文件字段的数量
  fileSize: 500 * 1024, //文件大小 单位 b
}

function getUpload(lmt={}){
  let limits = Object.assign({}, defaultLimits, lmt)
  return multer({storage, limits})
}

// 单个文件上传
async function save2localSingle(ctx, next){
  const upload = getUpload({files: 1})
  await upload.single('file')(ctx, next).then(async ()=>{
    ctx => {
      console.log('ctx.request.file', ctx.request.file);
      console.log('ctx.file', ctx.file);
      console.log('ctx.request.body', ctx.request.body);
      ctx.body = 'done';
    }
  })
}

export default function(aks){
  // 自定义路由  
  aks.routepreset('/uploader-single', {
    customControl: save2localSingle
  })
}
```

上面的例子创建了一个自定义路由 uploader-single，前端向该接口发起请求即可得到响应数据，并将图片存储在服务器端

**routepreset**  
自定义路由方法，执行预先定义好路由响应方法。AOTOO-HUB 在编译过程中会自动引用并执行该方法

**customControl**  
自定义 CONTROL 方法  

ctx  
参数一，KOA 自定义插件的上下文对象  

next  
参数二，KOA 自定义插件 next 参数  

**前端请求**  

```js
const uploadButtonChange = function(e){
  const files = e.target.files;
  const fd = new FormData()
  fd.append('file', fileBtn.files[0])
  fd.append('userName', userName.value)
  fd.append('age','18')
  fetch('/uploader-single', {
    method: 'POST',
    body: fd,
  }).then(res => {
    if(res.ok) {
      console.log('success')
      return res.json();
    } else {
      console.log('网络错误')
    }
  }).then(res => {
    console.log('res is',res);
  })
}
```
