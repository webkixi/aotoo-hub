# 输出目录  

## 项目结构图

```bash
workspace
 ├─aotoo.config.js  # 包含version版本参数
 └─src
    ├─ 其他系统
    └─ 文档系统
        ├── configs # node环境配置文件，默认包含default.js
        ├── venders # 第三方库文件目录+自定义公共库(前端)
        ├── dist      # 静态资源输出目录
        ├── css       # 样式资源输出目录
        ├── js        # 前端业务js目录(前端)
        └── server    # node端的源码目录
             │── pages  # node端的业务目录
             └── plugins # 自定义插件目录
```

在一个`aotoo-hub`的工作空间中可以包含若干项目，它们共同享有相同的编译环境，文档系统只是其中一个项目，并且所有项目的目录结构一致

`aotoo.config.js`  
项目配置文件  

## dist目录

存放前端编译后的静态资源，输出版本目录，js/css/html等静态资源目录

```bash
├─ dist          # 输出目录(前端)
    │─ 1.0.1     # 版本目录，依据配置中的version字段
    └─ 1.0.8
        └─ dev # 开发目录，包含js/html/css文件及目录
         │── js/index.js
         │── html/index.html
          ...
         └── mapfile.json

     └─ pro # 生产目录
         │── js/index_[hash].js # 生产文件会带上hash
          ...
         └── mapfile.json
```

`版本目录`  
如上结构图中`1.0.8`，版本号来自项目配置文件`aotoo.config.js -> apps`片段的文档项目中  

```js
apps: [
    {
      name: 'docs',
      version: '1.0.8',  // 项目版本号
      startup: true,
      server: true,
      src: path.join(ROOT, 'src/docs'),
      options: {
        scenes: 'default' // 指定默认场景
      },
      port: 8500  // 项目端口，nginx反向代理指向此端口提供的服务
    }
  ],
}
```

### 开发目录(dev)

处于项目开发期时，所有静态文件的输出目录指向`1.0.8->dev`目录，JS与CSS等资源文件未经压缩，并拥有适合开发状态的sourcemap文件  

我们通过命令行启动开发服务，使项目处于开发状态

```bash
$ aotoo dev docs  # 删除资源文件，但保留dll文件，并重新编译->启动服务

# 或者  

$ aotoo dev-clean docs # 彻底清除，包括dll文件，并重新编译->启动服务
```

`aotoo`  
全局命令，操作`aotoo-hub`的指令集，全局安装`aotoo-cli`即可使用该命令  

`dev`  
告诉编译器，启动开发环境  

`docs`  
项目名称，指定启动哪一个项目，如果配置中的`startup=true`时，可省略此参数  

```bash
aotoo dev  # 配置中设为启动 startup=true则可以省略项目名称  
```

### 生产目录(pro)

处于项目生产期时，所有静态文件的输出目录指向`1.0.8->pro`目录

我们通过命令行进行生产环境静态资源编译，此时不会启动服务，等待手动启动(nginx)  

```bash
$ aotoo build docs  # 保留dll文件
# 或者  
$ aotoo build-clean docs  
```

`build`  
告诉编译器，开始编译生产所需的静态资源

`docs`  
项目名称，指定启动哪一个项目，如果配置中的`startup=true`时，可省略此参数  

```bash
aotoo build  # 配置中设为启动 startup=true则可以省略项目名称  
```

### mapfile.json

`mapfile.json`文件存放静态资源映射表。无论在开发目录还是生产目录，都会生成此文件，该文件内容包含所有js/css/html及对应的地址  

在node端，我们可以通过`CONFIG.mapper`获取该文件的内容
