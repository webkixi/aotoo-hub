# aotoo-hub
aotoo-hub是一套全栈脚手架，以新版webpack4为基础，支持多项目开发，多环境部署，支持小程序，WEB, H5的开发和部署，  
aotoo-hub只提供环境支撑，并无特定库的依赖(不包括基础库如react,vue等，暂时只支持react，后期支持vue环境)，你可以根据自身项目引入router、reducx等其他类库

## FEATHER
1. 前端与node(koa2)端的融合式开发环境
2. 多项目开发、运行、部署
3. 多环境支持，可以快速切换开发环境，测试环境，生产环境等
4. 支持aotoo(基于react)的开发套件
5. 支持小程序开发(支持npm包，支持stylus样式编译，维持小程序原有架构)

## INSTALL
```bash
$ npm install -g yarn
$ npm install -g aotoo-cli
$ aotoo -V
$ aotoo init xxx   # 新建xxx项目
```

## 简单使用(web)
默认环境已经有一套简单的前端环境，使用以下命令运行即可
```bash
  # 开发模式，启动默认demo的开发环境，非第一次运行不会编
  # 译common缓存
  $ aotoo dev  

  # 开发模式，启动默认demo的开发环境，并清除common缓存，
  # 非第一次运行或者vendors目录的内容更改后
  $ aotoo dev-clean  

  # 开发模式，编译默认demo的静态文件，不启动开发环境
  $ aotoo dev-build  

  # 生产模式，编译生产静态文件
  $ aotoo build 

  # 以下yarn命令等效
  $ yarn run dev
  $ yarn run dev-clean
  $ yarn run dev-build
  $ yarn run build

  # 以下npm命令等效
  $ npm run dev
  $ npm run dev-clean 
  $ npm run dev-build 
  $ npm run build
```

## 简单使用(小程序) 
aotoo-hub遵循腾讯小程序的原有开发架构，在原有架构的基础上增强了一下特性，如支持npm包，样式的编译(stylus)，引入aotoo的小程序套件(可以不用)，热更新编译等等  

#### 小程序开发配置
开发小程序需要专门指定配置，web/h5可以省略(通过命令操作)，以下为小程序的配置

1. 打开项目配置文件, `aotoo.config.js`
2. 编写小程序的配置文件   
```js
...
...
apps: [
  {
    name: 'xcxdemo',
    type: 'mp',   // 将类型设置为mp ==> miniprograme，默认为web项目
    startup: true,  // true为启动项目，false为非启动项目
    src: path.join(ROOT, 'src/xcxdemo')  // 指定小程序项目目录
  }
]
```  

3. 保存，完成

## 更多命令及参数
指定环境、指定项目等更多启动命令请参考`aotoo-cli`的说明文档   
#### [https://www.npmjs.com/package/aotoo-cli](https://www.npmjs.com/package/aotoo-cli)

