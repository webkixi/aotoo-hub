//适用于list效果1
const adapterListSs = (data, opts) => {
  const {imgClass, titleClass, descClass, kvitemClass, hbitemClass, bodyClass} = opts
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
        img: {
          src: img,
          class: imgClass
        },
        body: [
          {
            k: {
              title: item.title,
              class: titleClass
            },
            v: {
              title: item.desc,
              class: descClass
            },
            kvClass: kvitemClass,
            class: hbitemClass
          },
          item.isArrows ? 
          {
            title: [
              {
                title: '',      //作预留
                class: ''
              },
              {
                title: ' ',
                class: 'icon-arrows-a-r color-999  ml-20-r'
              }
            ],
          }
          : ''
        ],
        bodyClass: bodyClass,
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}

//适用于list效果3
const adapterList2Ss = (data, opts) => {
  const {imgClass, titleClass, descClass, hbitemClass, itemliClass, bodyClass, imgDotClass} = opts
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
        title: [
          {
            img: {
              src: img,
              class: imgClass
            }
          },
          item.imgdot ? 
          {
            title: ' ',
            class: imgDotClass
          }
          : ''
        ],
        body: [
          {
            k: {
              title: item.title,
              class: titleClass
            },
            v: {
              title: '19/03/07',
              class: 'color-999 size12'
            },
            kvClass: 'flex-row-between-center',
          },
          item.desc ? 
          {
            k: {
              title: item.desc,
              class: descClass
            },
            v: item.isVoice ? {
              title: ' ',
              class: 'icon-silence color-999 size14 ml-20-r'
            } : '',
            kvClass: 'flex-row-between-center mb-20-r',
          }
          : ''
        ],
        bodyClass: bodyClass,
        tap: 'onTap?abc=xxx'
      })
    })
  }
  return output
}

//适用于list效果4
const adapterList3Ss = (data, opts) => {
  const {imgClass, titleClass, bodyClass, titledotClass, footerdescClass, footerdotClass, footerimgClass, footerClass, itemliClass, liClass, type} = opts
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
      if (type == 2){
        output.push({
          img: {
            src: img,
            class: imgClass
          },
          title: [
            {
              title: item.title,
              class: titleClass
            },
            {
              title: ' ',
              class: 'icon-arrows-a-r color-999'
            }
          ],
          titleClass: bodyClass
        })
      }
      else {
        output.push({
          img: {
            src: img,
            class: imgClass
          },
          li: [{
            body: [
              {title: item.title, class: titleClass},
              item.titleDot ? {title: item.titleDot, class: 'icon-dot ml-r-20'} : ''
            ],
            bodyClass: bodyClass,
            footer: [
              item.footerDesc ? {title: item.footerDesc, class: footerdescClass} : '',
              img2 ? 
              {
                k: {
                  img: {src: img2, class: footerimgClass}
                },
                v: {
                  title: ' ',
                  class: 'icon-dot-small ss-absolute-tr'
                },
                kvClass: 'ss-relative padding-r-10 ml-10-r'
              }
              : '',
              {icon: {class: 'icon-arrows-a-r color-999'}}
            ],
            footerClass: footerClass,
            class: itemliClass
          }],
          liClass: liClass
        })
      }
    })
  }
  return output
}

// 适用于list效果5  判断层级
const adapterList4Ss = (data, opts) => {
  const {imgClass, titleClass, bodyClass, titledotClass, footerdescClass, footerdotClass, footerimgClass, footerClass, itemliClass, liClass, type} = opts
  let output = []
  if (data && data.length > 0){

  }
  return output
}


//适用于tree 效果 
const adapterTreeSs = (data) => {
  let output = []
  for (let idfTitle in data){
    output.push({
      title: { title: idfTitle, class: 'ss-title'}, idf: idfTitle,
      // title: [
      //   {title: idfTitle, class: 'idfxxx'},
      //   {title: ' ', class: 'icon-arrows-b'}
      // ],
      titleClass: 'ss-title-flex-between',
      idf: idfTitle
    })
    data[idfTitle].map(item => {
      output.push({
        // title: { title: item.navTitle, class: 'parentxx'}, parent: idfTitle, class: 'li'
        title: { title: item.navTitle, class: 'parentxx'},
        parent: idfTitle, 
        class: 'li'
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
//       class: 'class'
//     },
//     idf: 'xxxx'
//   },
//   {
//     '@item': {
//       title:
//     }
//   }
// ]

export default {
  adapterListSs,
  adapterList2Ss,
  adapterList3Ss,
  adapterTreeSs
}