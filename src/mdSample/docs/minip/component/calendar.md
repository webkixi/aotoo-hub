# 日历组件

## wxml

```html
<ui-calendar dataSource="{{calendarConfig}}" />
```

## js  

基本用法  

```js
const Pager = require('../../components/aotoo/core/index')
Pager({
  data: {
    calendarConfig: {
      header: null,  
      start: null,  // 开始日期
      total: 0,  // 设置日历天数
      mode: 2, // 设置日历显示模式
      type: 'range', // 日期选择模式
      rangeCount: 28, // 区选限制
      rangeMode: 2, // 区选显示模式
      rangeTip: [], // 区选提示  
      value: [], // 默认值
      alignMonth: false, // 平均每月日期数为42，swiper时对齐月容器高度
      festival: false,  // 是否显示节假日
      lunar: false, // 是否显示农历
      date: null // 自定义默认日期
      toolbox: {
        header: true,  // 是否启用头部
        monthHeader: true,  // 是否启用月头部
        rangeEdge: null, //自定义边界日期，一般用于range选择
        discontinue: false // 月份排序完全按照data数据中的日期排列，没有的月份会被忽略
      },
    }
  }
})
```

# 日历组件参数说明  

mode
------------------

{Number}  
设置日历的展示模式  

* mode = 1  纵向日历，使用scroll-view的形式展示日历
* mode = 2  横向日历，使用swiper横向展示日历
* mode = 3  纵向日历，使用swiper纵向展示日历  
* mode = 4  无限日历，swiper横向滚动，加载上一月，下一月的日历  

```js
calendarConfig: {
  mode: 1
}
```

\$\$id
--------------

{String}  
配置实例的Id，可以通过`Pager.getElementsByID`获取该组件的实例

```js
calendarConfig: {
  $$id: 'uniq-id'
}
```

type  
--------------  

{String}  
日历点击类型，响应用户交互效果  
single: 单选日历
range: 选择区间  
multiple: 多选日历

```js
calendarConfig: {
  type: 'multiple'
}
```

total
--------------  

{Number}
设置日历从今天开始起需要跨多少天，如180天，或者365天，

```js
calendarConfig: {
  type: 'single',
  total: 180  
}
```

start  
--------------  

{String}
设置起始日期，如：'2020-06-05'  

```js
calendarConfig: {
  $$id: 'uniq-id',
  mode: 1,
  type: 'single',
  total: 180,
  start: '2020-05-01'
}
```

date  
--------------  

{Object|Function}  
定制日期内容、附加内容  

**`追加内容`**  
下例配置将批量为所有180天的日期追加内容，即在显示日期的单元格下追加内容。dot属性用来设置追加内容，dot属性为一个数组类型的数据，支持在当前日期下追加多条数据(支持追加图文信息、内嵌组件等)，如下例中追加了3条数据

```js
calendarConfig: {
  total: 180,
  mode: 1,
  date: {
    dot: [
      '追加内容',   // 支持追加纯文本
      {title: 'abc', itemStyle: 'write inner style '},  // 追加定制化内容
      {img: {src: '/path/to/img', itemClass: 'img-class', mode: '...'}}  // 追加图片
    ]
  }
}  
```

**指定日期的内容**  

```js
calendarConfig: {
  type: 'single',
  total: 90,
  date: function (param) {
    if (param.date === '2020-12-24') {
      param.dot = ['圣诞节']
      return param
    }
  },
}  
```

disable  
--------------  

{Boolean}  
设置全局无效，所有日期均不能交互

`设置全局无效`  
所有日期均无效  

```js
calendarConfig: {
  type: 'single',
  total: 90,
  disable: true
}  
```

`全局无效下的特殊例外`  
全局无效的情况下，指定日期有效  

```js
calendarConfig: {
  $$id: 'calendar',
  mode: 1,
  type: 'single',
  total: 90,
  disable: true,
  date: function (param) {
    if (param.date === '2021-01-13') {
      param.disable = false // 该日期为有效日期
      return param
    }
  }
}  
```

`全局有效，特定无效`  
全局有效的情况下，指定日期无效  

```js
calendarConfig: {
  $$id: 'calendar',
  mode: 1,
  type: 'single',
  total: 90,
  disable: false,
  date: function (param) {
    if (param.date === '2021-01-13') {
      param.disable = true // 该日期为无效日期
      return param
    }
  }
}  
```

rangeCount  
--------------  

{Number}  
type为`range`时，rangeCount为有效区间大小  

rangeTip  
--------------  

{Array}  
rangeTip用于起始日期的追加描述

rangeMode
--------------  

{Number}  
当正在做日期区间选择时，是否允许显示rangeCount之外的日期 1=显示， 2=不显示  

`区间选择配置，区间限制10天，有效区间外的日期隐藏`  

```js
calendarConfig: {
  mode: 1,
  type: 'range',  // 区间选择模式
  tap: 'onTap', // 日期点击事件
  total: 180,
  rangeCount: 10, // 区间日期只允许10天
  rangeMode: 2,   // 区间选择确定后，隐藏确定日期外的日期
  rangeTip: ['入店', '离店'],  // 区间第一天和区间最后一天追加的显示内容
  value: [startDate, endDate],  // 默认区间日期
  methods: {
    onTap(e, param, inst) { // inst为单个日期的组件实例
      // if (param.range === 'start') { // 区间首日点击响应
      //   inst.update({dot: [{title: '入住'}]})
      // }
      // if (param.range === 'end') {}  // 区间结束日点击响应
      // console.log(param);
    }
  },
}  
```

