import getdata from './data'
import adapter from './adapter'

export const stringData = {
  title: [
    {title: '字符串', class: 'h2'},
    {title: '自定义字符串', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
    {
      title: '据悉，一年前该机构的研究就展示出相比于传统娱乐行业，互联网及其各种平台是如何让更多内容创作者赚取了更多利润。而这次研究直接关注了许多小的自媒体。该群体不同于阿里安娜·格兰德(Ariana Grande)或德韦恩·约翰逊(Dwayne Johnson)等主流明星，后者主要通过Instagram品牌赞助、YouTube收入分成等方式获得了大量收入。而在互联网蓬勃发展之前，很多自媒体根本赚不到钱'
    }
  ]
}

export const aimData = {
  title: [
    {title: 'aim指令', class: 'h2'},
    {title: 'aim指令能够很灵活的为结构设置tap事件', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
    {title: '点我试试', aim: 'inner-response'}
  ]
}

export const iconData = {
  title: [
    {title: 'ICON', class: 'h2', style: 'margin: 0 0 50rpx 0; display: block;'},
    {icon: 'icon-rili'},
    {icon: { class: 'icon-mingpian', style: 'font-size: 32px; margin-left: 5px;'}},
  ]
}

export const longpressData = {
  title: [
    {title: 'longpress', class: 'h2', style: 'margin: 0 0 50rpx 0; display: block;'},
    {title: '长按我', class: 'button primary', style: "width: 200rpx;", aim: 'xxx'}
  ],
  longpress: 'onLongPress?b=1&c=2&d=3',
  tap: 'onTap?abc=xxx'
}

export const titlesData = {
  title: [
    {title: '标题数组', class: 'h2', style: 'margin: 0 0 50rpx 0; display: block;'},
    {title: '标题一', class: 'h1', aim: 'x'},
    {title: '标题二', class: 'h2', aim: 'x'},
    {title: '标题三', class: 'h3', aim: 'x'},
    {title: '标题四', class: 'h4', aim: 'x'},
    {title: '标题五', class: 'h5', aim: 'x'},
    {title: '标题六', class: 'h6', aim: 'x'},
  ]
}

export const onepicData = {
  title: {title: '一张图片', class: 'h2', style: 'margin: 0 0 50rpx 0; display: block;'},
  img: {
    src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
    aim: 'http://www.agzgz.com',
    mode: 'widthFix'
  }
}

export const picsData = {
  title: {title: '一组图片', class: 'h2', style: 'margin: 0 0 50rpx 0; display: block;'},
  img: [
    { src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg', aim: 'x', style: 'width: 80vw; display: block; margin-top: 1vh;'},
    { src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg', aim: 'x', style: 'width: 60vw; display: block; margin-top: 1vh;'},
    { src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg', aim: 'x', style: 'width: 40vw; display: block; margin-top: 1vh;'},
  ]
}

export const sortData = {
  title: [
    {title: '自定义排序', class: 'h2'},
    {title: '通过上下移动属性值来调整位置', class: 'h6', style: 'margin: 0 0 50rpx 0;'}
  ],
  body: [
    {
      img: { src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg', aim: 'x', style: 'width: 80vw; display: block; margin-top: 1vh;'},
      title: '图片标题',
      class: 'h4',
      k: {title: '属性key：', class: 'h6'},
      v: {title: '属性key的属性描述', class: 'h6'}
    },
    {title: {title: '--------- ', style: 'display: block; margin: 40rpx 0 50rpx 0; color: #fcfcfc;'}},
    {
      title: '图片标题',
      k: {title: '属性key：', class: 'h6'},
      v: {title: '属性key的属性描述', class: 'h6'},
      img: { src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg', aim: 'x', style: 'width: 80vw; display: block; margin-top: 1vh;'},
      class: 'h4',
    }
  ]
}

export const listData = {
  itemClass: 'x',
  title: [
    {
      '@item': {
        title: [
          {
            title: '效果1',
            class: 'item-titlex'
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        class: 'bg-title-f3f3f3'
      },
    },
    {
      '@list': {
        listClass: 'bb-e3e3e3-list-hbody',
        itemClass: 'plr-20-r ss-focus flex-row',
        data: adapter.adapterListSs(
          getdata.listDatax,
          {
            imgClass: 'pic-120-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            descClass: 'color-grey textellipsis-1 size14',
            bodyClass: 'ml-20-r ptb-20-r flex-1'
          }
        )
      }
    },
    {
      '@list': {
        listClass: 'bb-e3e3e3-list-hbody',
        itemClass: 'plr-20-r ss-focus flex-row',
        data: adapter.adapterListSs(
          getdata.listData4x,
          {
            imgClass: 'pic-120-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            descClass: 'color-grey textellipsis-1 size14',
            kvitemClass: 'hei-p100 flex-column-between',
            hbitemClass: 'hei-p100',
            bodyClass: 'ml-20-r ptb-20-r flex-1 flex-row-between-center'
          }
        )
      }
    },
    {
      '@item': {
        title: [
          {
            title: '效果2',
            class: 'item-titlex'
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        class: 'bg-title-f3f3f3'
      },
    },
    {
      '@list': {
        itemClass: 'padding-20-r item-normal-row',
        data: adapter.adapterListSs(
          getdata.listData2x,
          {
            imgClass: 'pic-120-r radius-10-r',
            titleClass: 'title-333 size16 textellipsis-1',
            descClass: 'color-grey textellipsis-1 size14',
            kvitemClass: 'hkv-around',
          }
        )
      }
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-1 mr-10-r size16 color-primary'},
              {title: '效果3', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      '@list': {
        itemClass: 'plr-20-r ss-focus flex-row',
        data: adapter.adapterList2Ss(
          getdata.listDatax,
          {
            imgClass: 'pic-80-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            descClass: 'color-grey textellipsis-1 size14',
            bodyClass: 'flex-1 pt-20-r ml-20-r bb-default',
            imgDotClass: 'icon-dot-small ss-absolute-tr'
          }
        )
      }
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果4', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      '@list': {
        itemClass: 'plr-20-r ss-focus flex-row bb-e3e3e3-item-line',
        data: adapter.adapterList3Ss(
          getdata.listData2x,
          {
            imgClass: 'pic-80-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            bodyClass: 'flex-row-center',
            footerdescClass: 'color-grey size14',
            footerimgClass: 'pic-40-r',
            footerClass: 'flex-row-center',
            itemliClass: 'flex-row-between-center hei-p100',
            liClass: 'hei-120-r ml-20-r flex-1 item-line',
          }
        )
      }
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果5', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      '@list': {
        // itemClass: 'plr-20-r ss-focus flex-row',
        data: adapter.adapterList4Ss(
          getdata.listData2x,
          {
            imgClass: 'pic-80-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            bodyClass: 'flex-row-between-center hei-120-r ml-20-r flex-1 item-line',
            itemliClass: 'plr-20-r ss-focus flex-row bb-e3e3e3-item-line',
          }
        )
      }
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果6', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      '@list': {
        listClass: 'bg-f3f3f3',
        itemClass: 'mb-20-r bg-fff',
        data: adapter.adapterList5Ss(
          getdata.listData5x,
          {
            imgClass: 'pic-80-r radius-10-r mtb-20-r',
            titleClass: 'title-333 size16 textellipsis-1',
            bodyClass: 'flex-row-between-center hei-120-r ml-20-r flex-1 item-line',
            itemliClass: 'plr-20-r ss-focus flex-row bb-e3e3e3-item-line',
          }
        )
      }
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果7', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      title: {title: '点击有惊喜', aim: 'open_diytour?direction=bot', class: 'padding-20-r'},
    },
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果8', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      title: {title: '点击有惊喜2', aim: 'open_diytourx?direction=bot', class: 'padding-20-r'},
    },
    // {
    //   '@item': {
    //     body: [
    //       {
    //         title: [
    //           {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
    //           {title: '效果5', class: 'item-titlex'}
    //         ],
    //       },
    //       {
    //         title: 'ss',
    //         class: 'item-descx'
    //       }
    //     ],
    //     bodyClass: 'bg-title-body-f3f3f3'
    //   },
    // },
    // {
    //   '@list': {
    //     itemClass: 'plr-20-r ss-focus flex-row',
    //     data: adapter.adapterList4Ss(
    //       getdata.listData2x,
    //       {
    //         imgClass: 'pic-80-r radius-10-r mtb-20-r',
    //         titleClass: 'title-333 size16 textellipsis-1',
    //         bodyClass: 'flex-row-center',
    //         footerdescClass: 'color-grey size14',
    //         footerimgClass: 'pic-40-r',
    //         footerClass: 'flex-row-center',
    //         itemliClass: 'flex-row-between-center hei-p100',
    //         liClass: 'hei-120-r ml-20-r flex-1 bb-default',
    //       }
    //     )
    //   }
    // },
  ]
}

export const treeData = {
  title: [
    {title: '树结构', class: 'h2'},
    {title: '支持4层树，树结构需特定数据结构', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果1', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3'
      },
    },
    {
      '@tree': {
        $$id: 'mytree',
        data: [
          {title: {title: '层级一', class: 'h6'}, idf: 'level_1'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_1'},
          {title: {title: '层级二', class: 'h6'}, parent: 'level_1', idf: 'level_2', aim: 'abc'},
          // {title: {title: 'content222', class: 'h6'}, parent: 'level_2', aim: 'xx-delete'},
          {title: {title: '点击删除本行', class: 'h6', style: 'text-decoration: underline;'}, parent: 'level_2', tap: 'mytree-delete'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_2'},
          {title: {title: '层级三，点我折叠', class: 'h6'}, parent: 'level_2', idf: 'level_3', tap: 'tree-hide'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_3'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_3'},
          {title: {title: '层级四', class: 'h6'}, parent: 'level_3', idf: 'level_4'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_4'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_4'},
          {title: {title: 'content', class: 'h6'}, parent: 'level_4'},
        ]
      }
    },
    {'@item': {
      title: [
        {title: 'append', class: 'button primary', aim: 'tree-append'},
        {title: 'prepend', class: 'button primary', aim: 'tree-prepend'},
        // {title: 'hide', class: 'button primary', aim: 'tree-hide'},
      ]
    }},
    {
      '@item': {
        body: [
          {
            title: [
              {title: '', class: 'icon-2 mr-10-r size16 color-primary'},
              {title: '效果2', class: 'item-titlex'}
            ],
          },
          {
            title: 'ss',
            class: 'item-descx'
          }
        ],
        bodyClass: 'bg-title-body-f3f3f3 mt-20-r'
      },
    },
    {
      '@tree': {
        $$id: 'mytree2',
        listClass: 'ss-tree-hierarchy',
        // itemClass: 'ss-tree-hierarchy',
        data: adapter.adapterTreeSs(getdata.listData1xx)
      }
    },
  ]
}

export const buttonForAs = {
  data: [
    { title: [
        {title: 'fullscreen-right', class: 'item' },
        {title: '全屏侧弹窗-右侧', aim: 'as-full', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'fullscreen-left', class: 'item' },
        {title: '全屏侧弹窗-左侧', aim: 'as-full?direction=left', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'fullscreen-bottom', class: 'item' },
        {title: '全屏侧弹窗-底弹', aim: 'as-full?direction=bot', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'fullscreen-top', class: 'item' },
        {title: '全屏侧弹窗-顶弹', aim: 'as-full?direction=top', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'bar-right', class: 'item' },
        {title: '弹半框-右侧', aim: 'open-bar', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'bar-left', class: 'item' },
        {title: '弹半框-左侧', aim: 'open-bar?direction=left', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'bar-bot', class: 'item' },
        {title: '弹半框-底侧', aim: 'open-bar?direction=bot', class: 'item icon-arrows-r'},
    ]},
    { title: [
        {title: 'bar-top', class: 'item' },
        {title: '弹半框-顶侧', aim: 'open-bar?direction=top', class: 'item icon-arrows-r'},
    ]},
  ],
  itemClass: 'li item-normal',
  listClass: 'ul'
}

// 弹窗
export const actionSide1 = {
  id: 'actionSide1',
  title: [
    {title: '打开新侧弹', aim: 'open_as2'},
  ]
}


export const actionSide2 = {
  id: 'actionSide2',
  title: '侧弹2',
}

export const actionSide3 = {
  id: 'actionSide3',
  title: '侧弹3',
}



export const listDiytour = {
  id: 'listDiytour',
  title: '侧弹3',
}


export const tabData = {
  data: [
    {title: 'aaa', content: 'aaa-content'},
    {title: 'bbb', content: 'bbb-content'},
    {title: 'ccc', content: 'ccc-content'},
  ]
}

export const diytourData = {
  '@list': {
    listClass: 'bs-e3e3e3-list',
    itemClass: 'ss-focus flex-row item padding-normal',
    data: adapter.adapterList6Ss(
      getdata.listData2xx
    )
  }
}

export const diytour2Data = {
  '@list': {
    listClass: 'list-pic-column pic-2',
    itemClass: 'ss-focus item-li',
    data: adapter.adapterList7Ss(
      getdata.listData2xx
    )
  }
}
