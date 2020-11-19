const nav = Pager.nav
const lib = ao2.lib

let menuInstance = ui_tree({
  data: [
    {title: '通用', itemClass: 'menu-caption', idf: 'normal'},
    {title: '字体', attr: {file: '/normal/font'}, select: true, parent: 'normal'}, 
    {title: '图标', attr: {file: '/normal/icon'}, parent: 'normal' },
    {title: '色块', attr: {file: '/normal/color'}, parent: 'normal' },
    {title: '按钮', attr: {file: '/normal/button'}, parent: 'normal' },

    // {title: '数据展示', itemClass: 'menu-caption', idf: 'show'},
    {title: '反馈', itemClass: 'menu-caption', idf: 'feedback'},
    {title: '提示框', attr: {file: '/feedback/tip'}, parent: 'feedback'}, 
    {title: '弹出层', attr: {file: '/feedback/modal'}, parent: 'feedback'}, 
    {title: '通知', attr: {file: '/feedback/notice'}, parent: 'feedback'},
  ],
  itemMethod: {
    aim(e, param, inst){
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
            nav.redirectTo({ url: file })
          }, 50);
        }
      }
    }
  },
  listClass: 'router-menu-list'
})

let header = ui_item({
  title: [
    {
      img: {
        src: './images/ui/saui-logo.png'
      },
    },
    {
      title: 'SAUI', itemClass: 'item-logo-title'
    }
  ],
  body: [
    {
      title: '欢迎您',
      itemClass: 'flex-row al-item-center flex-1 size'
    },
    {
      title: [
        {
          title: 'lgh',
          itemClass: 'mlr-default'
        },
        {
          title: '退出'
        }
      ],
      titleClass: 'flex-row al-item-center'
    }
  ],
  itemClass: 'admin-header',
  titleClass: 'item-logo'
})

const path = location.hash.slice(1)

export default Pager.pages([
  {url: '/normal/font', content: import('./_normal/font')},
  {url: '/normal/color', content: import('./_normal/color')},
  {url: '/normal/icon', content: import('./_normal/icon')},
  {url: '/normal/button', content: import('./_normal/button')},
  
  {url: '/feedback/tip', content: import('./_feedback/tip')},
  {url: '/feedback/modal', content: import('./_feedback/modal')},
  {url: '/feedback/notice', content: import('./_feedback/notice')},
], {
  header: <header.UI/>,
  menus: <menuInstance.UI />,
  select: path || '/normal/button'
})



// import {render} from '@aotoo/aotoo'
// let list = ui_tree({
//   data: [
//     {title: '通用', itemClass: 'menu-caption', idf: 'normal'},
//     {title: '字体', parent: 'normal'},  // webpack支持
//     {title: '图标', parent: 'normal' },  // 编译模式易扩展
//     {title: '色块', parent: 'normal' },
//     {title: '按钮', parent: 'normal' },
//   ],
//   itemMethod: {
//     onClick(e, param, inst){
//       // e.stopPropagation()
//       console.log('===== 9999')
//       inst.addClass('xxx')
//     }
//   }
// })

// render(<list.UI />, 'root')