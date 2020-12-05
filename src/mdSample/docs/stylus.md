# 欢迎使用Aootoo的模版样式

@(SAUI)[配置样式表]

**配置化样式表**是只为了更规范化的更方便的去使用。分为以下三个部分
 
- **配置目录** ：包含颜色，风格，大小...
- **方法目录** ：公用样式方法，组件样式方法，业务样式方法
- **业务目录** ：对应着业务，结合配置，及方法来使用

-------------------


> 注意：用Stylus CSS 的预处理器



[TOC]

## 配置
> 配置目录主要分为网站整体色值部分，及网站字体间距等风格控制。在这些的基础上来配置组件的风格等
### 色值配置示例
```
//backgroundColor
$color-bg               = #F0F2F5
$color-bg-special       = #F5F6FA                           //特殊背景
$color-bg-primary       = #fff

//borderColor
$color-line             = #E5E6ED                           //下划线
$color-line-secondary   = $color-line                         //边框线
$color-line-input       = #CFD2D6                           //input边线

//textColor
$color-text             = #777D8D                           //默认色
$color-text-title       = #272E40                           //标题色
$color-text-info        = #98A0B4                           //说明信息
$color-text-disabled    = $color-line-input                   //禁止色
$color-text-placeholder = $color-line-input                  //input placeholder

//网站主色调
$color-primary          = #0076FF                           //品牌色

//辅助色，
$color-aux-primary      = #4B9AFC                           // 用于辅助及搜索按钮 提示性文字链/按钮
$color-aux-success      = #68BF7B                           // 用于保存提交成功性提示
$color-aux-warning      = #FF7400                           // 用于副按钮，特殊按钮 提示性ICON/文字
$color-aux-fail         = #FC3230                           // 用于网站价格显示

//鼠标经常效果
$color-hover            = $color-primary

```

## 方法
一 方法不调用不会产出结构 
二 因为结构的统一输出，更方便的去把组件或常用，公用的封出来，再通过配置的不同，输出不同的样式
> 方法参数可传，可不传
###  方法示例
```

//方法一，适用于简单的方法
s-display-flex($flex-flow = row nowrap, $justify-content = false, $align-items = false, $align-content = false)
  display: flex
  flex-flow: $flex-flow
  justify-content: $justify-content if($justify-content)
  align-items: $align-items if ( $align-items)
  align-content: $align-content if ( $align-content)
// 执行
	 ss-display-flex()
	 
//方法二,适用于复杂的方法
flexConfig = {
	$flex-flow row nowrap, 
	$justify-content: false, 
	$align-items: false, 
	$align-content: false
}
ss-display-flex($class='.flex-row', $config = false)
	cfg = merge({}, flexConfig, $config)
	{$class}
		display: flex
		flex-flow: cfg.$flex-flow
		justify-content: cfg.$justify-content if(cfg.$justify-content)
		align-items: cfg.$align-items if (  cfg.$align-items)
		align-content: cfg.$align-content if (cfg.$align-content)
//执行
	ss-dipslay-flex()
```


## 如何使用
```
@import './_commonx/config/theme/orange'    //系统主题
@import './_commonx/config/codetheme/black'  //md代码块模版
@import './_commonx/cssFunc/pages/routerconfig/routerStyle2'        //左边菜单列表模板
@import './_commondoc'                      //各系统公用部分
```

## 目录
![Alt text](./images/ui/css.png)



## 反馈与建议
- 邮箱：<sauiss@foxmail.com>

---------
感谢阅读这份帮助文档。如对你有帮助，可给于作者点赞


![Alt text](./images/ui/ss.png)
