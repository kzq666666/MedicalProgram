
const app = getApp();

// pages/paient/personalInfo/personalInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfoItem: [],
    userInfo: {}
      
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      personalInfoItem: [
        {
          name: '姓名',
          value: this.data.userInfo.nickName
        },
        {
          name: '性别',
          value: this.data.userInfo.gender==1?'男':'女'
        },
        {
          name: '病号',
          value: this.data.userInfo.patientNumber
        },
        {
          name: '诊断',
          value: this.data.userInfo.diagnosis
        },
        {
          name: '出生日期',
          value: this.data.userInfo.birth
        },
        {
          name: '年龄',
          value: "123"
        },
        {
          name: '住址',
          value: ''
        },
        {
          name: '主管医生',
          value: "测试"
        }
        
      ]
    })
  },
  goToComment(){
    const mainDoctor = JSON.stringify({
      name: 'test'
    })
    wx.navigateTo({
      url: "/pages/patient/commentDoctor/commentDoctor",
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