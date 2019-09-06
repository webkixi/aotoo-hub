//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const articleData = {
  title: [
    {
      title: 'Article',
      itemClass: 'title-lg-active'
    },
    {
      title: '文章 ',
      itemClass: 'title-primary-grey'
    }
  ],
  dot: [
    {
      '@item': {
        title: {
          title: 'AOTOO-HUB',
          itemClass: 'article-title-b mb-40-r'
        },
        body: [
          {
            title: [
              {
                title: '从aotoo开始',
                itemClass: 'article-title mb-10-r'
              },
              {
                'title': 'aotoo是一套轻量级基于react的生态库，我们设计了前端的扁平化的数据结构及简单易用的状态控制机(组件级的redux)， 元/组件的设计思想(三元件item，list，tree)及大量基于aotoo设计的基础组件如tabs，router等等',
                itemClass: 'article-content size12'
              }
            ],
            titleClass: 'mb-20-r'
          },
          {
            title: [
              {
                title: 'aotoo-hub是什么',
                itemClass: 'article-title mb-10-r'
              },
              {
                title: '随着项目的实施和推进，由之前胡乱搭建的脚手架，到这套精心设计的脚手架(反复推到重构)，经历了。。。，aotoo-hub 是一套彻底的分离式前端脚手架(基于webpack4，koa2)，它解决了前端开发工程化、协作化及开发离散化的痛点，将前端开发, node端开发，组件开发，环境支撑，代码部署等有机的融合到一套环境当中，有效提升了团队的开发效率，简化了上线流程。',
                itemClass: 'article-content size12'
              }
            ],
            titleClass: 'mb-20-r'
          },
          {
            title: [
              {
                title: 'aotoo-hub有哪些特点',
                itemClass: 'article-title mb-10-r'
              },
              {
                '@html': `<ul class="list-border">
                  <li><b style='text-decoration:underline'>大前端模式</b><p>前后端分离、前端脚手架、node中间层，独立api系统，cache缓存，统一的异步调用</p></li>
                  <li><b style='text-decoration:underline'>全环境部署</b><p>可同时部署到开发环境，测试环境，生产环境等多套流程环境，cdn资源支持</p></li>
                  <li><b style='text-decoration:underline'>多项目</b><p>一套环境，多个项目，支持并行、独占开发。微项目拆分，资源最优共用性(组件，模板，样式)，自动端口分配等等</p></li>
                  <li><b style='text-decoration:underline'>一体式</b><p>融合式的开发模式，一套环境同时支持前端、node端并实时响应</p></li>
                  <li><b style='text-decoration:underline'>命令行</b><p>命令行支持安装、创建、启动、编译等</p></li>
                  <li><b style='text-decoration:underline'>REACT同构</b><p>react生态圈同构支持</p></li>
                  <li><b style='text-decoration:underline'>结构清晰</b><p>简单清晰的项目目录结构，适合多人协作开发及工程化前端工程，本人公司应用</p></li>
                  <li><b style='text-decoration:underline'>支持WEB/小程序</b><p>环境开发支持web/h5/小程序(beta)</p></li>
                  <li><b style='text-decoration:underline'>强壮的NODE</b><p>基于KOA2，基于aotoo-koa-server，支持KOA中间件，支持AKS插件，灵活的自定义路由，镜像路由</p></li>
                </ul>`,
                itemClass: 'article-content size12'
              }
            ],
            itemClass: ''
          }
        ],
        itemClass: 'mt-40-r'
      }
    }
  ],
  titleClass: 'ml-40-r',
  itemClass: 'padding-30-r bg-fff'
}

Pager({
  data: {
    motto: Pager.item(articleData)
  }
})