tap && navTap
--------------  

{String}  
tap 响应日期元素的tap事件
navTap 响应月标签点击事件  

tap方法适用于所有日历模式

```js
let calendarConfig = {
  mode: 2,
  type: 'single',
  total: 180,
  tap: 'onTap',
  methods: {
    onTap(e, param, inst) {
      console.log(param);
    }
  },
}
```

navTap  
当存在月份栏时，该事件用于响应月份点击

```js
let calendarConfig = {
  mode: 2,
  type: 'single',
  total: 180,
  navTap: 'onTap',
  methods: {
    onTap(e, param, inst) {
      console.log(param);
    }
  },
}
```

value
--------------  

{Array}
默认值，根据默认值高亮显示日期，如\`type='single'\`应设置['2020-06-05']  

`单选，设置默认值`  

```js
let calenderConfig = {
  mode: 2, // 1，纵向日历 2，横向日历
  type: 'single', // single：单选  range: 区间选择  multiple：多选
  total: 180, // 所有日期选择天数
  data: ["2020-12-15"]
},
```

`多选，设置默认值`  

```js
let calenderConfig = {
  mode: 2, // 1，纵向日历 2，横向日历
  type: 'multiple',
  total: 180,
  data: [{"date":"2020-12-03"}, {"date":"2021-02-04"}]
},
```

`区间选择，设置默认值`  

```js
let calenderConfig = {
  mode: 1,
  type: 'range',
  total: 180,
  rangeCount: 10,
  rangeMode: 2,
  value: [{"date":"2020-12-03"}, {"date":"2020-12-08"}]
},
```

data  
--------------  

{Array}  
设置data数据，则total配置自动失效，日历组件将依照data数据的首日期，结束日期自动计算日历天数。

`由data数据自动配置日历`  

```js
let calenderConfig = {
  $$id: 'calendar',
  mode: 1, // 1，纵向日历模式，由scroll-view构建
  type: 'single',
  tap: 'onTap', // 回调事件
  total: 180, // 本例设置了data数据，则此项设置无效
  value: ['2021-03-20'], // 默认日期，高亮
  data: [
    '2020-11-10',
    '2020-12-10'
    '2021-03-10',
    {date: '2021-10-01', content: {dot: ['国庆节']}},
    {date: '2021-11-11', content: {dot: [
      {title: '双11', itemStyle: 'font-size: 11px; color:red;'},
    ]}},
    {date: '2021-03-08'}
  ],
  methods: { // 响应方法
    onTap(e, param, inst) {
      console.log(param);
    }
  }
},
```

festival  
--------------  

{Boolean|Array}
设置日历阳历假期显示，支持显示指定假期  

```js
/**
 * 所有阳历假日
 * ['元旦', '情人节', '劳动节', '青年节', '儿童节', '教师节', '国庆节', '圣诞节', '妇女节', '植树节', '愚人节', '护士节', '建党节', '建军节', '平安夜']
*/

let calenderConfig = {
  $$id: 'calendar',
  mode: 1,
  type: 'single',
  data: [{"date":"2020-09-03"}, {"date":"2020-12-28"}],
  festival: ['教师节', '圣诞节']
},
```

lunar  
--------------  

{Boolean}
是否显示农历，如果显示农历，则同时设置节假日开

```js
/**
 * 所有农历假日
 * ['除夕', '春节', '元宵节', '端午节', '中秋节', '重阳节']
*/
let calenderConfig = {
  $$id: 'calendar',
  mode: 1,
  type: 'single',
  data: [{"date":"2020-09-03"}, {"date":"2020-12-28"}],
  festival: ['教师节', '圣诞节']
},
```

setFestival
----------------

{Object}
设置阳历节假日，替换|更新组件自带的阳历节假日

setLunarFestival
----------------

{Object}
设置农历节假日，替换|更新组件自带的农历节假日

alignMonth
--------------  

{Boolean}
对齐月份，swiper滚动时月份高度自适应,alignMonth为true时，使高度固定  

toolbox  
--------------  

{Object}  
日历的扩展配置，允许设置一些高级功能，如日历是否允许跨月，特殊的range算法等等  

toolbox.header  
--------------  

{Boolean}  
是否显示日历的头部，一般用于横向日历时为true

toolbox.monthHeader  
--------------  

{Boolean}  
是否显示日历的月头部，一般在纵向日历时为true

toolbox.rangeEdge  
--------------  

{Function}  
默认值null，type='range'时，自定义range选择算法  

toolbox.discontinue
--------------  

{Boolean}  
默认false，当日历有data数组构建时，缺少数据的月份会被忽略  

`允许跨域日历配置`  

```js
let calenderConfig = {
  $$id: 'calendar',
  mode: 2, // 1，纵向日历 2，横向日历
  type: 'single', // single：单选  range: 区间选择  multiple：多选
  tap: 'onTap', // 回调事件
  total: 180, // 所有日期选择天数
  data: [{"date":"2020-04-03"}, {"date":"2020-06-03"}],
  toolbox: {
    discontinue: true
  }
},
```
