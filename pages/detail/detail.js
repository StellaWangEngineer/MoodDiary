
const db = wx.cloud.database()

// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:{},
    note: [],
    noteID:'',
  },

  goToDelete:function(){
    //var tempID= noteID
    var that = this

    wx.switchTab({
      url:'/pages/home/home'
    })
    db.collection('note').where({
      id: that.data.noteID
    }).remove({
      success: function(res){
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    that.setData({
      noteID: options.id
    })
    console.log(that.data.noteID)

// 2. 构造查询语句
// collection 方法获取一个集合的引用

    db.collection('note').where({
      id: options.id
    }).get({
      success: res => {
        //console.log("测试")
        console.log(res.data)
        that.setData({
          article: res.data[0]
        })
        //console.log("测试2222")
        //console.log(this.data.article.things)
      },
      fail: res => {
        console.log(fail)
      }
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