# 项目配置

每个项目对应一个配置，找到工作空间根目录，打开并编辑配置文件 aotoo.config.js

**新建配置**  
打开`aotoo.config.js`并配置`apps`字段

```javascript
apps: [
    {
      name: 'new-project', // 项目名称
      version: '1.0.1', // 版本号，项目产出时依据此版本打包
      startup: true,  // 是否默认启动
      server: false,  // 是否启动node服务
      type: 'web', // 项目类型，填入 web/mp
      src: path.join(ROOT, 'src/aaa'),  // 项目根目录，建议不要更改
      options: { 
        scenes: 'default'  // 项目当前环境，如测试环境，生产环境等
      },
      port: 8500  // 指定项目端口
    }
  ],
}
```

## name

项目名称

## version

当前项目版本号，单独指定项目版本，不设置则与 package.json 中的 version 相同

## startup

默认为 true，是否启动该项目，支持多项目同时启动

## server

**false(默认)**  
项目为纯粹的前端项目，部署的时候将nginx服务目录指向 dist/1.0.0/pro/html/index.html 文件即可  

**true**  
启用node为项目提供web服务，可指派独立端口，使用nginx反向代理到此端口即可提供web服务. node由`@aotoo/aotoo-koa-server`框架提供web服务(基于koa2).

## type

指定项目为小程序或者 web 项目，`web`为WEB项目，`mp`为腾讯小程序项目

## src

指定项目目录地址，不建议修改此目录

## options.scenes

指定项目的使用环境，如测试环境，生产环境等

## port

项目使用端口，server 为 true时，指定 node 端口，如果 server 为 false，指定 webpack-dev-server 的端口(开发模式下)
