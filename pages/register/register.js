// pages/register/register.js
const app = getApp();
import {registerDoctor} from '../../service/loginPage/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    type: '',
    genderArray: ['女', '男'],
    genderPicker: [
      {
        id: '1',
        name: '男'
      },
      {
        id: '0',
        name: '女'
      }

    ]
  },
  bindPickerChange(e){
    console.log(e.detail.value)
    this.setData({
      'userInfo.gender': e.detail.value
    })
  },
  valueChange(e){
    const label = e.currentTarget.dataset.label;
    const value = e.detail.value;
    this.data.userInfo[label] = value;
    console.log(this.data.userInfo)
  },
  submitRegister(){
    registerDoctor({

    }).then(res=>{
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type,
      userInfo: app.globalData.userInfo

    })
    console.log(this.data.userInfo)
    console.log(registerDoctor)
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