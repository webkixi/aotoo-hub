/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

const defaultConfig = {
  limit: 3, 
  count: 1,
  picker: 5,
  imgSize: 5*1024*1024,
  server: '',
  addone: {  // add new one
    title: '+',
    itemClass: 'uploads-addone'
  }
}

function isAddOne(param) {
  return param.itemClass && param.itemClass.indexOf('uploads-addone') > -1 ? true : false
}

// add new one fun
function addOne(data, props) {
  const lastOne = data[data.length-1]
  if (!lastOne || !isAddOne(lastOne)) {
    props.addone.tap = 'uploadAction?index=' + data.length
    data.push(props.addone)
  } else {
    lastOne.tap = 'uploadAction?index=' + (data.length-1)
  }
  return data
}

function generateData(dataSource) {
  let props = {}
  dataSource = Object.assign({}, defaultConfig, dataSource)
  const lsCls = dataSource.listClass
  dataSource.listClass = lsCls ? 'uploads-container ' + lsCls : 'uploads-container'

  Object.keys(dataSource).forEach(key=>{
    if (key!=='data') props[key] = dataSource[key]
  })

  if (lib.isObject(dataSource) && lib.isArray(dataSource.data)) {
    dataSource.data.filter((item, ii)=>{
      if (typeof item == 'string') item = { img: item }
      if (lib.isObject(item)) {
        if (item.img) {
          let img = item.img
          if (lib.isString(img)) img = { src: img }
          if (lib.isObject(img)) {
            img.catchtap = 'showAction?index='+ii
            img.itemClass = img.itemClass ? img.itemClass.indexOf('thumbnail') == -1 ? 'thumbnail ' + img.itemClass : img.itemClass : 'thumbnail'
          }
          item.img = img
        }
        if (!isAddOne(item)) {
          item.dot = [
            { title: 'x', tap: 'deletAction?index=' + ii, itemClass: 'uploads-delet'}
          ]
          let cls = item.itemClass || item.class
          item.itemClass = cls ? 'uploads-item ' + cls : 'uploads-item'
        } else {
          item.tap = 'uploadAction?index=' + ii
        }
      }
      return item
    })

    if (dataSource.data.length < props.limit) {
      dataSource.data = addOne.call(this, dataSource.data, props)
    }

    if (dataSource.data.length < props.count) {
      const diff = props.count - dataSource.data.length
      const appendOne = []
      for(let ii=0; ii<diff; ii++) {
        appendOne.push({
          title: '+',
          itemClass: 'uploads-addone',
          tap: 'uploadAction?index=' + (ii + dataSource.data.length)
        })
      }
      dataSource.data = dataSource.data.concat(appendOne)
    }
  }

  this.setData({ 
    props,
    $list: dataSource
  })
}

