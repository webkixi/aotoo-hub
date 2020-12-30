// const lib = ao2.lib
import _inject from 'aotoo-inject'
let inject = _inject()
import Swiper from "components/swiper";
import Table from "components/list/table";
import { swiperDoc } from "../document";

const swiperDc = Table({
  tableClass: 'wid-p100',
  ...swiperDoc
})


const swiper1 = Swiper({
  data: ['https://dfs.8atour.com/group1/M00/02/07/CgoKqlzOgy2ABCyZAATSqNBpXnY79_1920x1080.jpeg', 'https://dfs.8atour.com/group1/M00/02/05/CgoKq1zOgz-AbQJJAARwrzaqSOI03_1920x1080.jpeg', 'https://dfs.8atour.com/group1/M00/02/05/CgoKq1zOg5aAds9HAATue7v7CLM97_1920x1080.jpeg'],
  swiperClass: 'demo-swiper mb-defalut',
  type: 'img',
  options: {
    loop: true, 
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
    }
  }
})

const swiper2 = Swiper({
  $$id: 'swiper2',
  data: [
    {
      title: [
        {title: '我是中标题， 你是谁啊', itemClass: 'demo-title'},
        {title: '我是你大佬， SAUI', itemClass: 'demo-title-lg'},
        {title: '我是你小弟， 哥哥们好', itemClass: 'demo-title-sm'}
      ],
      dot: [{
        title: '马上启航',
        itemClass: 'ss-button btn-default plain ss-animate fadeInUpBig'
      }],
      titleClass: 'ss-animate bounceIn ss-center',
      itemClass: 'demo-swiper-bg full-center'
    },
    {
      title: [
        {title: '我是标题', itemClass: 'demo-title ss-animate fadeInRight'},
        {title: '我是标题的内容，请多多指教！！！！！！！！！！！', itemClass: 'color-info'},
        {title: '', itemClass: 'ss-hr mt-default mb-default'},
        {title: '我是标题', itemClass: 'demo-title ss-animate fadeInRight'},
        {title: '我是标题的内容，请多多指教！！！！！！！！！！！', itemClass: 'color-info'},
        {title: '', itemClass: 'ss-hr mt-default mb-default'},
        {title: '我是标题', itemClass: 'demo-title ss-animate fadeInRight'},
        {title: '我是标题的内容，请多多指教！！！！！！！！！！！', itemClass: 'color-info'},
        {title: '', itemClass: 'ss-hr mt-default mb-default'},
        {title: '准备点击', itemClass: 'ss-button btn-default plain ss-animate fadeInUpBig mt-default'}
      ],
      dot: [{
        img: '/images/ui/saui.jpeg',
        itemClass: 'ss-animate fadeInRight item-right'
      }],
      itemClass: 'demo-swiper-bg dsb-2'
    },
  ],
  swiperClass: 'demo-swiper item-swiper-2',
  options: {
    direction: 'vertical', // 垂直切换选项
    mousewheel: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }
})

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">轮播图</View>
      <View className='demo-grid'>
        <swiper1.UI />
        <View className="pages-title-sm">垂直切换</View>
        <swiper2.UI />
      </View>
      <View className="pages-title-sm">Attributes</View>
      {swiperDc.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: []
    }
  })
}