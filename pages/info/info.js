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
        index: 0,
        finalRiskLevel: ["低风险", "中风险", "高风险"],
        diagnosisArray: ["血管疾病", "糖尿病", "外伤", "压疮", "其他"],
        diagnosisValue: ["VASCULAR_DISEASE", "DIABETES", "TRAUMA", "PRESSURE_SORE", "OTHER"],
        diagnosisIndex: 0,
        finalRiskLevelIndex: 0,
        statusArray: ["随访结束","正在随访"],
        statusIndex: 0,
        type: '患者',
        doctorList: [],
        doctorName: [],
        mainDoctor: {},
        isDoctor: false,
        isEditAble: false,
    },
    goToRecords(e){
        wx.navigateTo({
          url: 'url',
        })
    },
    goToQR(e){
        const obj = JSON.stringify(this.data.userInfo);
        wx.navigateTo({
          url: `/pages/patient/QR/QR?userInfo=${obj}`
        })
    },
    goToPic(){
        const obj = JSON.stringify(this.data.userInfo);
        wx.navigateTo({
          url: `/pages/patient/pic/pic?userInfo=${obj}`
        })
    },
    changeDiagnosis(e){
        this.setData({
            'userInfo.diagnosis': this.data.diagnosisValue[this.data.diagnosisIndex],
            'diagnosisIndex': e.detail.value
        })
    },
    changeRisk(e){
        this.setData({
            'userInfo.finalRiskLevel': e.detail.value,
            'finalRiskLevelIndex': e.detail.value
        })
    },
    changeStatus(e){
        this.setData({
            'userInfo.status': e.detail.value,
            'statusIndex': e.detail.value
        })
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
    },
    changeDoctor(e){
        this.setData({
            index: e.detail.value,
            mainDoctor: this.data.doctorList[e.detail.value]
        })
    },
    submitEditInfo(){
        if(this.data.isDoctor){
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
        let userInfo;
        let editAble = false;
        let isDoctor = options.isDoctor?JSON.parse(options.isDoctor): false;
        if(options.userInfo){
            userInfo = JSON.parse(options.userInfo)
            editAble = true;
        }else{
            userInfo = wx.getStorageSync('userInfo');
        }
        
        
        // if(this.data.type == '患者'){
        //     let doctorName = []
        //     getAllDoctors().then(res=>{
        //         res.data.forEach((ele)=>{
        //             doctorName.push(ele.name)
        //         })
        //         this.setData({
        //             doctorList: res.data,
        //             doctorName: doctorName
        //         })
        //     })
        // }
        this.setData(
            {
                userInfo: userInfo,
                isDoctor: isDoctor,
                isEditAble: editAble
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