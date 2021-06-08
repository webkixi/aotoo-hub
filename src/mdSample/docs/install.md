# 安装

安装环境
----------------

- MACOSX
- LINUX
- LINUX子系统(win环境)
- NODE >= 12

全局命令
----------------

```bash
npm install -g yarn
npm install -g expo-cli  # REACT-NATIVE项目所需
npm install -g aotoo-cli # aotoo命令行工具

# aotoo -V # 查看版本，证明安装成功
```

## 初始化

```bash
cd ~
aotoo init workspace-name   # 工作空间名称
```

## 创建项目  

我们可以创建本地项目和远程项目，本地项目需要自行配置一些依赖，通常我们建议安装远程项目

**本地项目**

```bash
cd ~/workspace-name
aotoo create project-name   # 新建项目，完成后配置package.json安装所需依赖
```

远程项目则是一个个已经成型的项目环境，比如我们提供了REACT/VUE/小程序/RN的基础项目模板  

**远程项目**

```bash
cd ~/workspace-name
aotoo install https://www.github.com/...
```
