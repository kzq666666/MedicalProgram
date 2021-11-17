// pages/patient/pic/pic.js
import {getAllQuestion, getAllRecord} from '../../../service/QR/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goToNext(){
    wx.navigateTo({
      url: '/pages/patient/uploadQR/uploadQR',
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
    const patientId = wx.getStorageSync('userInfo').id;
    getAllRecord({
      patientId: patientId,
      pageSize: 1000000
    }).then(res=>{
      this.setData({
        'record': res.data.content.sort((a,b)=>{
          if(a.date>b.date){
            return -1
          }else{
            return 1;
          }
        })
      })
    })
  },
  showRecord(e){
    const isShowRecord = true
    const index = e.currentTarget.dataset.index;
    const qr = JSON.stringify(this.data.record[index])
    wx.navigateTo({
      url: `/pages/patient/uploadQR/uploadQR?isShowRecord=${isShowRecord}&qr=${qr}`,
    })
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