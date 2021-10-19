const app = getApp()

Page({
  data: {
    userInfo: {},
    isLogin: true,
    isFirstLogin: true,
    isDoctor: false,
    testUrl: '',
    infoTarget: '/pages/info/info',
    doctorPage: [
      {
        "name": '通知信息',
        "targetUrl": "/page/",
      },
      {
        "name": '患者管理',
        "targetUrl": "/pages/doctor/paientManage/paientManage"
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
        "targetUrl": "/pages/paient/personalInfo/personalInfo"
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
  bindGetUserInfo(e){
    const type = e.currentTarget.dataset.type;
    const params = {};
    const that = this;
    wx.getUserProfile({
      desc: 'desc',
      success: (res)=>{
        params["encryptedData"] = res.encryptedData;
        params["iv"] = res.iv
        params["rawData"] = res.rawData
        params["signature"] = res.signature
        app.globalData.userInfo = res.userInfo
        wx.login({
          success(res){
            if(res.code){
              params["code"] = res.code
              wx.request({
                url: app.globalData.url + '/wx/login',
                method: 'post',
                data: params,
                success(res){
                  console.log(res)
                  that.checkIsLogin(res, type)
                  wx.setStorageSync('token', res.data.token);
                  wx.setStorageSync('openId', res.data.openid)
                }
              })
            }
          }
        })
      }
    })
   
  },
  
  checkIsLogin(res, currentRoleType){
    const tipRole = currentRoleType == 'ROLE_PATIENT' ? '患者' : '医生';
    const role = res.data.role;
    const that = this;
    if(!role){
      wx.showModal({
        title: '提示',
        content: `您还未注册为${tipRole}，请点击注册按钮进行注册`,
        confirmText: '注册',
        success: (res)=>{
          if(res.confirm){
            wx.navigateTo({
              url: `/pages/register/register?type=${tipRole}`,
              events: {
                registerSuccess(){
                  that.setData({
                    isLogin: true
                  })
                }
              }
            })
          }
          
        }
      })
    }else if(role == 'ROLE_DOCTOR'){
      this.setData({
        isLogin: true,
        isDoctor: true,
        userInfo: res.data.user
      })
    }
  },

  loginOut(){
    this.setData({
      isLogin: false
    })
  },
  handleNav(e){
    const targetUrl = e.currentTarget.dataset.target
    wx.navigateTo(
      {
        url: targetUrl
      }
    )
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