# 更新日志  

## aotoo-hub更新日志

#### 2020-01-09

新增远程项目hub-aotoo-antd，antd的基础使用环境  

```bash
aotoo install https://gitee.com/webkixi/hub-aotoo-antd.git
```

#### 2020-01-05

* 简化@aotoo/aotoo， @aotoo/react-pager，hub-aotoo-case项目的依赖  
* 支持由项目追加、设置webpack、babel配置项

`wp-config.js`  
该文件返回一个方法，用于设置webpack的常规设置  

`wp-babel.js`  
该文件返回一个方法，用于追加或重置webpack的babel配置  

#### 2020-12-30

* 更新aotoo-cli到版本1.0.32，替换github源为gitee源，优化初始化速度

#### 2020-12-29

* 更新aotoo-cli到版本1.0.31，优化交互流程

* 优化aotoo-hub，修复react子项目为npm项目时，babel编译出错的问题

#### 2020-12-28

* 修改脚手架文档/4个演示项目，增加远程项目的安装和开发

* 删除本地演示项目，将演示项目迁移至github，可通过install安装远程项目到本地

* 优化本地创建小程序的模板

* 优化小程序核心，item元组件，list元组件

#### 2020-12-25

* 支持安装远程项目(github/gitee的项目)  

* 优化编译css url()背景样式时出错的问题  

* 优化编译vue样式时弹出警告问题

#### 历史优化

基于preprocess库优化模板功能，使模板支持include其他模板 --- 2020-11-19  

优化server端自动生成的文件 -- 2020-11-18  

优化文档演示系统markdown的高亮样式 -- 2020-11-15  

新增文档路由方法reLaunch -- 2020-11-14  
