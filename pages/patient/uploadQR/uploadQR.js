// pages/patient/uploadPic/uploadPic.js
import {getAllQuestion, uploadQuesionRecord} from '../../../service/QR/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2016-09-01",
    curDate: "",
    tempImg: [], 
    firstUpLoad: true,
    questionList: [],
    isDisabled: false,
    title: "上传问卷",
    userInfo: {}
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  radioChange(e){
    const selectedIndex = e.detail.value;
    const questionIndex = e.currentTarget.dataset.index;
    console.log(selectedIndex, questionIndex)
    this.setData({
      [`questionList[${questionIndex}].selectedIndex`]: Number(selectedIndex)
    })
  },
  commitUpload(){
    uploadQuesionRecord({
      patient: this.data.userInfo,
      date: this.data.date,
      questions: this.data.questionList
    }).then(res=>{
      wx.navigateBack({
        delta: 0,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pages = getCurrentPages();
    const lastPage = pages[pages.length-2];

    if(JSON.stringify(options) !== '{}'){
      // const isShowRecord = JSON.parse(options.isShowRecord);
      const qr = JSON.parse(options.qr)
      this.setData({
        isDisabled: true,
        date: qr.date,
        questionList: qr.questions,
        title:  qr.date
      })

    }else{
      let curDate = new Date;
      let year = curDate.getFullYear();
      let month = curDate.getMonth() + 1;
      let date = curDate.getDate();
      let fill = (e) =>{
        if(e<10){
          return '0' + e;
        }else{
          return e;
        }
      }
      let dateFill = `${year}-${month}-${fill(date)}`
      getAllQuestion().then(res=>{
        this.setData({
          date: dateFill,
          curDate: dateFill,
          questionList: res.data,
          userInfo: lastPage.data.userInfo
        })
      })
      
    }
    // console.log(isShowRecord)
    wx.setNavigationBarTitle({
      title: this.data.title//页面标题为路由参数
    })
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