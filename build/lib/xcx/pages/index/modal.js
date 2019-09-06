const swiperType = {
  is: 'swiper',
  "indicator-dots": true,
  "indicator-color": "#999",
  "indicator-active-color	": "#ccc",
  // "previous-margin": "30rpx",
  // "next-margin": "30rpx",
  circular: false,
  duration: 300,
  "display-multiple-items": 1
}

function itemSwiper(data, listClass) {
  return {
    type: swiperType,
    data: data,
    // itemClass: 'd-swiper-title',
    // listClass: 'd-swiper-ul ds-li-' + listClass
    listClass: listClass
  }
}


function adapterItemUpdate (data) {
  let output = []
  data.map ( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'color-minor fw-bold'
      },
      idf: item.id,
      // liClass: 'bg-fff list-bb bb-default'
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {title: itemxx.title, itemClass: 'mr-10-r'},
          {title: itemxx.desc}
        ],
        titleClass: item.id == 'demo' ? 'flex-row-between-center size12' : 'flex-row size12',
        parent: item.id,
        itemClass: 'item',
      })
    })
  })
  return [{
    '@tree': {
      data: output,
      listClass: 'item-body color-grey wid-p86 flex-column lhei-60-r ss-left display-bg-minor',
      itemClass: 'bb-e3e3e3-item'
    }
  }]
}

function adapterItemSwiper (data) {
  const modalx = itemSwiper(
    [
      {
        title: [
          {
            title: '交流群',
            itemClass: 'm-title-fs'
          },
          {
            title: '如有建议，问题，可加入此交流群',
            itemClass: 'm-desc-fs'
          }
        ],
        body: [
          {
            img: '/images/qq.jpg',
            itemClass: 'pic-382-r'
          }
        ],
        titleClass: 'color-fff item-header',
        bodyClass: 'item-body display-bg-minor',
        itemClass: 'item-wrapper item-wrapper-1'
      },
      {
        title: [
          {
            title: '赞赏',
            itemClass: 'm-title-fs'
          },
          {
            title: '你的赞赏，是对作者最大的支持',
            itemClass: 'm-desc-fs'
          }
        ],
        body: [
          {
            img: '/images/pay.jpg',
            itemClass: 'pic-382-r'
          }
        ],
        titleClass: 'color-fff item-header',
        bodyClass: 'item-body display-bg-minor',
        itemClass: 'item-wrapper item-wrapper-2'
      }
    ],
    'index-swiper-modal item-hei'
  )
  return modalx
}


export default {
  itemSwiper,
  adapterItemUpdate,
  adapterItemSwiper
}