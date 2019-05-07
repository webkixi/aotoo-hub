//适用于list效果1
const adapterListSs = (data, opts) => {
  const {imgClass, titleClass, descClass, titleGClass, itemClass, bodyClass} = opts || {}
  let output = []
  if (data && data.length > 0){
    data.map ( item => {
      let img, img2 = null
      if (typeof item.img == 'object'){
        img = item.img[0]
        img2 = item.img[1]
      }else{
        img = item.img
      }
      output.push({
        img: { src: img, itemClass: imgClass || 'mtb-20-r list-img' },
        body: [
          {
            title: item.desc ? [
              { title: item.title, itemClass: titleClass || 'list-title-1' },
              { title: item.desc, itemClass: descClass || 'list-desc-1' },
            ]
            : { title: item.title, itemClass: 'list-title-1 ' + titleClass }
            ,
            titleClass: titleGClass,
            itemClass: itemClass
          },
          item.isArrows ? 
          { title: ' ', itemClass: 'icon-arrows-r color-grey ml-20-r' }
          // { title: [ { title: ' ',  itemClass: '' }, //作预留 { title: ' ', itemClass: 'icon-arrows-r color-grey ml-20-r' } ], }
          : ''
        ],
        bodyClass: 'ml-20-r ptb-20-r flex-1 '+bodyClass,
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}

//适用于list效果3
const adapterList2Ss = (data, opts) => {
  const {imgClass, titleClass, descClass, bodyClass, imgDotClass} = opts || {}
  let output = []
  if (data && data.length > 0){
    data.map ( item => {
      let img, img2 = null
      if (typeof item.img == 'object'){
        img = item.img[0]
        img2 = item.img[1]
      }else{
        img = item.img
      }
      output.push({
        title: item.imgdot ? [
          {
            img: { src: img, itemClass: imgClass || 'list-img' },
          },
          { title: ' ', itemClass: imgDotClass }
        ]
        : {img: { src: img, itemClass: imgClass || 'mtb-20-r list-img' }},
        body: [
          {
            title: [
              { title: item.title, itemClass: titleClass || 'list-title-1' },
              { title: '19/03/07', itemClass: 'color-grey size12' }
            ],
            titleClass: 'flex-row-between-center',
          },
          item.desc ? 
          {
            title: item.isVoice ? [
              { title: item.desc, itemClass: descClass || 'list-desc-1' },
              { title: ' ', itemClass: 'icon-silence color-grey size14 ml-20-r' }
            ]
            : { title: item.desc, itemClass: descClass || 'list-desc-1' },
            titleClass: 'flex-row-between-center',
          }
          : ''
        ],
        titleClass: 'ss-relative mtb-20-r',
        bodyClass: 'ml-20-r ptb-20-r flex-1 '+bodyClass,
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}


//适用于list效果4
const adapterList3Ss = (data, opts) => {
  // const {imgClass, titleClass, bodyClass, titledotClass, footerdescClass, footerdotClass, footerimgClass, footerClass, itemliClass, liClass} = opts
  // let output = []
  // if (data && data.length > 0){
  //   data.map ( item => {
  //     let img, img2 = null
  //     if (typeof item.img == 'object'){
  //       img = item.img[0]
  //       img2 = item.img[1]
  //     }else{
  //       img = item.img
  //     }
  //     output.push({
  //       img: {
  //         src: img,
  //         itemClass: imgClass
  //       },
  //       li: [{
  //         body: [
  //           {title: item.title, itemClass: titleClass},
  //           item.titleDot ? {title: item.titleDot, itemClass: 'icon-dot ml-r-20'} : ''
  //         ],
  //         bodyClass: bodyClass,
  //         footer: [
  //           item.footerDesc ? {title: item.footerDesc, itemClass: footerdescClass} : '',
  //           img2 ? 
  //           {
  //             k: {
  //               img: {src: img2, itemClass: footerimgClass}
  //             },
  //             v: {
  //               title: ' ',
  //               itemClass: 'icon-dot-small ss-absolute-tr'
  //             },
  //             kvClass: 'ss-relative padding-r-10 ml-10-r'
  //           }
  //           : '',
  //           {icon: {itemClass: 'icon-arrows-r color-grey'}}
  //         ],
  //         footerClass: footerClass,
  //         itemClass: itemliClass
  //       }],
  //       liClass: liClass
  //     })
  //   })
  // }
  // return output
}

//适用于list效果5
const adapterList4Ss = (data, opts) => {
  // const {imgClass, titleClass, bodyClass, itemliClass} = opts
  // let output = []
  // if (data && data.length > 0){
  //   data.map ( item => {
  //     let img, img2 = null
  //     if (typeof item.img == 'object'){
  //       img = item.img[0]
  //       img2 = item.img[1]
  //     }else{
  //       img = item.img
  //     }
  //     output.push({
  //       img: {
  //         src: img,
  //         itemClass: imgClass
  //       },
  //       title: [
  //         {
  //           title: item.title,
  //           itemClass: titleClass
  //         },
  //         {
  //           title: ' ',
  //           itemClass: 'icon-arrows-r color-grey'
  //         }
  //       ],
  //       titleClass: bodyClass,
  //       itemClass: itemliClass
  //     })
  //   })
  // }
  // return output
}

// 适用于list效果6  判断层级
const adapterList5Ss = (data, opts) => {
  const {imgClass, titleClass, bodyClass, titledotClass, footerdescClass, footerdotClass, footerimgClass, footerClass, itemliClass, liClass, type} = opts
  let output = []
  if (data && data.length > 0){
    data.map( item => {
      if (item.list && item.list.length > 0){
        output.push({
          li: adapterList4Ss(item.list, opts),
        })
      }
    })
  }
  return output
}

function tagFunc ( data, type) {
  let output = []
  let reg = new RegExp(" ","g")
  if (type == 'macaohkline'){
    let data1 = data.productFeaturesName ? data.productFeaturesName.trim().replace(reg, ',').split(',') : []
    let data2 = data.themeFeaturesName ? data.themeFeaturesName.trim().replace(reg, ',').split(',') : []
    data1.map( item => {
      output.push({
        title: item,
        itemClass: 'tag-fff-primary mr-10-r mb-10-r'
      })
    })
    data2.map( item => {
      output.push({
        title: item,
        itemClass: 'tag-fff-minor mr-10-r mb-10-r'
      })
    })
  }
  return output
}

function centerlineFunc ( data ) {
  data = data.trim().split(' ')
  return data.map(item =>{
    return {
      title: item,
      itemClass: 'item-li'
    }
  })
}

//适用于list效果7  参考组团港珠澳专线
const adapterList6Ss = (data, opts) => {
  const {imgClass, titleClass} = opts || {}
  let output = []
  if (data && data.length > 0){
    data.map ( item => {
      output.push({
        title: [
          {
            img: {
              src: item.productImages,
              itemClass: imgClass || 'list-img-lg'
            }
          },
          {
            title: item.departCityName,
            itemClass: 'dot-left-opacity-5'
          }
        ],
        titleClass: 'ss-relative',
        body: [
          {
            title: item.propertyIdentity,
            itemClass: titleClass || 'list-title-minor'
          },
          {
            title: item.productProperties.serviceGuaranteeName ?  centerlineFunc(item.productProperties.serviceGuaranteeName) : '',
            titleClass: 'color-grey mt-10-r line-li-20 xx'
          },
          {
            title: tagFunc(item.productProperties, 'macaohkline'),
            titleClass: 'flex-row mt-10-r',
          },
          {
            title: [
              { title: '成人结算价', itemClass: 'mr-10-r' },
              { title: '实名可见', itemClass: 'color-minor' }
            ],
            titleClass: 'flex-row color-default'
          }
        ],
        bodyClass: 'ml-20-r flex-1 size13',
        dot: [
          {
            title: ' ',
            itemClass: 'color-grey ml-10-r size16 icon-arrows-r flex-row-center hei-p100'
          }
        ],
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}

//适用于list效果8  参考组团港珠澳专线 澳门套票
const adapterList7Ss = (data, opts) => {
  const {imgClass, titleClass, descClass, kvitemClass, hbitemClass, bodyClass, liClass} = opts || {}
  let output = []
  if (data && data.length > 0){
    data.map ( item => {
      output.push({
        title: [
          {
            img: {
              src: item.productImages,
              itemClass: 'item-header-pic'
            }
          }
        ],
        titleClass: 'item-header',
        body: [
          {
            title: item.propertyIdentity,
            itemClass: titleClass || 'list-title-minor'
          },
          {
            title: [
              { title: '结算价', itemClass: 'mr-10-r' },
              { title: '实名可见', itemClass: 'color-minor' }
            ],
            titleClass: 'flex-row color-grey mb-6-r'
          },
          {
            title: '测试品牌名称测试品牌名称测试品牌名称测试-测试企业全称测试企业全称测试企业全称测试企业全称测试企业全称',
            itemClass: 'textellipsis-1 color-default'
          }
        ],
        bodyClass: 'size12 item-body',
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}


//适用于tree 效果 
const adapterTreeSs = (data) => {
  let output = []
  for (let idfTitle in data){
    output.push({
      title: { title: idfTitle, itemClass: 'ss-title'}, idf: idfTitle,
      // title: [
      //   {title: idfTitle, itemClass: 'idfxxx'},
      //   {title: ' ', itemClass: 'icon-arrows-b'}
      // ],
      titleClass: 'ss-title-flex-between',
      idf: idfTitle
    })
    data[idfTitle].map( (item, ii) => {
      output.push({
        // title: { title: item.navTitle, itemClass: 'parentxx'}, parent: idfTitle, itemClass: 'li'
        title: [
          {
            img: {
              src: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
              itemClass: 'pic-80-r radius-10-r mtb-14-r'
            }
          },
          {
            title: {
              title: item.navTitle,
              itemClass: 'hei-p100 flex-row-center'
            },
            itemClass: (data[idfTitle].length - 1) != ii ? 'title-333 size16 textellipsis-1 ml-20-r flex-1 bb-default' : 'title-333 size16 textellipsis-1 ml-20-r flex-1'
          },
        ],
        titleClass: 'ss-focus flex-row',
        parent: idfTitle, 
        itemClass: 'li'
      })
    })
  }
  return output
}
// {
//   "F": [
//     { navTitle: 'xxxx' },
//     { navTitle: 'xxxx' },
//   ]
// }

// [
//   {
//     title: {
//       title: 'xxx',
//       itemClass: 'class'
//     },
//     idf: 'xxxx'
//   },
//   {
//     '@item': {
//       title:
//     }
//   }
// ]

module.exports = {
  adapterListSs,
  adapterList2Ss,
  adapterList3Ss,
  adapterList4Ss,
  adapterList5Ss,
  adapterList6Ss,
  adapterList7Ss,
  adapterTreeSs
}
