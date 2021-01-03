# hub的小程序

`aotoo-hub`可以编译小程序，支持stylus，sass动态样式，支持markdown/html自动字符串化

__创建小程序项目__  

```bash
aotoo create aaa
```

根据提示一步一步走

__新建小程序配置__  
打开`aotoo.config.js`并配置`apps`字段  

```javascript
apps: [
 // 项目aaa
    {
      name: 'aaa',
      version: '1.0.1',
      startup: true,
      server: false,
      src: path.join(ROOT, 'src/aaa'),
      type: 'mp',  
      options: {
        cloud: false // 是否云开发
      },
      port: 8500  // 指定项目端口
    }
  ],
}
```

> type为`mp`，即该项目为小程序项目。type值默认为`web`

项目的其他配置请参考《项目配置》一文  

__启动项目__  
操作命令行，启动项目，与普通web项目的命令一致  

```bash
aotoo dev aaa  # 以开发模式启动项目，支持热更新  

aotoo build aaa # 以生产模式编译项目(不启动)
```

打开小程序开发工具，按照终端窗口提示的目录(黄色字体)，将其设为小程序项目目录即可
