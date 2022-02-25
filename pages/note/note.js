

//连接云数据库
const db = wx.cloud.database(); 
const note = db.collection('note');


// pages/note/note.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    source:'',
    image:'/assets/image.svg',
    condition: 1,
    motion:{
      anger:0,
      disappointed:0,
      happy:0,
      praise:0,
      reliable:0,
      surprise:0,
      value:0
    }
  },

  handleAddImage:function(){
    var cloudFilePath = (new Date().getHours()).toString()+(new Date().getMinutes()).toString()+(new Date().getSeconds()).toString()
    var temp = 'cloud://cloud1-0g1f8tyrab6b9e29.636c-cloud1-0g1f8tyrab6b9e29-1305295127/photo/' + cloudFilePath
    // var  tempFilePaths=''
    wx.chooseImage({
      // itemList: ['从手机相册选择', '拍照'],
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], 
      success:(chooseResult)=>{
      
        const tempFilePaths = chooseResult.tempFilePaths[0]
        console.log(tempFilePaths)
        this.setData({
          // source:'cloud://cloud1-0g1f8tyrab6b9e29.636c-cloud1-0g1f8tyrab6b9e29-1305295127/photo/' + cloudFilePath,
            image:tempFilePaths,
            condition: 0
        })
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'photo/'+cloudFilePath,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success(resa) {
            console.log('上传成功', resa)
            console.log(resa.fileID)
          },
        
        })

      },
    })

    this.setData({
      source:'cloud://cloud1-0g1f8tyrab6b9e29.636c-cloud1-0g1f8tyrab6b9e29-1305295127/photo/' + cloudFilePath,
        // image:tempFilePaths
    })
    
  },




  save: function (event) {
    var that =this
    //获得表单中传递来的日期、标题、事情、图片
    var id = event.detail.value.id;
    var date = event.detail.value.date;
    var title = event.detail.value.title;
    var things = event.detail.value.things;
    var week = event.detail.value.week;
    const weather = '晴';

    //判断日期是否为空,为空则默认为当前系统日期
    
    var today = new Date();
      
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //console.log(date)
    

    //获得星期和id
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    //let wday = new Date();
    today.setDate(today.getDate());
    //let day = today.getDay();
    week = show_day[today.getDay()];

    id = (today.getFullYear()).toString()+(today.getMonth()+1).toString()+(today.getDate()).toString()+(today.getHours()).toString()+(today.getMinutes()).toString();


    //获得情绪值
    wx.request({
      // url: 'http://127.0.0.1:5000/analyseData',
      url: 'http://8.131.59.54:5000/emotion/'+things,
      data: {
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        console.log("情绪值获取成功!!")
        console.log(res.data)
        that.setData({
          motion: res.data
        })
        console.log(that.data.motion)
      },
      fail: function (res) {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000
        })
      },
      complete: function (res) { 
        console.log(res) 
        //console.log(that.data.motion)
        //上传日期、标题、事情、图片到数据库的note collection
        note.add({
          data:{
            id: id,
            date: date,
            title: title,
            things: things,
            img: that.data.source,
            week: week,
            weather: weather,
            motion: that.data.motion
          }
        }).then(
          //提交后显示提示
          wx.showToast({
            title: '提交成功',
            duration:1500
          }),

          //跳转到主页
          wx.switchTab({
            url: '/pages/home/home',
          })
        )
      }
    })
  
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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


})
