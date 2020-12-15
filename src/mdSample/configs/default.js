/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

const path = require('path');
module.exports = function (asset) {
  let { name, startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, options } = asset
  let serverRoot = path.join(SRC, 'server')
  let faviconPath = path.join(SRC, 'images/favicon.ico')

  let configServer = {
    server: {
      pages: path.join(serverRoot, 'pages'),
      plugins: path.join(serverRoot, 'plugins'),
      views: path.join(DIST, 'html'),
      js: path.join(DIST, 'js'),
      css: path.join(DIST, 'css'),
      images: path.join(SRC, 'images'),
      uploads: path.join(SRC, 'uploads')
    }
  }

  let configSite = {
    SITE: {
      // css使用url指定背景图片需要注意
      domain: isDev ? `//localhost:${PORT}/` : '//www.agzgz.com/'
      /** web site params */
    },
  }

  let configHooks = {
    hooks: {
      "aks-use-set": [
        app => {
          app.use(async (ctx, next)=>{
            let routerPath = ctx.path
            if (routerPath === '/favicon.icon') {
              ctx.redirect('/images/favicon.ico')
            } else {
              await next()
            }
          })
        }
      ],

      // 'aks-statics-set': [
      //   app => {
      //     app.statics('/home/public/xxx', {prefix: 'xxx'})
      //   }
      // ]

      // aks-globalconfig-set: Array[function] / Object 动态全局CONFIG配置插件，场景比如 appllo配置中心的需求
      // aks-use-set
      // aks-statics-set
      // aks-utile-set
      // aks-plugins-set
      // fetch-before-set
      // fetch-inject-origin-get
      // fetch-inject-origin-post
      // fetch-inject-pre-get
      // fetch-inject-pre-post
    },
  }

  let configApis = {
    /**
      在node环境中定义ajax的请求api集合
      在node中使用，使用全局变量 await Fetcher.post/get(api, {})
     */
    apis: {
      /**
        api: http://www.abc.com/api_url 
      */
     test: 'https://api.apiopen.top/likePoetry'
    },
  }

  let configPublicPath = {
    /**
     * 设定公共路径
     * 类似于webpack中的publicPath
     * 格式: {js: '/js/', css: '/css/'}
     */
    publicPath: {
      js: '/js/',
      css: '/css/',
      images: '/images/'
    },
  }

  let configFetchOptions = {
    /**
     * 设定node端fetch的参数
     * 基于request库事项
     * 格式 {headers: {}, timeout: 10000}
     * headers: 设定传输文件头
     * timeout: request传输时间
     * 参考: https://www.npmjs.com/package/request
     */
    fetchOptions: {
      headers: {},
      timeout: 100000
    },
  }

  let configCacheOptions = {
    /**
     * 设定node端Lru cache的相关参数
     * 基于lur-cache库实现，参考：https://www.npmjs.com/package/lru-cache
     */
    cacheOptions: { // 缓存配置
      max: 300,
      length: function (n, key) {
        return n * 2 + key.length
      },
      dispose: function (key, value) {},
      maxAge: 2 * 60 * 60 * 1000
    }
  }

  let configBodyOptions = {
    bodyOptions: { // body解析配置
      enableTypes: ['json', 'form'], // json/form/text/xml
      encoding: 'utf-8',
      formLimit: '56kb',
      jsonLimit: '1mb',
      textLimit: '1mb',
      xmlLimit: '1mb',
      // strict: true,
      // detectJSON: null,
      // extendTypes: false,
      // onerror: null,
      // disableBodyParser: null
      /*
        // detectJSON
        app.use(bodyparser({
          detectJSON: function (ctx) {
            return /\.json$/i.test(ctx.path);
          }
        }));
        
        // extendTypes
        app.use(bodyparser({
          extendTypes: {
            json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
          }
        }));
        
        // onerror
        app.use(bodyparser({
          onerror: function (err, ctx) {
            ctx.throw('body parse error', 422);
          }
        }));
        
        // disableBodyParser
        app.use(async (ctx, next) => {
          if (ctx.path === '/disable') ctx.disableBodyParser = true;
          await next();
        });
        app.use(bodyparser());
      */
    },
  }

  let configRouterOptions = {
    /**
     * 设置自定义路由
     * 格式：{prefixName: {get: [...], post: [...], customControl: async callback}}
     * (get/post) => ['/', '/:cat', '/:cat/:title', '/:cat/:title/:id', '/:cat/:title/:id/:dest', '/:cat/:title/:id/:dest/:a/:b']，设定访问深度
     * customControl => 自定义路由响应方法
     * 参考: https: //www.npmjs.com/package/koa-router
     */
    routerOptions: {
      allMethods: ['get', 'post', 'put', 'del'],
      parameters: {
        get: [
          '/',
          '/:cat',
          '/:cat/:title',
          '/:cat/:title/:id'
        ],
        post: [
          '/',
          '/:cat',
          '/:cat/:title',
          '/:cat/:title/:id'
        ]
      },
      prefixes: {
        // 劫持所有路由，一般用在vue等SPA项目
        // '': {
        //   customControl: async function (ctx, next) {
        //     return await ctx.render('index', {env: '', root: ''})
        //   }
        // },
        '/site': {
          customControl: async function (ctx, next) {
            ctx.body = CONFIG.SITE
          }
        },

        '/mapper': {
          customControl: async function (ctx, next) {
            let mapper = CONFIG.mapper
            mapper.origin = ctx.origin
            ctx.body = mapper
          }
        }
      }
    },
  }

  return {
    ...configServer,
    ...configSite,
    ...configApis,
    ...configBodyOptions,
    ...configCacheOptions,
    ...configFetchOptions,
    ...configHooks,
    ...configPublicPath,
    ...configRouterOptions
  }
}