// components/dateShow/dataShow.js
import {getPatientAllPicDate} from '../../service/PhotoRecord/index'
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
    date: []
  },
  lifetimes: {
    ready(){
      const patientId = this.data.patientId;
      getPatientAllPicDate({
        patientId: patientId
      }).then(res=>{
        this.setData({
          date: res.data
        })
        console.log(res)
      })
    },
    attached: function() {
      console.log(this.data.patientId)
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