/**
 * data: [
 *  {title: 'tabName'},
 *  {title: 'tabName'},
 *  {title: 'tabName'},
 *  {title: 'tabName'},
 * ],
 * $$id: 'some id',
 * count: 3  // 限制上传的数量
 * listClass: '',
 * itemClass: '',
 * show: true
 */

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    dataSource: Object,
  },
  data: {
    popshow: {}
  },
  behaviors: [Core.listComponentBehavior(app, 'uploads')],
  lifetimes: {
    created: function(){
      this.popid = this.uniqId + '_pop'
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      this.$$is = 'uploads'
      let properties = this.properties
      let dataSource = properties.dataSource
      this.setData({
        popshow: {
          $$id: this.popid,
          title: '图片显示区域的header'
        }
      })
      generateData.call(this, dataSource)
    },
    ready: function() {
      const that = this
      this.existing = []
      const popid = this.popid
      const ds = this.data.$list
      this.mount(ds.$$id)
      this.activePage.hooks.on('onReady', function() {
        that.popView = Core.getElementsById(popid)
      })
    }
  },
  methods: {
    _getCountLimit: function () {
      const props = this.data.props
      this.existing = this.data.$list.data.filter((item, ii)=> {
        if (!isAddOne(item)){
          item.index = ii
          return item
        }
      })
      return {
        imgSize: props.imgSize,
        picker: props.picker,
        limit: props.limit,
        size: this.existing.length,
        existing: this.existing
      }
    },
    upload: function(param) {
      const props = this.data.props
      const upFiles = param ? param : this._getCountLimit().existing
      if (props.server) {
        // let postParam = {
        //   url: url, // 仅为示例，并非真实的接口地址
        //   type: 'img',
        //   name: 'file',
        //   filePath: '',
        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   data: data || {},
        //   // success(res) {},
        //   // error: function (e) {}
        // }

        return Core.upload({
          url: props.server,
          type: 'img',
          filePath: upFiles
        })
      }
    },
    chooseWxImage: function (type, param) {
      const that = this
      const props = this.data.props
      let   $list = this.data.$list
      let   mydata = this.data.$list.data
      const select = parseInt(param.index)
      let   countLimit = this._getCountLimit(param)

      wx.chooseImage({
        count: countLimit.picker,
        sizeType: ["original", "compressed"],
        sourceType: [type],
        success: function (res) {
          var addImgsPaths = res.tempFilePaths;
          var addImgs = res.tempFiles;
          var addLen = addImgs.length;

          let overNum = select + addLen - countLimit.limit
          let accessImgs = addImgsPaths
          let startIndex = select
          let offset = overNum < 0 ? addLen+1 : countLimit.limit-select
          if (overNum > 0) {
            addImgsPaths.splice(addLen - overNum)
            accessImgs = addImgsPaths
          }
          
          let overImgSize = false
          for (let ii=0; ii<accessImgs.length; ii++) {
            let item = accessImgs[ii]
            let size = addImgs[ii].size
            if (size > countLimit.imgSize) {
              overImgSize = true
              break;
            }
            mydata[startIndex] = {img: {src: item}}
            startIndex++
          }

          if (overImgSize) {
            let xx = countLimit.imgSize/1024/1024
            xx = 0|xx
            Core.alert(`图片大小超出`)
          } else {
            $list.data = mydata
            generateData.call(that, $list, props)
          }
        },
      })
    },

    uploadAction: function (e, param) {
      const that = this
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              that.chooseWxImage("album", param);
            } else if (res.tapIndex == 1) {
              that.chooseWxImage("camera", param);
            }
          }
        }
      })
    },

    showAction: function (e, param) {
      this._getCountLimit()
      const select = parseInt(param.index)
      let existing = lib.clone(this.existing)
      let selected
      existing = existing.map(item => {
        if (item.index === select) selected = item.index
        delete item.dot
        return item
      })
      if (param) {
        this.popView.reset().right(
          {
            '@list': {
              type: {
                is: 'swiper'
              },
              listClass: 'bs-e3e3e3-list',
              itemClass: 'ss-focus flex-row item padding-normal',
              data: existing
            }
          }
        )
        // const data = this.getData().data
        // let img = ''
        // if (data) {
        //   const index = parseInt(param.index)
        //   const item = data[index]
        //   if (item.img) {
        //     if (lib.isString(item.img)) img = item.img
        //     if (lib.isObject(item.img)) {
        //       img = item.img.src
        //     } 
        //   }
        // }
        // if (img) {
        //   img = 'http://localhost:8600'+img
        //   console.log(img)
        //   wx.previewImage({
        //     current: img, // 当前显示图片的http链接
        //     urls: [img] // 需要预览的图片http链接列表
        //   })
        // }
      }
    },

    deletAction: function (e, param) {
      const props = this.data.props
      if (param) {
        const index = parseInt(param.index)
        let $list = this.data.$list
        let mydata = this.data.$list.data
        if (props.count > 1) {
          mydata[index] = {
            title: '+',
            itemClass: 'uploads-addone',
            tap: 'uploadAction?index=' + index
          }
        } else {
          mydata.splice(index, 1)
        }
        $list.data = mydata
        generateData.call(this, $list)
      }
    }
  }
})
