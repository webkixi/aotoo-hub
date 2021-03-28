# 安装

准备
----------------

- mac osx
- linux
- ~~windows~~，但 win10 的 linux 子系统可以
- node >= 12

全局环境
----------------

```bash
npm install -g yarn
```

安装工具
----------------

`aotoo-cli`是专门为`aotoo-hub`打造的一套命令工具，通过命令行来进行操作

```bash
npm install -g aotoo-cli
aotoo -V # 查看版本，证明安装成功
```

初始化工作空间
----------------

初始化会自动拉取最新的 aotoo-hub 代码，并安装 npm 依赖包

```bash
cd ~
aotoo init xxx # 新建工作空间
```

**启动自带项目**
aotoo-hub 默认 demo 项目，就是现在你看到的 markdown 文档项目，react 框架，node 服务，SSR、M-SPA

```bash
cd xxx
aotoo dev # 启动默认文档项目
```
