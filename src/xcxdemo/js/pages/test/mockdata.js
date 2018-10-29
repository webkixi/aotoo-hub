module.exports = {
  data: [{
      title: [
        { button: { title: 'hahaha' } },
        { view: { title: '什么鬼', style: "background-color: red" } }
      ],
      class: 'xxx abc'

      // title: [
      //   {
      //     map: {
      //       style: "width: 100%; height: 300px;",
      //       coverview: {
      //         option: {},
      //         children: [
      //           'abcdddd'
      //         ]
      //       }
      //     }
      //   },
      // ],


      // scroll: [
      //   {title: 'aaaaaaaaaaaa'},
      //   {title: 'bbbbbbb'},
      //   {title: 'ccccccccccccc'},
      // ]


      // scroll: {
      //   name: 'xxx',
      //   option: {},
      //   children: [
      //     {title: [{
      //       swiper: {
      //         option: {
      //           "indicator-dots": true
      //         },
      //         children: [
      //           {view: {title: 'fjdksfjlsdjfk111111'}},
      //           {view: {title: 'fjdksfjlsdjfk222222'}},
      //           {view: {title: 'fjdksfjlsdjfk333333'}},
      //         ]
      //       }
      //     }]}
      //   ]
      // },


      // li: [
      //   '1111',
      //   '222', 
      //   {
      //     title: '333',
      //     img: {
      //       src: 'http://www.agzgz.com/images/logo118-1.png',
      //       style: 'width: 60rpx; height: 60rpx'
      //     },
      //     li: [
      //       '444',
      //       '555', {
      //         title: '666',
      //         li: [{
      //           title: '777',
      //           li: [{
      //             title: '888',
      //             img: {
      //               src: 'http://www.agzgz.com/images/logo118-1.png',
      //               style: 'width: 120rpx; height: 120rpx',
      //               itemClass: 'myimg'
      //             },
      //             itemClass: 'xxx abc',
      //             li: [
      //               {
      //                 xid: 'abc',
      //                 title: '99999',
      //                 itemClass: 'yyy abc'
      //               }
      //             ]
      //           }, ]
      //         }]
      //       }
      //     ]
      //   }
      // ],


      // body: [{
      //   title: {
      //     button: {
      //       title: '我是body'
      //     }
      //   },
      //   li: ['body-li-1', 'body-li-2']
      // }],
      // footer: [{
      //     title: 'foot部分',
      //     itemClass: 'foot-itemaaa'
      //   },
      //   'footer部分2'
      // ],
      // itemClass: 'abcxxx'
    },
    {
      title: '春天在哪里',
      // bindtap: 'customMethod1',
      bindtap: 'handle__tap'
      
    }
    // {
    //   title: '图片在哪里？？',
    //   img: 'http://www.agzgz.com/images/logo118-1.png',
    // }
  ]
  , listClass: 'xxx'
  , itemClass: 'yyy'
}