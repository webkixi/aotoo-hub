# aotoo-cli

aotoo-cli是aotoo-hub的开发工具库，通过命令行模式操作

## INSTALL

```bash
npm install -g aotoo-cli
aotoo -V # 检查是否安装成功
```

## USAGE

使用 aotoo 命令行启动各个服务

```bash
aotoo init <work-space-name> # 新建工作空间
aotoo create <project-name> # 新建本地项目  
aotoo install <url> # 安装远程项目

aotoo dev [project-name] # 启动项目开发环境  
aotoo dev-clean [project-name] # 启动项目开发环境，并清空缓存

aotoo build [project-name] # 生产编译项目资源
aotoo build-clean [project-name] # 生产编译项目资源，并清空缓存

aotoo start [project-name] # 本地启动生产模式，需要先以生产模式编译

aotoo dev [project-name] --config test # 启动测试环境，开发模式
aotoo dev [project-name] --config test1 # 启动测试环境，开发模式
aotoo dev [project-name] --config test2 # 启动测试环境，开发模式
aotoo dev [project-name] --config ....  # 启动测试环境，开发模式

aotoo dev --name proj1 --name proj2 --name proj3 # 同时启动多个项目的开发环境

# 部署
node index.js --config test  # 使用node启动测试环境的生产项目(需完成生产编译)
pm2 start index.js -- --config test
```

### init \<dir\>

新建工作空间，dir为必须参数

```bash
aotoo init workspace
```

### create \<dir\>

新建本地项目，dir为必须参数

**新建web类项目**  

适用于PC/H5

```bash
# 新建项目
$ cd workspace
$ aotoo create project_name
```

> 将会在 workspace/src 目录下创建项目目录`project_name`，按照提示输`Y`，回车继续  
> 完成安装后，修改`aotoo.config.js`，补充项目描述

#### 新建小程序项目  

```bash
# 新建项目
$ cd xxx
$ aotoo create minip_name
```

> 将会在xxx/src目录下，创建项目目录`minip_name`，按照提示输`n`，回车继续
> 完成安装后，修改`aotoo.config.js`，补充项目描述

### 安装远程项目到本地  

支持远程git项目和zip项目

```bash
cd workspace

# 安装远程git项目到本地
aotoo install https://github.com/webkixi/hub-vue2.git  # 从远程安装vue2基础项目

# 安装远程zip项目到本地 
aotoo install https://github.com/webkixi/hub-vue2/archive/master.zip # 从远程安装vue2基础项目zip版
```

### 开发模式

#### dev [name]

```bash
# 启动默认项目开发模式
$ aotoo dev

# 启动指定项目
$ aotoo dev project_name
```

#### dev-clean [name]

开发模式编译，清除common/vendors等dll文件，重新生成，并启动服务

```bash
# 启动默认项目开发模式
$ aotoo dev-clean

# 启动指定项目，并清除该项目common的缓存
$ aotoo dev-clean project_name
```

#### dev-build [name]

开发模式编译，清除common/vendors等dll文件，重新生成，不启动服务

```bash
$ aotoo dev-build

# 编译指定项目
$ aotoo dev-build project_name
```

### 生产模式

#### build [name]

生产模式，纯编译输出，不启动服务

```bash
$ aotoo build

# 编译指定项目
$ aotoo build project_name
```

#### build-clean [name]

生产模式，清除common/vendors等dll文件，并重新生成，不启动服务

```bash
$ aotoo build-clean

# 编译指定项目
$ aotoo build-clean project_name
```

### 部署  

部署之前，需要先以生产模式编译

#### start [name]

生产模式，启动node服务

```bash
$ aotoo start

# 编译指定项目
$ aotoo start project_name
```

#### node启动  

```bash
# 编译项目，生产模式
$ node index.js

# 启动测试环境
$ node index.js --config test
```

#### pm2启动  

```bash
# 编译项目，生产模式
$ aotoo build-clean project_name

# 启动测试环境
$ pm2 start index.js -- --config test
```

## EXTEND PARAM 扩展参数

#### - -config <name>

指定环境配置文件，配合node端一起使用

#### - -name <name>

启动指定项目，该参数可多项目同时启动

```bash
# 同时启动 xxx 及 yyy的项目
$ aotoo dev --name project_name --name project-other
```
