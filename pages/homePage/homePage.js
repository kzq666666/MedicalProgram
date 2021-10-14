const app = getApp()

Page({
  data: {
    userInfo: {},
    isLogin: true,
    isFirstLogin: true,
    testUrl: '',
    doctorPage: [
      {
        "name": '通知信息',
        "targetUrl": "/page/",
      },
      {
        "name": '患者管理',
        "targetUrl": "/page/"
      },
      {
        "name": '照片问卷',
        "targetUrl": "/page/"
      },
      {
        "name": '反馈统计',
        "targetUrl": "/page/"
      }
    ],
    patientPage:[
      {
        "name": "个人资料",
        "targetUrl": "/pages/"
      },
      {
        "name": "我的消息",
        "targetUrl": "/pages/"
      },
      {
        "name": "我的照片",
        "targetUrl": "/pages/"
      },
      {
        "name": "我的问卷",
        "targetUrl": "/pages/"
      }
    ]
  },
  bindGetUserInfo(res){
    console.log(res)
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData(
          {
            userInfo: res.userInfo,
            isLogin: !this.data.isLogin,
            isFirstLogin: false,
          }
        )
      }
    })
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