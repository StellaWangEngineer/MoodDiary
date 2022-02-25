


//var common = require('../../utils/common')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    basic:{},
    today:{},
    info:{
      key:['tmp','hum','uv'],
      val:{
        tmp:'温度（℃）',
        hum:'相对湿度（%）',
        uv:'紫外线指数',
      },
      
      weather:'晴',
      position: '广州，天河区',
      wet:'50',
      ray:'较强',
      date:'2020-04-22',
      everyday:"念念不忘，必有回响",
      background:'',
    },
    note:[]
  },



  handleAdd:()=>{
    wx.navigateTo({url:'/pages/note/note'})
  },

goToDetail:function(e){
  //获取携带data-id的数据
  let id = e.currentTarget.dataset.id
  console.log(id)
  //携带id进行页面跳转
  wx.navigateTo({
    url: '/pages/detail/detail?id='+ id,
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    const db = wx.cloud.database()
    // collection 方法获取一个集合的引用
    db.collection('note').where({
      _openid: 'o_UX35Kx4ZOTsYeRitBCLhvobZ3Q'
    }).get({
      success: res => {
        //console.log(res)
        self.setData({
          note: res.data
          
        })
        //console.log(note)
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
    var that = this
    const db = wx.cloud.database()
    // collection 方法获取一个集合的引用
    db.collection('note').where({
      _openid: 'o_UX35Kx4ZOTsYeRitBCLhvobZ3Q'
    }).get({
      success: res => {
        //console.log(res)
        that.setData({
          note: res.data
          
        })
        //console.log(note)
      }
    })
    that.getLocation();


  },

  getLocation:function(){
    var that = this;
    wx.getLocation({
      type:'wgs84',
      success:function(res){
        var latitude = res.latitude
        var longitude = res.longitude
        that.getWeatherInfo(latitude, longitude);
      }
    })
  },
  getWeatherInfo: function( latitude, longitude){
    var that = this;
    var key = '3d5a5dde0ecc44dcbb67f3111b000af0';
    var url = 'https://free-api.heweather.com/s6/weather?key='+key+'&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data:{},
      method: 'GET',
      success: function(res){
        var daily_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
        var daily_basic = res.data.HeWeather6[0].basic;
        console.log(daily_today);
        console.log(daily_basic);
        that.setData({
          today: daily_today,
          basic: daily_basic
        })
      }
    })
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
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    this.getImageList()//调用加载方法就好
    wx.stopPullDownRefresh();//停止刷新
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
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