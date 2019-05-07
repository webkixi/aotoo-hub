//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')


const data = [
  {
    title: 'List 图文列表',
    id: 'list',
    list: [
      { title: 'Normal', attr: 'normal', littleTitle: '常规 ' },
      { title: 'Wxchat', attr: 'wxchat', littleTitle: '聊天列表 ' },
      { title: 'Macaohkline', attr: 'lrpic', littleTitle: '业务1 ' },
      { title: 'Diytour', attr: 'tbpic', littleTitle: '业务2 ' },
    ]
  },
]

const adapterMenu = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'bg-title'
      },
      idf: item.id,
      liClass: 'bg-fff list-bb bb-default'
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {title: itemxx.title},
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey'}
        ],
        titleClass: 'item-border flex-row-between-center',
        parent: item.id,
        itemClass: 'item ss-focus',
        tap: 'onTap?demo='+itemxx.attr 
      })
    })
  })
  return output
}

Pager({
  data: {
    menuData: Pager.tree({
      $$id: 'sstree',
      type: {
        is: "scroll"
      },
      data: adapterMenu(data)
    }),
  },
  onTap: function(e, query, inst) {
    const theTap = query.demo.replace(/_/g,"/")
    console.log(theTap)
    if (theTap) {
      switch (theTap) {
        case theTap:
          wx.navigateTo({
            url: './'+theTap+'/index'
          })
        break;
      }
    }
  },
})

// const listData = [
//   {
//     title: [{
//         img: {
//           src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
//           class: 'item-pic-45 mr10'
//         },
//       },
//       {
//         title: '99',
//         class: 'icon-dot icon-dot-more'
//       }
//     ],
//     li: [{
//       body: [{
//           title: {
//             title: '我是标题',
//             class: 'item-title'
//           }
//         },
//         {
//           title: {
//             title: '12:22',
//             class: 'item-time'
//           }
//         }
//       ],
//       footer: [{
//           title: {
//             title: '简介简介简介简介简介',
//             class: 'item-desc'
//           }
//         },
//         {
//           icon: {
//             class: 'item-icon icon-apptubiao-110'
//           }
//         }
//       ]
//     }]
//   },
//   {
//     img: {
//       src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
//       class: 'item-pic-45 mr10'
//     },
//     li: [{
//       body: [{
//           title: {
//             title: '我是标题',
//             class: 'item-title'
//           }
//         },
//         {
//           title: {
//             title: '12:22',
//             class: 'item-time'
//           }
//         }
//       ],
//       footer: [{
//           title: {
//             title: '简介简介简介简介简介',
//             class: 'item-desc'
//           }
//         },
//         {
//           icon: {
//             class: 'item-icon icon-apptubiao-110'
//           }
//         }
//       ]
//     }],
//     dot: [{
//       title: {
//         title: '99',
//         class: 'icon-dot icon-dot-more'
//       }
//     }]
//   },
//   {
//     img: {
//       src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
//       class: 'item-pic-45 mr10'
//     },
//     li: [{
//       body: [{
//           title: {
//             title: '我是标题',
//             class: 'item-title'
//           }
//         },
//         {
//           title: {
//             title: '12:22',
//             class: 'item-time'
//           }
//         }
//       ],
//       footer: [{
//           title: {
//             title: '简介简介简介简介简介',
//             class: 'item-desc'
//           }
//         },
//         {
//           icon: {
//             class: 'item-icon icon-apptubiao-110'
//           }
//         }
//       ]
//     }],
//     dot: [{
//       title: {
//         title: '2',
//         class: 'icon-dot icon-dot-small'
//       }
//     }]
//   },
//   {
//     img: {
//       src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
//       class: 'item-pic-45 mr10'
//     },
//     li: [{
//       body: [{
//           title: {
//             title: '我是标题',
//             class: 'item-title'
//           }
//         },
//         {
//           title: {
//             title: '12:22',
//             class: 'item-time'
//           }
//         }
//       ],
//       footer: [{
//           title: {
//             title: '简介简介简介简介简介',
//             class: 'item-desc'
//           }
//         },
//         {
//           icon: {
//             class: 'item-icon icon-apptubiao-110'
//           }
//         }
//       ]
//     }],
//     dot: [{
//       title: {
//         title: '',
//         class: 'icon-dot'
//       }
//     }]
//   }
// ]


// Pager({
//   data: {
//     motto: Pager.list({
//       data: listData,
//       itemClass: 'li item-pic hei45',
//       listClass: 'ul list-normal'
//     })
//   }
// })
