const treeDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'data',
      desc: '数据： [{ title: "菜单一", id: "aaa", children: [....] }] ',
      type: 'array',
      ck: '-',
      default: '-'
    },
    {
      params: 'allShow',
      desc: '是否全部展开',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'showCheck',
      desc: '是否显示 checkbox',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'icon',
      desc: '可指定checkbox前的icon，这里只是更换icon，具体布局需要于listClass等配合',
      type: 'string',
      ck: '-',
      default: 'icon-select'
    },
    {
      params: 'getTreeData',
      desc: '获取选中值',
      type: 'function',
      ck: '-',
      default: ''
    },
    {
      params: 'clearTreeData',
      desc: '清空所有数据',
      type: 'function',
      ck: '-',
      default: ''
    },
    {
      params: 'resetData',
      desc: '重置数据',
      type: 'function',
      ck: '-',
      default: ''
    }
  ]
}

const tabsDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'select',
      desc: '显示第几个菜单，及对应的内容',
      type: 'number',
      ck: '-',
      default: '0'
    },
    {
      params: 'position',
      desc: 'tabs组件的排序，是上下结构还是左右结构，目前支持top/right',
      type: 'string',
      ck: '-',
      default: 'top'
    },
    {
      params: 'allShow',
      desc: 'tabs内容是否全部展开',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'assignJump',
      desc: '点击菜单跳转到对应的内容。注：allShow 为true时，生效',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'containerClass',
      desc: '最外层内器 class',
      type: 'string',
      ck: '-',
      default: 'tabs-containe'
    },
    {
      params: 'menusClass',
      desc: '菜单 class',
      type: 'string',
      ck: '-',
      default: 'tabsMenus'
    },
    {
      params: 'contentClass',
      desc: '内容 class',
      type: 'string',
      ck: '-',
      default: 'tabsBoxes'
    },
    {
      params: 'menus',
      desc: '菜单 数据',
      type: '数组',
      ck: '-',
      default: '[]'
    },
    {
      params: 'content',
      desc: '内容 数据',
      type: '数组',
      ck: '-',
      default: '[]'
    },
    {
      params: 'footer',
      desc: 'tabs 底部',
      type: '支持 item 结构',
      ck: '-',
      default: ''
    },
    {
      params: 'appendItem',
      desc: '自定义添加菜单，及内容, appendItem({menus: {title: "xx"}, content: {title: "xxx"})',
      type: 'function',
      ck: '-',
      default: ''
    },
    {
      params: 'changeSort',
      desc: '同时可通过方法，改变tabs的排序 changeSort("top/right")',
      type: 'function',
      ck: '-',
      default: ''
    },
    {
      params: 'removeDisabled',
      desc: '移除菜单的禁止状态，只接受菜单的下标（number） removeDisabled(idx)',
      type: 'function',
      ck: '-',
      default: ''
    },
    {
      params: 'deleteItem',
      desc: '删除某一菜单，只接受菜单的下标（number） removeDisabled(idx)',
      type: 'function',
      ck: '-',
      default: ''
    }
  ]
}

const btTableDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: '$$id',
      desc: 'id',
      type: 'string',
      ck: '-',
      default: 'swiperx'
    },
    {
      params: 'options',
      desc: 'bootstrapTable组件的配置参数，详情可参考bootstrapTable',
      type: 'object',
      ck: '-',
      default: '-'
    },
  ]
}

const swiperDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'type',
      desc: 'list/img  list: 是Aoolist组件需要的格式',
      type: 'string',
      ck: '-',
      default: 'list'
    },
    {
      params: 'swiperClass',
      desc: '容器 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: '$$id',
      desc: 'id',
      type: 'string',
      ck: '-',
      default: 'swiperx'
    },
    {
      params: 'data',
      desc: '数据',
      type: 'array',
      ck: '-',
      default: '-'
    },
    {
      params: 'options',
      desc: 'swiper组件的配置参数，详情可参考swiper',
      type: 'object',
      ck: '-',
      default: '-'
    },
  ]
}

const tipDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'type',
      desc: '分为sucess/fail/warning',
      type: 'string',
      ck: '-',
      default: 'warning'
    },
    {
      params: 'itemClass',
      desc: '容器 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'timer',
      desc: '延迟关闭时间',
      type: 'string',
      ck: '-',
      default: '3000'
    },
    {
      params: 'animation',
      desc: '弹出层动画',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
  ]
}

const drawerDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'containersClass',
      desc: '大容器 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'itemClass',
      desc: '容器 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'showClose',
      desc: '是否显示关闭按钮',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'cbCancel',
      desc: '关闭按钮回调',
      type: 'function',
      ck: '-',
      default: 'false'
    },
    {
      params: 'direction',
      desc: '弹出的方向',
      type: 'string',
      ck: '-',
      default: 'right'
    },
    {
      params: 'bgCloseSmall',
      desc: '多抽屉，用于同方向第二个起',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'bgClose',
      desc: '是否需要点击背景关闭弹出层',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'cbBg',
      desc: '点击背景关闭弹出层时的回调方法',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'mask',
      desc: '遮盖层',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'animation',
      desc: '弹出层动画',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
  ]
}

const modalDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: 'type',
      desc: '弹出层类型分为两种：normal 提示性, options 操作性',
      type: 'string',
      ck: 'normal/options',
      default: 'normal'
    },
    {
      params: 'showClose',
      desc: '是否显示关闭按钮',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'showFooter',
      desc: '是否有底部,包含取消、确认等按钮',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'showCancel',
      desc: '是否显示取消按钮',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'showConfirm',
      desc: '是否显示确认按钮',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'cancelText',
      desc: '取消按钮文字',
      type: 'string',
      ck: '-',
      default: '取消'
    },
    {
      params: 'confirmText',
      desc: '确认按钮文字',
      type: 'string',
      ck: '-',
      default: '确认'
    },
    {
      params: 'modalClass',
      desc: '弹出层 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'headClass',
      desc: '头部 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'bodyClass',
      desc: '内容 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'footerClass',
      desc: '底部 Class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'width',
      desc: '可控制弹出层的宽度',
      type: 'string',
      ck: '-',
      default: '20%'
    },
    {
      params: 'bgClose',
      desc: '是否需要点击背景关闭弹出层',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'cbBg',
      desc: '点击背景关闭弹出层时的回调方法',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'mask',
      desc: '遮盖层',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'animation',
      desc: '弹出层动画',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'cbConfirm',
      desc: '点击确定按钮的回调方法',
      type: 'function',
      ck: '-',
      default: 'false'
    },
    {
      params: 'cbCancel',
      desc: '点击确取消按钮的回调方法',
      type: 'function',
      ck: '-',
      default: 'false'
    },
  ]
}

const loadDoc = {
  columns: [
    {title: '参数', field: 'params'},
    {title: '说明', field: 'desc'},
    {title: '类型', field: 'type'},
    {title: '可选值', field: 'ck'},
    {title: '默认值', field: 'default'}
  ],
  data: [
    {
      params: '$$id',
      desc: '可通过$$id操作组件',
      type: 'string',
      ck: '-',
      default: '自动生成id'
    },
    {
      params: 'title',
      desc: 'load时的文字',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'html',
      desc: 'true时直接在结构上添加load; false通过点击事件触发添加load',
      type: 'boolean',
      ck: '-',
      default: 'true'
    },
    {
      params: 'innerEle',
      desc: '指定在某个元素下 限id或class',
      type: 'string',
      ck: '-',
      default: '-'
    },
    {
      params: 'itemClass',
      desc: 'load Class',
      type: 'string',
      ck: '-',
      default: 'load-01'
    },
    {
      params: 'absolute',
      desc: 'load是否是定位',
      type: 'boolean',
      ck: '-',
      default: 'false'
    },
    {
      params: 'timer',
      desc: 'html为false时，timer生效。可控制load是否自动关闭',
      type: 'string',
      ck: '-',
      default: 'false/0'
    },
  ]
}


module.exports = {
  loadDoc,
  modalDoc,
  drawerDoc,
  tipDoc,
  swiperDoc,
  btTableDoc,
  tabsDoc,
  treeDoc
}