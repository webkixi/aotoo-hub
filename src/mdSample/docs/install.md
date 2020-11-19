# 安装

## 准备

* mac osx
* linux
* 不支持~~windows~~，但win10的linux子系统可以
* node >= 12

## 全局环境

```bash
npm install -g node-gyp
npm install -g node-pre-gyp
npm install -g yarn
```

## 安装工具

`aotoo-cli`是专门为`aotoo-hub`打造的一套命令工具，通过命令行来进行操作  

```bash
npm install -g aotoo-cli
aotoo -V # 查看版本，证明安装成功
```

## 初始化工作空间

初始化会自动拉取最新的aotoo-hub代码，并安装npm依赖包

```bash
cd ~
aotoo init xxx # 新建工作空间
```

__启动自带项目__
aotoo-hub默认demo项目，就是现在你看到的markdown文档项目，react框架，node服务，SSR、M-SPA

```bash
cd ~/xxx
aotoo dev # 启动默认文档项目
```

## 创建新项目  

__使用命令行创建新项目__  

```bash
cd ~/xxx
aotoo create project
```

__编辑配置文件__  

```bash
cd ~/xxx
vim aotoo.config.js
```

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
      server: false, // 是否需要node提供服务，设为false则由webpack-dev-server提供服务
      src: path.join(ROOT, 'src/project'),  // 指定项目源码目录
      port: 8500  // 指定项目端口
    }
  ]
}
```

__启动新项目__  
在工作空间中启动新项目

```bash
cd ~/xxx
aotoo dev # 配置中startup为true的项目会自动启动
```

__启动新项目方法2__  
从子项目目录中启动，你可以为该目录配置独立的git服务，下次操作可直接在项目目录中开发

```bash
cd ~/xxx/src/project
aotoo dev --name project
```
