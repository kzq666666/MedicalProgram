// pages/patient/pic/pic.js
// 患者页面 我的照片
import {getPatientAllPic} from '../../../service/PhotoRecord/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goToNext(){
    wx.navigateTo({
      url: '/pages/patient/uploadPic/uploadPic',
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
    this.setData({
      patientId: wx.getStorageSync('userInfo').id
    })
    // 获取用户照片记录
    // getPatientAllPic({
    //   patientId: wx.getStorageSync('userInfo').id,
    //   pageSize: 999999
    // }).then(res=>{
    //   console.log(res)
    // })
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