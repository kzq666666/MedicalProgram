// pages/doctor/login/login.js
import {doctorLogin, getDoctorInfoByOpenId} from '../../../service/loginPage/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../../src/images/doctorLogin.png',
    pwdShow: false,
    pwdType: "password",
    jobNumber: "",
    password: "",
    openid: "123456"
  },
  changePwdShow() {
    if (!this.data.pwdShow) {
      this.setData({
        pwdShow: true,
        pwdType: "text"
      })
    } else {
      this.setData({
        pwdShow: false,
        pwdType: "password"
      })
    }

  },
  doctorLogin(){
    const params = {
      jobNumber: this.data.jobNumber,
      password: this.data.password
    }
    doctorLogin(params).then((res)=>{
      if(res.statusCode == 200){
        wx.setStorageSync('token', res.data)
        getDoctorInfoByOpenId({
          openid: this.data.openid
        }).then(res=>{
          wx.setStorageSync('userInfo', res.data);
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          })
          const pages = getCurrentPages();
            let prevPage =  pages[pages.length-2]
            prevPage.setData({
              isLogin: true,
              userInfo: res.data,
              isDoctor: true

            })
          wx.navigateBack({
            delta: 0,
          })
        })
      }
    })
  },
  goToRegister() {
    const params = {};
    const that = this;
    wx.getUserProfile({
      desc: 'desc',
      success: (res) => {
        params["encryptedData"] = res.encryptedData;
        params["iv"] = res.iv
        params["rawData"] = res.rawData
        params["signature"] = res.signature
        app.globalData.userInfo = res.userInfo
        wx.login({
          success(res) {
            if (res.code) {
              params["code"] = res.code
              wx.request({
                url: app.globalData.url + '/wx/login',
                method: 'post',
                data: params,
                success(res) {
                  console.log(res)
                  wx.setStorageSync('token', res.data.token);
                  wx.setStorageSync('openId', res.data.openid);
                  wx.navigateTo({
                    url: `/pages/register/register?type=医生`,
                  })
                }
              })
            }
          }
        })
      }
    })
    // wx.navigateTo({
    //   url: '/pages/register/register',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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