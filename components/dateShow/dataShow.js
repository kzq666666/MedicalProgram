// components/dateShow/dataShow.js
import {getPatientAllPicDate, getPicByDate, getDomainUpload } from '../../service/PhotoRecord/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    patientId:{
      type:  String,
      
    },
    isFresh:{
      type: Boolean,
      value: true
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
      this.triggerEvent('getId')
      if(this.data.isFresh){
        const patientId = this.data.patientId;
        if(this.data.isFresh){
          getPatientAllPicDate({
            patientId: patientId
          }).then(res=>{
            this.setData({
              date: res.data.sort().reverse(),
              isShow: new Array(res.data.length).fill(false),
              isFirstShow: new Array(res.data.length).fill(true),
              isFresh: false
            })
          })
        }
        }
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
      const that = this;
      wx.previewImage({
        urls: imgList,
        current: imgUrl,
      })
    },
  }
})
