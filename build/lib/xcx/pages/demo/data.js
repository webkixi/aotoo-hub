//list
const listDatax = [
  {
    title: '你在搞笑是吧 title1', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: 'Ant Design,is refined by Ant UED Team',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    isVoice: false,       //是否静音
    imgdot: false,       //是否静音
  },
  {
    title: '你在搞笑是吧 title2', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: '高效能磁悬浮声波马达 高密度无锈无金属植毛刷头 个性定制多种刷牙模式 刷牙姿势识别与报告生成',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    isVoice: true,       //是否静音
    imgdot: true,       //是否静音
  },
  {
    title: '你在搞笑是吧 title3', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: '',
    content: '',
    isVoice: false,       //是否静音
    imgdot: false,       //是否静音
  },
] 

const listData2x = [
  {
    title: '朋友圈', parents: '1',
    img: [
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    ]
  },
  {
    title: '扫一扫', parents: "2",
    img: [
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    ],
  },
  {
    title: '摇一摇', parents: "2",
    img: [
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    ],
    footerDesc: '王者荣耀'
  },
]

const listData4x = [
  {
    title: '你在搞笑是吧 title1', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: 'Ant Design,is refined by Ant UED Team',
    isArrows: true,       //效果6 是否需要箭头
  },
  {
    title: '你在搞笑是吧 title2', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: '高效能磁悬浮声波马达 高密度无锈无金属植毛刷头 个性定制多种刷牙模式 刷牙姿势识别与报告生成',
    isArrows: true,       //效果6 是否需要箭头
  },
  {
    title: '你在搞笑是吧 title3', 
    img: 'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
    desc: '',
    isArrows: true,       //效果6 是否需要箭头
  },
] 

const listData5x = [
  {
    list: [
      {
        title: '朋友圈', parents: '1',
        img: [
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
        ]
      }
    ]
  },
  {
    list: [
      {
        title: '扫一扫', parents: "2",
        img: [
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
        ],
      },
      {
        title: '摇一摇', parents: "2",
        img: [
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
          'https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg',
        ],
        footerDesc: '王者荣耀'
      },
    ]
  }
]

const listData1xx = {
  "F": [
      {
          "isSearchPoi": 1,
          "releaseTimes": 1,
          "sortIndex": 100,
          "customLevel": 1,
          "idLinks": "6429 20887 6435",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,佛山市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6435,
          "poiId": 440600,
          "isSelectedPoi": 1,
          "navTitle": "佛山市"
      }
  ],
  "G": [
      {
          "isSearchPoi": 1,
          "releaseTimes": 60,
          "sortIndex": 120,
          "customLevel": 1,
          "idLinks": "6429 20887 6430",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,广州市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6430,
          "poiId": 440100,
          "isSelectedPoi": 1,
          "navTitle": "广州市"
      }
  ],
  "H": [
      {
          "isSearchPoi": 1,
          "releaseTimes": 4,
          "sortIndex": 70,
          "customLevel": 1,
          "idLinks": "6429 20887 6440",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,惠州市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6440,
          "poiId": 441300,
          "isSelectedPoi": 1,
          "navTitle": "惠州市"
      },
      {
          "isSearchPoi": 1,
          "releaseTimes": 0,
          "sortIndex": 55,
          "customLevel": 1,
          "idLinks": "6429 20887 6443",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,河源市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6443,
          "poiId": 441600,
          "isSelectedPoi": 1,
          "navTitle": "河源市"
      }
  ],
  "J": [
      {
          "isSearchPoi": 1,
          "releaseTimes": 0,
          "sortIndex": 80,
          "customLevel": 1,
          "idLinks": "6429 20887 6436",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,江门市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6436,
          "poiId": 440700,
          "isSelectedPoi": 1,
          "navTitle": "江门市"
      },
      {
          "isSearchPoi": 1,
          "releaseTimes": 0,
          "sortIndex": 25,
          "customLevel": 1,
          "idLinks": "6429 20887 6450",
          "operatType": 5,
          "parentId": 20887,
          "isSinglePoi": 1,
          "navTitleLinks": "广东省,揭阳市,",
          "isMultiPoi": 2,
          "poiType": 1,
          "id": 6450,
          "poiId": 445200,
          "isSelectedPoi": 1,
          "navTitle": "揭阳市"
      }
  ]
}

const listData2xx = [
  {
      "departCityName": "香港",
      "productProperties": {
          "productFeatures": "5",
          "productFeaturesName": "慢游 ",
          "themeFeaturesName": "温泉 ",
          "playLineName": "珠海+澳门+香港 ",
          "themeFeatures": "23",
          "serviceGuarantee": "1 2 3 4",
          "serviceGuaranteeName": "天天出发 保证成团 无购物 无自费 ",
          "playLine": "1"
      },
      "propertyIdentity": "新界+离岛 3天2晚 跟团游 + 88004",
      "productSubTitle": "+ 88004",
      "departCityCode": "810100",
      "productTitle": "新界+离岛 3天2晚 跟团游",
      "productImages": "https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg",
      "productCategoryId": 140,
      "productCode": "00019705",
      "topStatus": 1,
      "days": "3天2晚",
      "id": 18580,
      "shopId": 45
  },
  {
      "departCityName": "香港",
      "productProperties": {
          "productFeatures": "5",
          "productFeaturesName": "慢游 ",
          "themeFeaturesName": "温泉 ",
          "playLineName": "珠海+澳门+香港 ",
          "themeFeatures": "23",
          "serviceGuarantee": "1 2 3 4",
          "serviceGuaranteeName": "天天出发 保证成团 无购物 无自费 ",
          "playLine": "1"
      },
      "propertyIdentity": "澳门半岛 5天4晚 跟团游 + 88006",
      "productSubTitle": "+ 88006",
      "departCityCode": "810100",
      "productTitle": "澳门半岛 5天4晚 跟团游",
      "productImages": "https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg",
      "productCategoryId": 140,
      "productCode": "00019709",
      "topStatus": 1,
      "days": "5天4晚",
      "id": 18584,
      "shopId": 45
  },
  {
      "departCityName": "珠海",
      "productProperties": {
          "productFeatures": "1",
          "productFeaturesName": "轻奢 ",
          "themeFeaturesName": "亲子 ",
          "playLineName": "澳门+香港 ",
          "themeFeatures": "20",
          "serviceGuarantee": "1",
          "serviceGuaranteeName": "天天出发 ",
          "playLine": "2"
      },
      "propertyIdentity": "香港 2天1晚 跟团游 测试港珠澳专线 + 88001",
      "productSubTitle": "测试港珠澳专线 + 88001",
      "departCityCode": "440400",
      "productTitle": "香港 2天1晚 跟团游",
      "productImages": "https://img.alicdn.com/imgextra/i1/2549841410/TB2ay__kaagSKJjy0FhXXcrbFXa_!!2549841410.jpg_430x430q90.jpg",
      "productCategoryId": 140,
      "productCode": "00019699",
      "topStatus": 1,
      "days": "2天1晚",
      "id": 18574,
      "shopId": 45
  },
]

export default {
  listDatax,
  listData2x,
  listData1xx,
  listData4x,
  listData5x,
  listData2xx,
}
