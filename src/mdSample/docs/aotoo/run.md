# 启动 WEB 项目

新建项目后，进入 AOTOO-HUB 工作空间，在命令行中启动 WEB 项目  

```bash
cd ~/aotoo-hub-init-workspace  # 初始化工作空间，使用 aotoo init workspace-name 创建的目录
aotoo create project-name # 新建项目  
aotoo dev project-name # 以开发模式启动 WEB 项目
```

## 更多命令行工具  

更多参考《脚手架》栏目中的说明，这里例举常用的命令  

```bash
cd ~/workspace

aotoo dev project-name  # 开发模式启动项目 
aotoo build project-name # 生产模式编译项目，需要手工启动

aotoo dev project-name --config test  # 启动测试环境  

node index.js --name project-name --config test # 编译后以生产模式启动项目，测试环境(适用于nginx部署)
```
