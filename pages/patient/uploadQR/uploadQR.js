// pages/patient/uploadPic/uploadPic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2016-09-01",
    curDate: "",
    tempImg: [],
    firstUpLoad: true
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  showImg(e){
    const imgUrl = e.currentTarget.dataset.url;
    const that = this;
    wx.previewImage({
      urls: that.data.tempImg,
      current: imgUrl,
    })
  },
  getImage: function () {
    let that = this;
    const len = 10 - that.data.tempImg.length;
    if(len > 0  || that.data.firstUpLoad){
      wx.chooseImage({
        count: len, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            tempImg: [...that.data.tempImg, ...res.tempFilePaths]
          })
          if(that.data.firstUpLoad){
            that.data.firstUpLoad = false;
          }
        }
      })
    }else if(len == 0){
      wx.showToast({
        title: '最多10张',
        icon: 'error',
        duration: 1000,
        mask:true
    })
    }
   
  },
    takePhoto: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

      }
    })
  },
  commitUpload(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let curDate = new Date;
    let year = curDate.getFullYear();
    let month = curDate.getMonth() + 1;
    let date = curDate.getDate();
    let fill = (e) =>{
      if(e<10){
        return '0' + e;
      }else{
        return e;
      }
    }
    let res = `${year}-${month}-${fill(date)}`
    this.setData({
      date: res,
      curDate: res
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})