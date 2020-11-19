# aotoo-cli

aotoo-cli是aotoo-hub的开发工具库，通过命令行模式操作

## INSTALL

```bash
npm install -g aotoo-cli
aotoo -V # 检查是否安装成功
```

## USAGE

### init <dir>

新建工作空间

```bash
# 新建xxx项目
$ aotoo init xxx
```

### create <dir>

#### 新建web类项目

适用于创建pc/h5/公众号等web项目

```bash
# 新建项目
$ cd xxx
$ aotoo create project_name
```

> 将会在xxx/src目录下，创建项目目录`project_name`，按照提示输`Y`，回车继续  
完成安装后，修改`aotoo.config.js`，补充项目描述

#### 新建小程序项目  

适用于创建小程序项目

```bash
# 新建项目
$ cd xxx
$ aotoo create minip_name
```

> 将会在xxx/src目录下，创建项目目录`minip_name`，按照提示输`n`，回车继续
完成安装后，修改`aotoo.config.js`，补充项目描述

### 开发模式

#### dev [name]

开发模式编译，并启动服务

```bash
# 启动aotoo.config中apps中的启动项目
$ aotoo dev

# 启动指定项目
$ aotoo dev project_name
```

#### dev-clean [name]

开发模式编译，清除common/vendors等dll文件，重新生成，并启动服务

```bash
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
