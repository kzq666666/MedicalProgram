const app = getApp()

Page({
  data: {
    userInfo: {},
    isLogin: false,
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
    let params = {};
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        params["encryptedData"] = res.encryptedData;
        params["iv"] = res.iv;
        params["rawData"] = res.rawData;
        params["signature"] = res.signature;
        
        wx.login({
          success(res){
            if(res.code){
              params["code"] = res.code;
              console.log(params)
              wx.request({
                url: app.globalData.url + '/wx/login',
                method: 'post',
                data: params,
                success(res){
                  console.log(res)
                }
              })
            }
          }
        })
      }
    })
    // wx.login({
    //   success(res){
    //     if(res.code){
    //       wx.request({
    //         url: app.globalData.url + '/wx/login',
    //         method: 'post',
    //         data: {
    //           code: res.code
    //         },
    //         success(res){
    //           console.log(res)
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.getUserInfo({
    //   success: function(res) {
    //     console.log(res)
    //   }
    // })
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // this.setData(
        //   {
        //     userInfo: res.userInfo,
        //     isLogin: !this.data.isLogin,
        //     isFirstLogin: false,
        //   }
        // )
        console.log(res)
      }
    })
  },
  getCode(){
    return 
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