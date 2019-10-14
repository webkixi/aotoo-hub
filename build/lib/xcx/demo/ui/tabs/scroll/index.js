//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabData = {
  scroll: true,
  multipy: true,
  data: [
    {
      title: '选项一',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍A',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-0'
      },
    },
    {
      title: '选项二',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍B',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-1'
      },
    },
    {
      title: '选项三',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍C',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-2'
      },
    },
    {
      title: '选项四',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍D',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-3'
      },
    },
    {
      title: '选项五',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍E',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-4'
      },
    },
    {
      title: '选项六',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍F',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-5'
      },
    },
    {
      title: '选项七',
      content: {
        '@item': {
          li: [
            {
              title: [
                {
                  title: 'ITEM元件介绍G',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '元件，组件构成的最小粒度元件。ITEM元件可大可小，用途很广泛，我们可以用item产出内容页的结构，也可以使用ITEM产出一行字符串数据'
                }
              ],
              itemClass: 'mb-40-r pt-20-r',
            },
            {
              title: [
                {
                  title: '构成ITEM的三个部分',
                  itemClass: 'size16 fw-bold mb-10-r'
                },
                {
                  title: '我们将ITEM分成数据部分，组件部分, 实例部分 数据部分，承载结构显示的主题内容，列表和树结构ITEM的容器。ITEM支持丰富的数据结构，如文本、图片、链接、响应等，同时我们在ITEM中可以引入树结构数据，列表结构数据及嵌套ITEM数据等，以及自定组件的数据结构 组件部分，依照小程序开发规则，熟悉vue的同学应该都清除，需要在模板中引入组件，并赋值给该组件 实例部分，原生小程序语法可以通过特定的方法取得设置id的组件实例，对于长期从事前端的同学来说有点麻烦，因此我们按照js熟悉的方式，引入了getElementsById的方法来获取ITEM实例'
                }
              ],
              itemClass: 'mb-40-r',
            },
          ]
        },
        id: 'tabs-6'
      },
    }
  ],
  listClass: 'tabs-default-scroll hei-p100 bg-fff',
  // itemClass: 'card-bg'
}


Pager({
  data: {
    motto: tabData,
    listClass: 'hei-p100 bg-fff'
  },
  onLoad: function(e){
  }
  // onLoad(){
  //   setTimeout(() => {
  //     this.setData({
  //       motto: tabData
  //     })
  //   }, 3000);
  // }
})
