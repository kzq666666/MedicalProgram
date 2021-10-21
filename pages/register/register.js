// pages/register/register.js
const app = getApp();
import {registerDoctor, registerPatient} from '../../service/loginPage/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    type: '',
    genderArray: ['男', '女'],
    genderPicker: [
      {
        id: '0',
        name: '男'
      },
      {
        id: '1',
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
    const that = this;
    registerDoctor({
        "city": "广州",
        "country": "china",
        "gender": that.data.userInfo.gender,
        "id": "7",
        "imageUrl": that.data.userInfo.avatarUrl,
        "jobNumber": "string",
        "name": that.data.userInfo.nickName,
        "nickName": that.data.userInfo.nickName,
        "openid": wx.getStorageSync('openId'),
        "province": "广东"
    }).then(res=>{
      if(res.statusCode == 201){
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          complete: ()=>{
            const eventChannel = that.getOpenerEventChannel()
            eventChannel.emit('registerSuccess', res.data)
            setTimeout(
              ()=> {
                wx.navigateBack({
                  delta: 1,
                })
              },
              1000
            )
          }
        })
      }else{
        wx.showToast({
          title: '注册失败',
          icon: 'error',
          duration: 1000,
          mask: true,
          complete: ()=>{
            const eventChannel = that.getOpenerEventChannel()
            setTimeout(
              ()=> {
                wx.navigateBack({
                  delta: 1,
                })
              },
              1000
            )
          }
        })
      }
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