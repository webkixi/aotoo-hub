/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

 import 'css/index.styl'

const datalist = [
  {
    title: 'aotoo',
    url: '__ https://www.npmjs.com/package/@aotoo/aotoo',
    descript: '基于React，遵循React思想，适用多端，基于元组件的低耦合状态管理器',
  },
  {
    title: 'aotoo-hub',
    url: '__ https://www.npmjs.com/package/aotoo-web-widgets',
    descript: '基于webpack4的前端多项目开发、部署架构，是一套全栈工程架构，提升开发效率'
  },
  {
    title: 'aotoo-web-widgets',
    url: '__ https://www.npmjs.com/package/aotoo-web-widgets',
    descript: 'aotoo的web端/node端核心元件'
  },
  {
    title: 'aotoo-koa-server',
    url: '__ https://www.npmjs.com/package/@aotoo/aotoo-koa-server',
    descript: '插件式的node服务端mvc架构，像jquery那样爽快的使用node'
  },
  {
    title: 'aotoo-react-tabs',
    url: '__ https://www.npmjs.com/package/aotoo-react-tabs',
    descript: '常用tabs切换组件'
  },
  {
    title: 'aotoo-react-router',
    url: '__ https://www.npmjs.com/package/aotoo-react-router',
    descript: '通用PC/H5端的前端路由组件，自带懒加载，上拉、下拉刷新'
  },
  {
    title: 'aotoo-react-treex',
    url: '__ https://www.npmjs.com/package/aotoo-react-treex',
    descript: '数据驱动输出树层次的html结构'
  },
  {
    title: 'aotoo-validator',
    url: '__ https://www.npmjs.com/package/aotoo-validator',
    descript: '一套灵活，使用FED/NODE端的校验库'
  },
  {
    title: 'aotoo-inject',
    url: '__ https://www.npmjs.com/package/aotoo-inject',
    descript: '使用与FED/NODE端的静态文件注入库'
  },
]

Aotoo.render(
  Aotoo.list({
    data: datalist,
    listClass: 'sampleList',
    itemClass: 'sampleItem',
    loader: [
      {
        test: 'descript',
        use: function (option, itemData) {
          return <div className="descript">{option}</div>
        }
      }
    ]
  }),
  'root'
)
