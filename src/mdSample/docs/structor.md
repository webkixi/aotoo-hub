# 目录结构

`aotoo-hub`安装完成后的目录结构

```bash
hub工作空间
  ├── build
  ├── aotoo.config.js
  ├── index.js
  ├── package.json
  ├── postcss.config.js
  └── src
       └─ project
             ├── configs # node环境配置文件，默认包含default.js
             ├── venders # 第三方库文件目录+自定义公共库(前端)
             ├── dist      # 静态资源输出目录
             ├── js        # 前端业务js目录(前端)
             └── server    # node端的源码目录
                   │── pages  # node端的业务目录
                   └── plugins # 自定义插件目录
```

__build__  
存放所有编译文件  

__aotoo.config.js__  
项目配置文件

__index.js__  
所有项目启动文件，`aotoo dev、aotoo build、aotoo start、node index.js`命令的启动文件

__postcss.config.js__  
postcss配置文件  

__src__  
项目存放目录，建议所有项目都存放于此  

__src/project__  
项目目录，通过命令行`aotoo create xxx`新建的项目
