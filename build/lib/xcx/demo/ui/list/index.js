//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const listData = [
  {
    title: [{
        img: {
          src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
          class: 'item-pic-45 mr10'
        },
      },
      {
        title: '99',
        class: 'icon-dot icon-dot-more'
      }
    ],
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '99',
        class: 'icon-dot icon-dot-more'
      }
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '2',
        class: 'icon-dot icon-dot-small'
      }
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '',
        class: 'icon-dot'
      }
    }]
  }
]


Pager({
  data: {
    motto: Pager.list({
      data: listData,
      itemClass: 'li item-pic hei45',
      listClass: 'ul list-normal'
    })
  }
})
