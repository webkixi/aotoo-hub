# 安装远程项目

hub环境可以通过命令行安装远程项目(符合hub的目录结构)，项目类型不区分技术栈，可以是react/vue/小程序/node

[**GITHUB**](https://github.com/webkixi/aotoo-xquery)

## 创建工作空间

```bash
aotoo init workspace
```

## 安装远程项目

下例项目为vue2的空项目，包含vue及vue-router，有简单的演示效果，可以用来快速部署vue环境

```bash
cd workspace
aotoo install https://github.com/webkixi/hub-vue2.git
```

>>>> 按提示进行
