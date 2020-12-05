# hub 自带文档项目

hub 自带文档项目(mdSample)，该项目是一套完整的全栈演示项目，SPA, MPA, SEO, NODE服务，插件服务等

> 在 github 中搜索 aotoo-xquery

## 创建工作空间

```bash
aotoo init workspace
```

## 启动vue演示项目

```bash
cd workspace
aotoo dev
```

> `注意：`当命令行提示时，请输入`n`，否则将会创建 web 项目

## 配置

打开`aotoo.config.js`，编辑`apps`字段，找到如下字段

```javascript
apps: [
    {
      // 项目名称
      name: 'mdSample',

      // 指定项目版本
      version,  

      // 是否启动项目，默认false不启动
      startup: true,

      // 是否启动node server，默认false，由webpack-dev-server提供服务
      server: false,

      // 省略前端编译，默认false，需要设置server=true
      // 只启动node端，开发模式提升效率，生产模式可直接部署
      onlynode: false,

      // 项目源码目录
      src: path.join(ROOT, 'src/mdSample'),  

      // 指定项目端口，不指定则分配随机端口
      port: 8400,

      options: {

        // 项目环境，如测试，预发布，生产等
        // 建议使用命令行 --config test，选择环境配置
        // scenes: 'default'
      }
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
