//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const articleData = {
  title: [
    {
      title: 'Article',
      itemClass: 'title-lg-active'
    },
    {
      title: '文章 ',
      itemClass: 'title-primary-grey'
    }
  ],
  dot: [
    {
      '@item': {
        title: {
          title: '大标题',
          itemClass: 'article-title-b mb-40-r'
        },
        body: [
          {
            title: [
              {
                title: '章标题',
                itemClass: 'article-title mb-10-r'
              },
              {
                title: '1.1节标题',
                itemClass: 'article-title mb-20-r'
              },
              {
                title: '1 小程序的文章要文字与图片分开编辑，无法正常使用编辑器 2 小程序图片一定要指定高度。',
                img: {
                  src: 'http://agzgz.com/myimgs/logo.png'
                },
                itemClass: 'article-content'
              }
            ]
          }
        ],
        itemClass: 'mt-40-r'
      }
    }
  ],
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

Pager({
  data: {
    motto: Pager.item(articleData)
  }
})
