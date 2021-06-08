# 开始

AOTOO-HUB 可以通过本地安装或者远程安装的方式快速搭建 REACT/VUE/JQ 等框架的前端开发环境

## 安装远程项目  

**vue2初始化项目, vue2 + vue-router**

```
aotoo install https://gitee.com/webkixi/hub-vue2.git  # gitee版
```

**react初始化项目, react + react-router**  

```
aotoo install https://gitee.com/webkixi/hub-react.git 
```

**react + aotoo初始化项目， 基于aotoo的路由实现**

```
aotoo install https://gitee.com/webkixi/hub-aotoo-case.git
```

**基于aotoo的简易中台系统**

```
aotoo install https://gitee.com/webkixi/hub-aotoo-admin.git
```

## 安装本地项目  

```bash
aotoo create project-name
```

> 安装会提示是否安装小程序或者WEB项目，请根据提示一步一步安装

## 项目结构  

AOTOO-HUB 支持创建全栈前端环境(由node提供server服务)，当然也可以搭建一套纯前端的环境，在开发时由 webpack-dev-server 提供服务  

下例是一套完整的全栈环境的目录结构，你新创建的目录结构应该比下例简单

```bash
└─ project-1
      ├── dist
            ├── 1.0.1 # 版本目录，由配置文件中指定
                  ├── dev # 开发文件输出目录
                        ├── js
                              ├── index.js
                              └── user.js
                        ├── css
                              ├── index.css
                              └── user.css
                        ├── html
                              ├── index.html
                              └── user.html

                  ├── pro # 生产文件输出目录
                        ├── js
                              ├── index__c370a3b2ce.js
                              └── user__385a01bd3a.js
                        ├── css
                              ├── index__c370a3b2ce.css
                              └── user__385a01bd3a.css
                        ├── html # 作为node koa2的view层目录
                              ├── index.html
                              └── user.html

      ├── configs 
             ├── default.js # node环境配置文件，默认包含default.js
             ├── test.js    # node环境配置文件，命令行参数 --config test 创建
             ├── test1.js   # node环境配置文件，命令行参数 --config test1 创建
             └── release.js # node环境配置文件，命令行参数 --config release 创建

      ├── venders  # 第三方库文件目录+自定义公共库(前端)
             └── index.js 

      └── js        # 前端业务js目录(前端)
             └── index # 栏目
                  ├── index.js 
                  ├── index.html 
                  └── index.css 

             └── user # 用户栏目
                  ├── index.js 
                  ├── index.html 
                  └── index.css 

      └── server        # 启用node端后，将包含server目录
             └── pages 
                  └── index.js # controler文件，对应 js/index 栏目，

                  └── user.js # controler文件，对应 js/user 栏目

```
