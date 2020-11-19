# 项目配置

使用`aotoo-cli`的命令+配置文件设置新的项目  

__创建项目__  

```bash
aotoo create aaa
```

> 遇到提示，一直回车，小程序选择`n`

__新建配置__  
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

__启动项目__  

```bash
aotoo dev aaa  # 以开发模式启动项目，支持热更新

aotoo build aaa # 以生产模式编译项目(不启动)

aotoo start aaa # 以生产模式启动项目
```

## name

项目名称  

## version

当前项目版本号，如果不设置则与package.json中的version相同

## startup

默认为true，是否启动该项目  

## server

是否需要提供node端

## type

指定项目为小程序或者web项目

## src

指定项目目录地址

## options.scenes

指定项目的使用环境  

## port

项目使用端口，如果server为true，指定node端口，如果server为false，指定webpack-dev-server的端口
