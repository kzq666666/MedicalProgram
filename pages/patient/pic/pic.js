// pages/patient/pic/pic.js
// 患者页面 我的照片
import {getPatientAllPic} from '../../../service/PhotoRecord/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: "",
    isFirst: true,
    isFresh: false,
    isJustShow: false
  },

  getPatientId(){
    if(this.data.isFirst){
      this.setData({
        patientId: wx.getStorageSync('userInfo').id,
        isFirst: false,
        isFresh: true
      })
    }
  },
  goToNext(){
    wx.navigateTo({
      url: '/pages/patient/uploadPic/uploadPic',
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id, isJustShow;
    if(options.userInfo){
      id = JSON.parse(options.userInfo).id;
      isJustShow = true;
      wx.setNavigationBarTitle({
        title: `照片资料：${JSON.parse(options.userInfo).name}`,
      })
    }else{
      id = wx.getStorageSync('userInfo').id;
      isJustShow = false;
    }
    this.setData({
      patientId: id,
      isJustShow: isJustShow
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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