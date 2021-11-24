// pages/doctor/paientManage/paientManage.js
import {getAllPatients} from '../../../service/doctor/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentValue: "全部",
    options: [
      {
        id: 1,
        name: "创面类型",
        children:[
          {
            id:2,
            name: "血管疾病",
            value:"VASCULAR_DISEASE"
          },
          {
            id: 3,
            name: "糖尿病"
            ,value:"DIABETES"
          },
          {
            id: 4,
            name: "外伤"
            ,value:"TRAUMA"
          },
          {
            id: 5,
            name: "压疮"
            ,value: "PRESSURE_SORE"
          },
          {
            id: 6,
            name: "其他"
            ,value: "OTHER"
          },
          
        ]
      },
      {
        id: 7,
        name: "危险等级",
        children:[
          {
            id: 8,
            name: "低"
            ,value: "low"
          },
          {
            id: 9,
            name: "中"
            ,value: "middle"
          },
          {
            id: 8,
            name: "高"
            ,value: "high"
          },
        ]
      }
    ],
    allData: ""
  },
  goToInfoPage(e){
    const info = JSON.stringify(e.target.dataset.info)
    wx.navigateTo({
      url: `/pages/info/info?userInfo=${info}`,
    })
  },
  changeValue(e){
    if(!e.detail.children){
      this.setData({
        currentValue: e.detail.name
      })
    }
  },
  getInfo(){
    wx.showLoading({
      title: '加载中',
    })
    getAllPatients({

      doctorId: wx.getStorageSync('userInfo').id
    }).then(res=>{
      wx.hideLoading()

      this.setData({
        allData: res.data.content
      })
      console.log(res)
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
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