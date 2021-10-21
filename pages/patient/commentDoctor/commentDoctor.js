// pages/patient/commentDoctor/commentDoctor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentValue: [
      {value: '<60', name: '<60'},
      {value: '60~80', name: '60~80'},
      {value: '81~90', name: '81~90', checked: 'true'},
      {value: '91~99', name: '91~99'},
      {value: '100', name: '100'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submitComment(){
    // 保存医生评价
    wx.showToast({
      title: '评价成功',
      icon: 'success',
      duration: 1000,
      mask: true,
      complete: () => {
        setTimeout(
          () => {
            wx.navigateBack({
              delta: 1,
            })
          },
          1000
        )
      }
    })
  },
  onLoad: function (options) {

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