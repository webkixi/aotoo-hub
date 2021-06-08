# 介绍  

`aotoo-hub`是一套前端全栈型脚手架

```bash
1. 支持REACT/VUE/小程序/REACT-NATIVE  
2. 支持多项目开发，所有项目放置于开发空间中，可独立编译，运行
3. 简单、高效的命令行操作
3. 支持各种动态样式  
4. 支持远程项目，可以安装gitee/github的项目到本地
5. 配置server为true，支持node支撑的后端服务，也可作为项目中间层
```

**[GITHUB](https://www.github.com/webkixi/aotoo-hub)**  
**[更多说明](https://www.agzgz.com)**  

## 多项目开发  

aotoo-hub建立了一个统一的开发环境(基于webpack4)，所有项目可以共享开发环境中的编译资源，如babel, sass等。按照简单的目录规则，可以快速开始项目，无需关注编译环境

```bash
workspack
  └── src 
      │── hub-react
      │── hub-vue
      └── hub-xcx  # 小程序项目
```

启动项目也非常简单  

```bash
aotoo dev hub-react  # 启动hub-react项目，启动开发模式
aotoo build hub-react  # 按生产模式编译hub-react项目
```

## 命令行  

通过专属命令`aotoo`启动项目并附带运行状态，有3中基础命令及由基础命令衍生的状态命令，这个我们会在后面详细说明

```bash
aotoo dev  # 开发模式
aotoo build # 生产编译模式
aotoo install # 安装远程项目  
```

## 多环境支持  

通过命令行可以快速切换不同的开发环境(需先创建配置文件)，如测试，预发布，生产等等  

```bash
aotoo dev project --config test  # 启动测试环境
aotoo dev project --config pre   # 启动预发布环境
```

**产出目录**  

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录
            │── js/index.js
            │── html/index.html
             ...
```

## 全栈模式  

在`aotoo-hub`配置文件`aotoo.config.js`中配置相关项目的server属性为true，即可以将该项目由纯前端项目转变为大前端项目，由node提供server服务

## 远程模板

把本地项目(基于规则目录)发布到gitee/github后该项目可作为远程模板被其他开发人员安装到本地。
