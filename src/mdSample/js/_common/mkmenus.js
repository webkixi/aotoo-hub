const nav = Pager.nav
const lib = ao2.lib

import _message from "components/items/message";
const message = _message()

function onCovering() {
  const pageshead = $$('#pageshead')
  // const menusnav = $$('#menusnav')
  // const Menus = $$('#abc')
  // Menus.removeClass('active')
  // menusnav.removeClass('active')
  pageshead.removeClass('activeSwitch')
}

function onItemClick(e, param, inst){
  e.stopPropagation()
  let file = inst.attr('file')
  let parent = inst.parent().parent()
  let xx = false
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
        nav.redirectTo({ url: '/index/a?file=' + file})
      }, 50);
    }
  }
  else {
    if (!inst.hasClass('active')) {
      inst.addClass('active')
    }
    else {
      !parent ? inst.removeClass('active') : ''
    }
  }
  onCovering()
  // if (!inst.siblings().hasClass('active')) {
  //   inst.siblings().removeClass('active')
  // }
}

module.exports = function(params){
  let Menus = ui_tree({
    $$id: 'abc',
    data: params,
    listClass: 'router-menu-list router-menus flex-column justify-between',
    itemMethod: {
      onClick: onItemClick
    },
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
    }
  })

  return <Menus.UI />
}
