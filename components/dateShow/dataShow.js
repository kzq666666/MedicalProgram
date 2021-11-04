// components/dateShow/dataShow.js
import {getPatientAllPicDate, getPicByDate, getDomainUpload } from '../../service/PhotoRecord/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    patientId:{
      type:  String,
      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: [],
    isShow: [],
    isFirstShow: [],
    imgList: {

    },
    domain: ""
  },
  lifetimes: {
    attached: function() {
      getDomainUpload().then(res=>{
        this.setData({
          domain: `https://${res.data}`
        })
      })
    },
  },
  pageLifetimes:{
    show(){
      this.triggerEvent('getId');
      const patientId = this.data.patientId;
      getPatientAllPicDate({
        patientId: patientId
      }).then(res=>{
        this.setData({
          date: res.data.sort(),
          isShow: new Array(res.data.length).fill(false),
          isFirstShow: new Array(res.data.length).fill(true)
        })
      })
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    getPic(e){
      const date = e.currentTarget.dataset.date;
      const index = e.currentTarget.dataset.index;
      const patientId = this.data.patientId;
      let editKey = `isShow[${index}]`
      if(this.data.isFirstShow[index]){
        getPicByDate({
          patientId: patientId,
          date: date
        }).then(res=>{
          this.setData({
            [`imgList.${date}`]: res.data.pictureUrls,
            [`isFirstShow[${index}]`]: false
          })
          console.log(this.data.imgList)
        })
      }
      this.setData({
        [editKey]: !this.data.isShow[index]
      })
    },
    showImg(e) {
      const imgUrl = e.currentTarget.dataset.url;
      const imgList = e.currentTarget.dataset.list.map(e=>{
        return `${this.data.domain}/${e}` 
      })
      console.log(imgList)
      const that = this;
      wx.previewImage({
        urls: imgList,
        current: imgUrl,
      })
    },
  }
})
