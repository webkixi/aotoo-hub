const nav = Pager.nav
const lib = ao2.lib
import _message from "components/items/message";

const ad = require('../_common/advertising')

const message = _message()

function onCovering() {
  const pageshead = $$('#pageshead')
  pageshead.removeClass('activeSwitch')
}

let menuInstance = ui_tree({
  $$id: 'abc',
  data: [
    {title: '通用', itemClass: 'menu-caption', idf: 'normal', aim: 'aimx'},
    {title: '字体', attr: {file: '/normal/font'}, select: true, parent: 'normal', aim: 'aimx'}, 
    {title: '图标', attr: {file: '/normal/icon'}, parent: 'normal' , aim: 'aimx'},
    {title: '色块', attr: {file: '/normal/color'}, parent: 'normal' , aim: 'aimx'},
    {title: '按钮', attr: {file: '/normal/button'}, parent: 'normal' , aim: 'aimx'},
    {title: '行高', attr: {file: '/normal/lineheight'}, parent: 'normal' , aim: 'aimx'},

    {title: '反馈', itemClass: 'menu-caption', idf: 'feedback', aim: 'aimx'},
    {title: '文字提示', attr: {file: '/feedback/tooltip'}, parent: 'feedback', aim: 'aimx'}, 
    {title: '警告提示', attr: {file: '/feedback/alert'}, parent: 'feedback', aim: 'aimx'}, 
    {title: '提示框', attr: {file: '/feedback/tip'}, parent: 'feedback', aim: 'aimx'}, 
    {title: '弹出层', attr: {file: '/feedback/modal'}, parent: 'feedback', aim: 'aimx'}, 
    {title: '通知', attr: {file: '/feedback/notice'}, parent: 'feedback', aim: 'aimx'},
    {title: '抽屉', attr: {file: '/feedback/drawer'}, parent: 'feedback', aim: 'aimx'},
    {title: '加载中', attr: {file: '/feedback/load'}, parent: 'feedback', aim: 'aimx'},

    {title: '数据展示', itemClass: 'menu-caption', idf: 'show'},
    {title: '表格', attr: {file: '/show/table'}, parent: 'show', aim: 'aimx'}, 
    {title: 'bootstrap-Table', attr: {file: '/show/btTable'}, parent: 'show', aim: 'aimx'}, 
    {title: '轮播图', attr: {file: '/show/swiper'}, parent: 'show', aim: 'aimx'}, 
  ],
  itemMethod: {
    aimx(e, param, inst){
      let file = inst.attr('file')
      let parent = inst.parent().parent()
      if (parent) {
        parent.forEach(child=>{
          if (child && child.children) {
            child.children.forEach(son=>{
              son.removeClass('active')
            })
          }
        })
        inst.addClass('active')
        if (file) {
          setTimeout(() => {
            nav.redirectTo({
              url: file,
              beforeNav(to, from, next) {
                next()
              }
            })
          }, 50);
        }
      }
      onCovering()
    }
  },
  listClass: 'router-menu-list router-menus flex-column justify-between',
  footer: {
    title: [
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
            },
            {
              title: '',
              itemClass: 'item-saui',
              tap: 'onPop?type=saui'
            },
          ],
          listClass: 'menus-footer',
          onPop(e, param, inst) {
            e.stopPropagation()
            const type = param.type
            if (type !== 'saui') {
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
            else {
              ad()
            }
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
  methods: {
    __ready() {
      ad('2020/12/24', '2021/01/02')
    }
  }
})

let header = ui_item({
  $$id: 'pageshead',
  title: [
    {
      title: ' ',
      itemClass: 'icon-saui'
    },
    {
      title: 'SAUI', itemClass: 'item-logo-title'
    }
  ],
  body: [
    {
      title: '欢迎您',
      itemClass: 'flex-row al-item-center size'
    },
    {
      title: 'lgh',
      itemClass: 'ml-default'
    },
    {
      title: 'Search',
      itemClass: 'like-search ml-auto',
      aim: 'onSearchPop'
    },
    // {
    //   title: [
    //     {title: '默认主题', tap: 'onTheme?type=default', itemClass: 'link-primary'},
    //     {title: '橙', tap: 'onTheme?type=orange', itemClass: 'link-primary'},
    //     {title: '绿', tap: 'onTheme?type=green', itemClass: 'link-primary'},
    //   ],
    //   titleClass: 'item-theme'
    // },
    {
      title: ' ',
      itemClass: 'icon-nav color-primary ',
      tap: 'onNav'
    },
  ],
  itemClass: 'admin-header router-header',
  titleClass: 'item-logo color-primary',
  onNav(e, param, inst) {
    header.toggleClass('activeSwitch')
  }
})

const path = location.hash.slice(1)

export default Pager.pages([
  {url: '/normal/font', content: import('./_normal/font')},
  {url: '/normal/color', content: import('./_normal/color')},
  {url: '/normal/icon', content: import('./_normal/icon')},
  {url: '/normal/button', content: import('./_normal/button')},
  {url: '/normal/lineheight', content: import('./_normal/lineheight')},
  
  {url: '/feedback/tooltip', content: import('./_feedback/tooltip')},
  {url: '/feedback/alert', content: import('./_feedback/alert')},
  {url: '/feedback/tip', content: import('./_feedback/tip')},
  {url: '/feedback/modal', content: import('./_feedback/modal')},
  {url: '/feedback/notice', content: import('./_feedback/notice')},
  {url: '/feedback/drawer', content: import('./_feedback/drawer')},
  {url: '/feedback/load', content: import('./_feedback/load')},

  {url: '/show/table', content: import('./_show/table')},
  {url: '/show/btTable', content: import('./_show/btTable')},
  {url: '/show/swiper', content: import('./_show/swiper')},
], {
  header: function () {
    return <header.UI/>
  },
  menus: function() {
    return <menuInstance.UI />
  },
  select: path || '/normal/button'
})
