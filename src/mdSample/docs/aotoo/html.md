# 产出结构结构

AOTOO-HUB 编译完成 WEB 项目后会统一将文件输出到同源目录 DIST 目录中

```bash
├── dist
      ├── 1.0.1 # 版本目录
            ├── dev/pro  # dev是开发输出目录, pro是生产输出目录(生产文件带有hash值)
                  ├── js
                        ├── vendors.js
                        ├── common.js
                        ├── index.js
                        └── user.js
                  ├── css
                        ├── common.css
                        ├── index.css
                        └── user.css
                  ├── html
                        ├── index.html
                        └── user.html
```

经过编译后，webpack会产出 HTML 模板用于服务端渲染，其结构大致如下

```html
<!-- index.html -->
<html lang>
  <head>
    <link rel="stylesheet" href="common.css"></link>
    <link rel="stylesheet" href="[page].css"></link>
  </head>

  <body>
    <script src="vendors.js" />
    <script src="common.js" />
    <script src="[page].js" />
  </body>
</html>
```

**common.css**  
公共CSS

**vendors.js**  
第三方库JS

**common.js**  
公共JS，由webpack抽取公共JS，并自动引入到页面模板中

**[page].css**  
代指业务CSS，不同页面对应不同css

**[page].js**  
代指业务JS，不同页面对应不同的JS
