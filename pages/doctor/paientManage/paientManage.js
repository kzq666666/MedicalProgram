// pages/doctor/paientManage/paientManage.js
import {
  getAllPatients
} from '../../../service/doctor/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentValue: "all",
    options: [{
      id: 0,
      name: "全部",
      value: "all"
    },{
        id: 1,
        name: "创面类型",
        children: [{
            id: 2,
            name: "血管疾病",
            value: "diagnosis VASCULAR_DISEASE"
          },
          {
            id: 3,
            name: "糖尿病",
            value: "diagnosis DIABETES"
          },
          {
            id: 4,
            name: "外伤",
            value: "diagnosis TRAUMA"
          },
          {
            id: 5,
            name: "压疮",
            value: "diagnosis PRESSURE_SORE"
          },
          {
            id: 6,
            name: "其他",
            value: "diagnosis OTHER"
          },

        ]
      },
      {
        id: 7,
        name: "危险等级",
        children: [{
            id: 8,
            name: "低",
            value: "finalRiskLevel 0"
          },
          {
            id: 9,
            name: "中",
            value: "finalRiskLevel 1"
          },
          {
            id: 8,
            name: "高",
            value: "finalRiskLevel 2"
          },
        ]
      }
    ],
    allData: [],
    showData: [],
    temp: [],
    curIndex: 0,
    filterValue: "",
    inputValue: ""
  },
  filterDataByValue(e) {
    const value = e.detail.value;
    let temp = this.data.temp.length?this.data.temp:this.data.showData;
    let filterList = temp.filter((item)=>{
      return item.name.indexOf(value) != -1 || item.patientNumber.indexOf(value) != -1
    })
    this.setData({
      temp: temp,
      showData: filterList
    })
    
  },
  goToInfoPage(e) {
    const info = JSON.stringify(e.target.dataset.info);
    const index = e.target.dataset.index;
    const that = this;
    console.log(index)
    this.setData({
      curIndex: index
    })
    wx.navigateTo({
      url: `/pages/info/info?userInfo=${info}`,
      events: {
        editSuccess(data) {
          that.updateAllData(data)
        }
      }
    })
  },
  filterShowData(key, value){
    let tempList = [];
    this.data.allData.forEach(item=>{
      if(item[key] == value){
        tempList.push(item);
      }
    })
    this.setData({
      showData: tempList
    })
  },
  changeValue(e) {
    if (!e.detail.children) {
      let key = e.detail.value.split(' ')[0]
      let value = e.detail.value.split(' ')[1]
      this.filterShowData(key, value)
      this.setData({
        filterValue: e.detail.value,
        temp: [],
        inputValue: ""
      })
    }
  },
  updateAllData(data) {
    let tempData = this.data.allData;
    for(let i=0;i<tempData.length;i++){
      if(tempData[i].id == data.id){
        tempData[i] = data
      }
    }
    this.setData({
      [`showData[${this.data.curIndex}]`]: data,
      allData: tempData,
      inputValue: "",
      temp: [],
    })
    
    let [key, value]= this.data.filterValue.split(' ');
    this.filterShowData(key, value)
  },
  deepClone(obj){
    let newObj = Array.isArray(obj) ? [] : obj;
    for(let key in obj){
      if(typeof obj[key] == 'object'){
        newObj[key] = this.deepClone(obj[key])
      }else{
        newObj[key] = obj[key]
      }
    }
    return newObj
  },
  getInfo() {
    wx.showLoading({
      title: '加载中',
    })
    getAllPatients({
      doctorId: wx.getStorageSync('userInfo').id
    }).then(res => {
      wx.hideLoading()
      this.setData({
        allData: res.data.content,
        showData: this.deepClone(res.data.content)
      })
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