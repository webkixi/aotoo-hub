# aotoo-hub

`aotoo-hub`是一套前端/NODE 端深度融合的全栈系统，`aotoo-hub`关注点在于编译，无任何库依赖，`hub`包含 4 套 DEMO 演示项目（REACT/VUE/小程序/MD 文档系统），方便快速上手各套环境。

`MD文档系统`是一套基于 markdown 的文档系统，正是你看到的这个，是使用`hub`的一个典型范例，包含前端编译，自定义前端路由(仿小程序)，NODE 端自动镜像路由，NODE 端插件使用，NODE 端自定义路由，命令行的使用等等，较全面的介绍了`hub`系统的使用[**_说明_**](http:www.agzgz.com/doc)

`hub`项目可以做到非常精简，这得益于`hub`**_从业务 JS 开始构建_**的独特编译流程，编译器基于业务 JS 结构衍生出其所需要的各项资源，如自动生成所需模板，自动构建 node 端的 controler 文件，自动归类输出静态资源等，当然编译器也能够支持复杂的自定义结构

[更多说明](http://www.agzgz.com)

## FEATHER

* 多项目开发、运行、部署
* 多环境支持，可以快速切换开发环境，测试环境，生产环境等
* 支持小程序开发
* 前端与node(koa2)端的融合式开发环境

## INSTALL

```bash
npm install -g yarn
npm install -g aotoo-cli
aotoo -V
aotoo init workspace   # 新建工作空间
```

## 快速开始

`aotoo-hub`包含前端/node端，开发会同时启动这两个部分，使之形成有机整体，node端由koa2封装而来

__新建项目__

```bash
aotoo create project # 新建项目
```

__配置项目__  
打开aotoo.config.js，编辑apps字段

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

__启动项目__

```bash
aotoo dev
```
