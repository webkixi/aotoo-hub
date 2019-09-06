//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib



Pager({
  config: {
    element: 'radarCanvas',
    numCount: 8,
    numSlot: 7,
    mW: 300,
    mH: 300,
    mCenter: 300 / 2, //中心点    mw: 300
    mAngle: Math.PI * 2 / 8, //角度   numCount: 6
    mRadius: (300 / 2) - 40, //半径(减去的值用于给绘制的文本留空间)  mCenter: 300 / 2
    data: {
      stepText: 5,
      chanelArray1: [["战绩",88],["生存",30],["团战",66],["发育",90],["输出",95],["推进",88],["输出2",95],["推进3",96]],
      chanelArray2: [["战绩", 24], ["生存", 60], ["团战", 88], ["发育", 49], ["输出", 46], ["推进", 92],["输出2",99],["推进3",98]],
      chanelColor1: 'rgba(255, 0, 0, 0.5)',
      chanelColor2: 'rgba(255, 200, 0, 0.5)',
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    //雷达图
    this.drawRadar(this.config)

  },
  // 雷达图
  drawRadar:function(config){
    var canvasContext = wx.createCanvasContext(config.element);

    var sourceData1 = config.data.chanelArray1
    var sourceData2 = config.data.chanelArray2

    //调用
    // this.drawEdge(canvasContext, config) //画六边形
    this.drawArcEdge(canvasContext, config) //画圆
    this.drawLinePoint(canvasContext, config)
    //设置数据
    this.drawRegion(canvasContext,config, sourceData1, config.data.chanelColor1) //第一个人的
    this.drawRegion(canvasContext,config, sourceData2, config.data.chanelColor2) //第二个人
    //设置文本数据
    this.drawTextCans(canvasContext, config, sourceData1)
    //设置节点
    this.drawCircle(canvasContext, config, sourceData1, 'red')
    this.drawCircle(canvasContext, config, sourceData2, 'yellow')
    //开始绘制
    canvasContext.draw()
  },
  // 绘制6条边
  drawEdge: function(canvasContext, config){
    canvasContext.setStrokeStyle("block")
    canvasContext.setLineWidth(1)  //设置线宽
    for (var i = 0; i < config.numSlot; i++) {
      //计算半径
      canvasContext.beginPath()
      var rdius = config.mRadius / config.numSlot * (i + 1)
      //画6条线段
      for (var j = 0; j < config.numCount; j++) {
        //坐标
        var x = config.mCenter + rdius * Math.cos(config.mAngle * j);
        var y = config.mCenter + rdius * Math.sin(config.mAngle * j);
        canvasContext.lineTo(x, y);
      }
      canvasContext.closePath()
      canvasContext.stroke()
    } 
  },
  // 第一步：绘制6个圆，你可以通过修改numSlot的数的大小，来确定绘制几个圆
  drawArcEdge: function(canvasContext, config){
    canvasContext.setStrokeStyle("#000")  //设置线的颜色
    canvasContext.setLineWidth(1)  //设置线宽
    for (var i = 0; i < config.numSlot; i++) {  //需要几个圆就重复几次
      // //计算半径
      canvasContext.beginPath()
      var rdius = config.mRadius / config.numSlot * (i + 1)  //计算每个圆的半径
      canvasContext.arc(config.mCenter, config.mCenter, rdius, 0, 2 * Math.PI) //开始画圆
      // canvasContext.closePath()
      canvasContext.stroke()
    } 
  },
  // 绘制连接点
  drawLinePoint:function(canvasContext, config){
    canvasContext.beginPath();
    for (var k = 0; k < config.numCount; k++) {
      var x = config.mCenter + config.mRadius * Math.cos(config.mAngle * k);
      var y = config.mCenter + config.mRadius * Math.sin(config.mAngle * k);

      canvasContext.moveTo(config.mCenter, config.mCenter);
      canvasContext.lineTo(x, y);
    }
    canvasContext.stroke();
  },
  //绘制数据区域(数据和填充颜色)
  drawRegion: function (canvasContext, config, mData, color){
    canvasContext.beginPath();
    for (var m = 0; m < config.numCount; m++){
      var x = config.mCenter + config.mRadius * Math.cos(config.mAngle * m) * mData[m][1] / 100;
      var y = config.mCenter + config.mRadius * Math.sin(config.mAngle * m) * mData[m][1] / 100;
      canvasContext.lineTo(x, y);
    }
    canvasContext.closePath();
    canvasContext.setFillStyle(color)
    canvasContext.fill();
  },
  //绘制文字
  drawTextCans: function (canvasContext, config, mData){
    canvasContext.setFillStyle("#000")
    canvasContext.font = 'bold 17px cursive'  //设置字体
    var fontSize = config.mCenter / 12 * 1;
    // ctx.font = fontSize + 'px Microsoft Yahei';
    canvasContext.setFontSize(fontSize);
    canvasContext.setFillStyle('#000');
    for (var i = 0; i < config.numCount; i++) {
      var x = config.mCenter + config.mRadius * Math.cos(config.mAngle * i);
      var y = config.mCenter + config.mRadius * Math.sin(config.mAngle * i);
      //通过不同的位置，调整文本的显示位置
      if (config.mAngle * i >= 0 && config.mAngle * i < Math.PI / 2) {
        canvasContext.fillText(mData[i][0], x + 15, y + fontSize - 5);
      } else if (config.mAngle * i == Math.PI / 2) {
        canvasContext.fillText(mData[i][0], x - 10, y + fontSize + 10);
      } else if (config.mAngle * i > Math.PI / 2 && config.mAngle * i <= Math.PI) {
        canvasContext.fillText(mData[i][0], x - 40, y + fontSize - 10);
      } else if (config.mAngle * i > Math.PI && config.mAngle * i <= Math.PI * 3 / 2) {
        canvasContext.fillText(mData[i][0], x - 15, y - 10);
      } else {
        canvasContext.fillText(mData[i][0], x, y - 8);
      }
    }
    // for (var n = 0; n < config.numCount; n++) {
    //   var x = config.mCenter + config.mRadius * Math.cos(config.mAngle * n);
    //   var y = config.mCenter + config.mRadius * Math.sin(config.mAngle * n);
    //   // canvasContext.fillText(mData[n][0], x, y);
    //   //通过不同的位置，调整文本的显示位置
    //   if (config.mAngle * n >= 0 && config.mAngle * n <= Math.PI / 2) {
    //     console.log( mData[n][0])
    //     canvasContext.fillText(mData[n][0], x+5, y+5);
    //   }
    //   else if (config.mAngle * n > Math.PI / 2 && config.mAngle * n <= Math.PI) {
    //     console.log( mData[n][0])
    //     canvasContext.fillText(mData[n][0], x - canvasContext.measureText(mData[n][0]).width-7, y+5);
    //   }
    //   else if (config.mAngle * n > Math.PI && config.mAngle * n <= Math.PI * 3 / 2) {
    //     console.log( mData[n][0])
    //     canvasContext.fillText(mData[n][0], x - canvasContext.measureText(mData[n][0]).width-5, y);
    //   }
    //   else {
    //     console.log( mData[n][0])
    //     canvasContext.fillText(mData[n][0], x+7, y+2);
    //   }

    // }
  },
  //画点
  drawCircle: function(canvasContext, config, mData, color){
    var r = 1; //设置节点小圆点的半径
    for(var i = 0; i < config.numCount; i ++){
      var x = config.mCenter + config.mRadius * Math.cos(config.mAngle * i) * mData[i][1] / 100;
      var y = config.mCenter + config.mRadius * Math.sin(config.mAngle * i) * mData[i][1] / 100;

      canvasContext.beginPath();
      canvasContext.arc(x, y, r, 0, Math.PI * 2);
      canvasContext.fillStyle = color;
      canvasContext.fill();
    }
  }
})

