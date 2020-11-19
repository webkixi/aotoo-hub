# 小程序配置

`aotoo-hub`支持小程序编译，如下配置

__创建小程序项目__  

```bash
aotoo create aaa
```

遇到提示时，选择`n`，默认选择`y`，将创建web项目

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

> 将type赋值`mp`，即该项目为小程序项目。type值默认为`web`

项目的其他配置请参考《项目配置》一文  

__启动项目__  
操作命令行，启动项目，与普通web项目的命令一致  

__启动项目__  

```bash
aotoo dev aaa  # 以开发模式启动项目，支持热更新  

aotoo build aaa # 以生产模式编译项目(不启动)
```

此时将初始化小程序代码并编译，打开小程序开发工具，按照终端窗口提示的目录(黄色字体)，将其设为小程序项目目录即可
