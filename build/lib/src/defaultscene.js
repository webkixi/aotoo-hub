/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

const path = require('path');
module.exports = function (asset) {
  const { name, startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, options } = asset
  return {
    hooks: {
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


    /**
      在node环境中定义ajax的请求api集合
      在node中使用，使用全局变量 await Fetch.post/get(api, {})
     */
    apis: {
      /**
        api: http://www.abc.com/api_url 
      */
    },
    
     /**
    * 设定公共路径
    * 类似于webpack中的publicPath
    * 格式: {js: '/js/', css: '/css/'}
    */
    publicPath: {
      /**
      js: '/js/', 
      css: '/css/',
      images: '/images/'
     */
    },

    /**
     * 设定node端fetch的参数
     * 基于request库事项
     * 格式 {headers: {}, timeout: 10000}
     * headers: 设定传输文件头
     * timeout: request传输时间
     * 参考: https://www.npmjs.com/package/request
   */
    fetchOptions: {},

    /**
     * 设定node端Lru cache的相关参数
     * 基于lur-cache库实现，参考：https://www.npmjs.com/package/lru-cache
    */
    cacheOptions: {},


    /**
     * 设置自定义路由
     * 格式：{prefixName: {get: [...], post: [...], customControl: async callback}}
     * (get/post) => ['/', '/:cat', '/:cat/:title', '/:cat/:title/:id', '/:cat/:title/:id/:dest', '/:cat/:title/:id/:dest/:a/:b']，设定访问深度
     * customControl => 自定义路由响应方法
     * 参考: https: //www.npmjs.com/package/koa-router
    */
    routerOptions: {
      /**
        allMethods: ['get', 'post', 'put', 'del'],
        parameters: {
          get: [....],   // 默认深度，参考prefix
          post: [....]
        },
        prefixes: {
         abc: {
            get: [
              '/', 
              '/: cat ', 
              '/:cat/:title ', 
              '/:cat/:title/:id ', 
              '/:cat/:title/:id/:dest ', 
              '/:cat/:title/:id/:dest/:a/:b '
            ],
            post: [
              '/',
              '/:cat ',
              '/:cat/:title',
            ],
            customControl: async function(ato){ }
          }
        },
      */
    },


    SITE: {}
  }
}