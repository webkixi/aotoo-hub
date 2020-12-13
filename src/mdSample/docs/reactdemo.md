# hub 自带reactdemo

hub 自带react项目的demo，该项目是一个空项目(react@16)，观察与了解或者修改此项目，帮助熟悉hub的项目结构

> 在 github 中搜索 aotoo-xquery

## 创建工作空间

```bash
aotoo init workspace
```

## 启动react演示项目

```bash
cd workspace
aotoo dev reactSample
```

> `注意：`当命令行提示时，请输入`n`，否则将会创建 web 项目

## 配置

打开`aotoo.config.js`，编辑`apps`字段，找到如下字段

```javascript
apps: [
    {
      name: 'reactSample',
      startup: false,
      server: false,
      src: path.join(ROOT, 'src/reactSample'),  // 指定项目源码目录
    },
  ],
}
```

`**修改startup为true**`  
同时将其他项目的`startup改为false`，则可以使用简化启动方式  

```bash
aotoo dev # 启动startup为true的项目  

aotoo build # 以生产模式编译startup为true的项目  
```

`**修改server为true**`  
此配置将启动node服务以提供支撑，可以观察server目录
