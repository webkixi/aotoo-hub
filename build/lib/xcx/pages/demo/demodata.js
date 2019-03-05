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
  title: [
    {title: '插入列表', class: 'h2'},
    {title: '动态插入一个列表', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
    {
      '@list': {
        data: [
          '前前前前前前',
          '端端端端端端',
          '入入入入入入',
          '坑坑坑坑坑坑',
          '指指指指指指',
          '南南南南南南'
        ],
        class: 'h5'
      }
    }
  ]
}

export const treeData = {
  title: [
    {title: '树结构', class: 'h2'},
    {title: '支持4层树，树结构需特定数据结构', class: 'h6', style: 'margin: 0 0 50rpx 0;'},
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
          {title: {title: '层级三', class: 'h6'}, parent: 'level_2', idf: 'level_3'},
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
        {title: 'hide', class: 'button primary', aim: 'tree-hide'},
      ]
    }}
  ]
}

export const buttonForAs = {
  data: [
    { title: [
        {title: 'fullscreen-right', class: 'item' },
        {title: '全屏侧弹窗-右侧', aim: 'as-full', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'fullscreen-left', class: 'item' },
        {title: '全屏侧弹窗-左侧', aim: 'as-full?direction=left', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'fullscreen-bottom', class: 'item' },
        {title: '全屏侧弹窗-底弹', aim: 'as-full?direction=bot', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'fullscreen-top', class: 'item' },
        {title: '全屏侧弹窗-顶弹', aim: 'as-full?direction=top', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'bar-right', class: 'item' },
        {title: '弹半框-右侧', aim: 'open-bar', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'bar-left', class: 'item' },
        {title: '弹半框-左侧', aim: 'open-bar?direction=left', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'bar-bot', class: 'item' },
        {title: '弹半框-底侧', aim: 'open-bar?direction=bot', class: 'item iconfont item-icon'},
    ]},
    { title: [
        {title: 'bar-top', class: 'item' },
        {title: '弹半框-顶侧', aim: 'open-bar?direction=top', class: 'item iconfont item-icon'},
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

