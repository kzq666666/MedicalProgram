// pages/info/info.js
import {getAllDoctors, editDoctorInfo, editPatientInfo} from '../../service/loginPage/index'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            
        },
        genderArray: ['男', '女'],
        type: '患者',
        doctorList: [],
        doctorName: [],
        mainDoctor: {},
        index: 0
    },
    bindinputVal(e){
        this.setData({
            'userInfo.nickName' : e.detail.value,
            'userInfo.name': e.detail.value
        })
    },
    bindPickerChange(e){
        this.setData({
            'userInfo.gender' : e.detail.value
        })
        console.log(this.data.userInfo.gender)
    },
    changeDoctor(e){
        this.setData({
            index: e.detail.value,
            mainDoctor: this.data.doctorList[e.detail.value]
        })
    },
    submitEditInfo(){
        const that = this;
        console.log(that)
        if(this.data.type == '主治医生'){
            editDoctorInfo(this.data.userInfo).then((res)=>{
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000,
                    mask: true,
                    complete: ()=>{
                      const eventChannel = that.getOpenerEventChannel()
                      eventChannel.emit('editSuccess', res.data)
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
            })
        }else{
            editPatientInfo(this.data.userInfo).then((res)=>{
                if(res.statusCode == 403){
                    wx.showToast({
                        title: '修改失败',
                        icon: 'error',
                        duration: 1000,
                        mask: true
                      })
                }else{
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 1000,
                        mask: true,
                        complete: ()=>{
                          const eventChannel = that.getOpenerEventChannel()
                          eventChannel.emit('editSuccess', res.data)
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
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        if(options.isDocto == 'true'){
            this.setData({
                type: '主治医生'
            })
        }else{
            this.setData({
                type: '患者'
            })
        }
        if(this.data.type == '患者'){
            let doctorName = []
            getAllDoctors().then(res=>{
                res.data.forEach((ele)=>{
                    doctorName.push(ele.name)
                })
                this.setData({
                    doctorList: res.data,
                    doctorName: doctorName
                })
            })
        }
        this.setData(
            {
                userInfo: app.globalData.userInfo
            }
        )
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