# 启动文档系统  

`aotoo-hub`自带有4个DEMO

- 文档
- vue演示项目
- react演示项目
- 小程序演示项目

文档系统是默认启动项目

## 安装

安装`aotoo-hub`环境需要先安装全局命令`aotoo`

__全局安装aotoo-cli__  

```bash
npm install aotoo-cli -g

aotoo -V # 显示版本则为安装成功
```

__创建工作空间__  

```bash
aotoo init workspace # workspace是指定创建的目录名
```

该命令将新建一个目录，并将安装初始环境

## 启动文档系统  

```bash
cd workspace
aotoo dev
```

等待编译完成则会弹开浏览器展示文档  
