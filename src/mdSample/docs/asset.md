# 项目配置

使用`aotoo-cli`的命令+配置文件设置新的项目

**创建项目**

```bash
aotoo create aaa
```

> 遇到提示，一直回车(将自动启动项目)，如果是小程序项目，遇到提示请选择`n`

**新建配置**  
打开`aotoo.config.js`并配置`apps`字段

```javascript
apps: [
 // 项目aaa
    {
      name: 'aaa',
      version: '1.0.1',
      startup: true,
      server: false,
      type: 'web',
      src: path.join(ROOT, 'src/aaa'),
      options: {
        scenes: 'default'
      },
      port: 8500  // 指定项目端口
    }
  ],
}
```

**启动项目**

```bash
aotoo dev aaa  # 以开发模式启动项目，支持热更新

aotoo build aaa # 以生产模式编译项目(不启动)

aotoo start aaa # 以生产模式启动项目
```

## name

项目名称

## version

当前项目版本号，如果不设置则与 package.json 中的 version 相同

## startup

默认为 true，是否启动该项目

## server

是否需要提供 node 端

## type

指定项目为小程序或者 web 项目

## src

指定项目目录地址

## options.scenes

指定项目的使用环境

## port

项目使用端口，如果 server 为 true，指定 node 端口，如果 server 为 false，指定 webpack-dev-server 的端口
