// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('index')
const mkmenus = require('../_common/mkmenus')


const menuList = ui_tree({
  listClass: 'router-menu-list router-menus flex-column justify-between',
  data: [
    {title: '菜单栏',  idf: 'level-1', itemClass: 'menu-caption active'},
    {title: '子页面A', attr: {url: '/index/a'}, parent: 'level-1'},
    {title: '窗口路由', attr: {url: '/index/win'}, parent: 'level-1'},
    {title: '子页面B', attr: {url: '/index/b'}, parent: 'level-1'},
    {title: '子页面C', attr: {url: '/index/c'}, parent: 'level-1'},
    {title: '子页面D', attr: {url: '/index/d'}, parent: 'level-1'},
  ],
  footer: {
    dot: [
      {
        '@list': {
          data: [
            {
              title: '',
              itemClass: 'item-qq',
              tap: 'onPop?type=qq'
            },
            {
              title: '',
              itemClass: 'item-code',
              tap: 'onPop?type=ui'
            },
            {
              title: '',
              itemClass: 'item-github',
              url: '__ https://github.com/webkixi/aotoo-hub'
            }
          ],
          listClass: 'menus-footer',
          onPop(e, param, inst) {
            e.stopPropagation()
            const type = param.type
            const kk = ui_item({
              body: type === 'qq' ? [{img: {src: '/images/ui/qqqun.jpg'}, itemClass: 'item-pic-lg'}] : [
                {
                  img: { src: '/images/ui/xquery.png'},
                  title: 'QueryUI',
                  itemClass: 'item-pic'
                },
                {
                  img: { src: '/images/ui/saui.jpeg' },
                  title: 'SAUI',
                  itemClass: 'item-pic'
                },
              ],
              footer: type !== 'qq' ? [
                {title: '', itemClass: 'icon-scan'},
                {title: '微信扫码查看更多'}
              ] : [],
              dot: [{title: ' ', itemClass: 'item-close close-circle-2', aim: 'onClosex'}],
              footerClass: type !== 'qq' ? 'item-footer' : '',
              bodyClass: 'item-body',
              itemClass: type === 'qq' ? 'ss-modal item-img' : 'ss-modal item-ad',
              methods: {
                onClosex() {
                  message.close()
                }
              }
            })
            message.modal(<kk.UI/>)
          }
        },
        itemClass: 'menus-foot'
      },
      {
        title: '',
        itemClass: 'covering',
        aim() {
          onCovering()
        }
      }
    ]
  },
  itemMethod: {
    aim(e, param, inst){
      let url = inst.attr('url')
      if (url) {
        if (url === '/index/win') {
          nav.navigateTo({url})
        } else {
          nav.redirectTo({url}) 
        }
        // nav.redirectTo({url})
      }
    }
  }, 
})

// 路由
export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: import('./_subpages/c')},
  {url: '/index/d', content: import('./_subpages/d')},
  {url: '/index/win', content: import('./_subpages/win')},
], {
  header: function(){
    return header
  },
  select: '/index/a',
  menus: function() {
    return <menuList.UI />
  },
  containerClass: 'window'
})