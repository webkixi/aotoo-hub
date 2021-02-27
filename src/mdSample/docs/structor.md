# 目录结构

`aotoo-hub`安装完成后的目录结构

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       └─ project-1
             ├── wp-babel.js # 自定义babel配置
             ├── wp-config.js # 自定义webpack配置
             ├── package.json # 项目独立配置
             ├── configs # node环境配置文件，默认包含default.js
             ├── venders # 第三方库文件目录+自定义公共库(前端)
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录(前端)
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录
```

## 工作空间公共文件/目录说明

__build__  
存放所有编译文件  

__aotoo.config.js__  
项目配置文件

__index.js__  
所有项目启动文件，`aotoo dev、aotoo build、aotoo start、node index.js`命令的启动文件

__postcss.config.js__  
postcss配置文件  

__src__  
项目存放目录，建议所有项目都存放于此  

__src/project__  
项目目录，通过命令行`aotoo create xxx`新建的项目

## 项目文件/目录说明

**wp-babel.js**  
非必须文件，补充自定义的babel配置，一般当项目有独立package.json使用，该配置参与webpack运行时使用，注意请先安装配置所需的依赖包  

wp-babel.js  

```js
/*
* babelOptions {Object}: 当前webpack解析babel的配置项
* isdll {Boolean}: 当前编译是否为公共项
*/
module.exports = function(babelOptions, isdll){
  babelOptions.abc = [...]
  return babelOptions
}
```

**wp-config.js**  
非必须文件，补充自定义的webpack配置，一般当项目有独立package.json使用，该配置参与webpack运行时使用，注意请先安装配置所需的依赖包  

wp-babel.js  

```js
/*
* webpackConfig {Object}: 当前webpack的配置项
* isdll {Boolean}: 当前编译是否为公共项
*/
module.exports = function(webpackConfig, isdll){
  webpackConfig.abc = [...]
  return webpackConfig
}
```

**package.json**  
该项目的独立依赖，一般情况下我们可以直接将依赖包安装在工作空间，但也可以支持在项目中安装单独依赖包

## 前端项目结构

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
                        ├── html 
                              ├── index.html
                              └── user.html

      ├── configs 
            ├── default.js # node环境配置文件，默认包含default.js
            ├── test.js    # node环境配置文件，命令行参数 --config test 创建
            ├── test1.js   # node环境配置文件，命令行参数 --config test1 创建
            └── release.js # node环境配置文件，命令行参数 --config release 创建

      ├── venders  # 第三方库文件目录+自定义公共库(前端)
            └── index.js 

      ├── css  # 样式目录
            └── common.css # 公共样式，可以忽略此文件

      └── js        # 前端业务js目录(前端)
            └── index # 栏目
                  ├── index.js 
                  ├── index.html 
                  └── index.css 

            └── user # 用户栏目
                  ├── index.js 
                  ├── index.html 
                  └── index.css 

```

## 前端+server端项目结构

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
