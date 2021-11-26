Component({
  properties: {
    options: {
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value: {
        id: '000',
        name: '全部'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    },
    value: {
      type: String,
      value: 'value'
    }
  },
  data: {
    result: [],
    base: [],
    isShow: false,
    current: {},
    flagList: []
  },
  methods: {
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
    optionTap(e) {
      let dataset = e.target.dataset
      console.log(dataset)
      let flag = false;
      let tempResult = this.data.result;
      if(dataset.children){
        flag = true;
        let index = dataset.index + 1;
        // tempResult
        if(!this.data.flagList[dataset.index]){
          dataset.children.forEach(child=>{
            child["isChild"] = true;
            tempResult.splice(index, 0, child)
            index += 1;
          })
          this.setData({
            [`flagList[${dataset.index}]`]: true
          })
        }else{
          tempResult.splice(index, dataset.children.length)
          this.setData({
            [`flagList[${dataset.index}]`]: false
          })
        }
        
      }else{
        this.setData({
          current: dataset,
        });
      }
      this.setData({
        isShow: flag,
        result: tempResult
      })
     

      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow,
        // isShow: !this.data.isShow,
        result: this.data.result,
        // flagList: new Array(this.data.base.length-1).fill(false)
        flagList: this.data.flagList.length ? this.data.flagList : new Array(this.data.result.length-1).fill(false)
      })
    },

    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  lifetimes: {
    attached() {
      // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
      let result = []
      let that = this;
      let flagList = [];
      function rename(obj, renameKey1, renameKey2, renameKey3){
        return {
          [renameKey1]: obj[that.data.key],
          [renameKey2]: obj[that.data.text],
          [renameKey3]: obj[that.data.value]
        }
      }
        for (let item of this.data.options) {
          let children = [];
          if(item.children){
            item.children.forEach(child=>{
              children.push(rename(child, "id", "name", "value"))
            })
          }else{
            children = null;
          }
          let {id, name, value} = rename(item, "id", "name", "value")
          result.push({ id, name, value, children })
          flagList.push(false)
      }
      console.log(result)
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
        result: result,
        base: this.deepClone(result),
        flagList: flagList
      })
    }
  }
})