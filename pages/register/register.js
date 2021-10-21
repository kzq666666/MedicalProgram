// pages/register/register.js
const app = getApp();
import {
  registerDoctor,
  registerPatient,
  getAllDoctors
} from '../../service/loginPage/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    type: '',
    genderArray: ['男', '女'],
    genderPicker: [{
        id: '0',
        name: '男'
      },
      {
        id: '1',
        name: '女'
      }

    ],
    index: 0,
    doctorList: [],
    doctorName: [],
    mainDoctor: {},
  },
  bindPickerChange(e) {
    console.log(e.detail.value)
    this.setData({
      'userInfo.gender': e.detail.value
    })
  },
  valueChange(e) {
    const label = e.currentTarget.dataset.label;
    const value = e.detail.value;
    this.data.userInfo[label] = value;
    console.log(this.data.userInfo)
  },
  submitRegister() {
    const that = this;
    let params = {
      "openid": wx.getStorageSync('openId'),
      "name": that.data.userInfo.nickName,
      "nickName": that.data.userInfo.nickName,
      "gender": that.data.userInfo.gender,
      "imageUrl": that.data.userInfo.avatarUrl
    };
    if (that.data.type == '患者') {
      if (!that.data.userInfo.patientNumber) {
        wx.showModal({
          cancelColor: 'cancelColor',
          title: '提示',
          content: '患者病号不能为空',
          success: (res) => {

          }
        })
      } else {
        params["patientNumber"] = that.data.userInfo.patientNumber
        params["doctor"] = that.data.mainDoctor
        registerPatient(params).then(res => {
          if (res.statusCode == 201) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000,
              mask: true,
              complete: () => {
                const eventChannel = that.getOpenerEventChannel()
                eventChannel.emit('registerSuccess', res.data)
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
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'error',
              duration: 1000,
              mask: true,
            })
          }
        })
      }

    } else {
      params["jobNumber"] = "test"
      registerDoctor(params).then(res => {
        if (res.statusCode == 201) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            complete: () => {
              const eventChannel = that.getOpenerEventChannel()
              eventChannel.emit('registerSuccess', res.data)
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
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'error',
            duration: 1000,
            mask: true
          })
        }
      })
    }

  },
  changeDoctor(e) {
    this.setData({
      index: e.detail.value,
      mainDoctor: this.data.doctorList[e.detail.value]
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
    if (this.data.type == '患者') {
      let doctorName = []
      getAllDoctors().then(res => {
        res.data.forEach((ele) => {
          doctorName.push(ele.name)
        })
        this.setData({
          doctorList: res.data,
          doctorName: doctorName,
          mainDoctor: res.data[0]
        })
      })
    }
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