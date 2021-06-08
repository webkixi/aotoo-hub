# aotoo-cli

aotoo-hub的命令行工具

## INSTALL

```bash
npm install -g aotoo-cli
aotoo -V # 检查是否安装成功
```

## 命令大全

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

### 初始化工作空间  

```bash
aotoo init workspace
```

### 新建项目

根据提示创建WEB类项目/小程序项目，dir为必须参数，项目创建后会修改工作空间根目录下的`aotoo.config.js`文件并增加项目配置项，可以根据配置文件中的说明增改配置

```bash
# 新建项目
$ cd workspace
$ aotoo create project_name
```

### 安装远程模板项目  

支持远程git项目和zip项目

```bash
cd workspace

# 安装远程git项目到本地
aotoo install https://github.com/webkixi/hub-vue2.git  # 从远程安装vue2基础项目

# 安装远程zip项目到本地 
aotoo install https://github.com/webkixi/hub-vue2/archive/master.zip # 从远程安装vue2基础项目zip版
```

项目创建后会修改工作空间根目录下的`aotoo.config.js`文件并增加项目配置项，可以根据配置文件中的说明增改配置

## 模式

### 开发模式-1

```bash
# 启动默认项目开发模式
$ aotoo dev

# 启动指定项目
$ aotoo dev project_name
```

### 开发模式-2

开发模式，清除并重新生成 common.js 和 vendors.js

```bash
# 启动默认项目开发模式
$ aotoo dev-clean

# 启动指定项目，并清除该项目common的缓存
$ aotoo dev-clean project_name
```

### 开发模式-3

开发模式(纯编译)，清除并重新生成 common.js 和 vendors.js

```bash
$ aotoo dev-build

# 编译指定项目
$ aotoo dev-build project_name
```

### 生产模式-1

生产模式，纯编译输出，不启动服务

```bash
$ aotoo build

# 编译指定项目
$ aotoo build project_name
```

### 生产模式-2

生产模式，清除并重新生成 common.js 和 vendors.js, 不启动服务

```bash
$ aotoo build-clean

# 编译指定项目
$ aotoo build-clean project_name
```

## 部署  

在部署项目之前，需要先以生产模式编译

### node启动项目  

```bash
cd ~/workspace 

$ node index.js # 启动默认项目

$ node index.js --config test # 启动默认项目(测试环境)

$ node index.js --config test --name p-name # 启动指定项目(测试环境)
```

### pm2启动  

```bash
cd ~/workspace 

$ pm2 start index.js -- --config test --name p-name
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
