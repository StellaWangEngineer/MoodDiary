// pages/components/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageType: String,
    title:String,
    back: Boolean,
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    date:'2021年5月',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back:()=>{
      wx.navigateBack({
        delta: 1,
      })
    },
    getDate:function(event){
      var that = this
      console.log(event.detail.value)
       that.setData({
         date:event.detail.value
       })
       
       console.log(this.data.date)
       },
  }
})
