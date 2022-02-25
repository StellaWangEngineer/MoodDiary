// pages/dataImport/dataImport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: "select", // step用于区分第几个步骤,select/analyse/result
    icon:'excel',
    name:'',
    fileID:'',
    resultID:''
    
  },

  handleFromWeixin(){
    var that = this
    let success = false;
    //do something
    console.log('开始选择文件')
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0].path
        const tempFileName = res.tempFiles[0].name
        const tempFileType = res.tempFiles[0].type
        console.log(tempFilePaths)

        //调云函数
        wx.uploadFile({
          url: 'http://192.168.1.212:5000/analyseData',
                method: "POST",
          //filePath: that.data.imagePath,
          filePath: tempFilePaths,
          name: 'wximage',
          header: {
            'content-type': 'multipart/form-data'
          },
          
          success: function (res) {
            //do something
            that.setData({
              image: res.data
            })
            console.log(" success!!")
            console.log(res.data)
          },
          fail: function (res) {
            //do something
            console.log("false!!")
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 1000
            })
          },
          complete(res) {
            console.log(res)
            console.log(res.data)
            wx.downloadFile({
              url: 'http://192.168.1.212:5000/downLoad/' + res.data.analyse,
              //filePath: wx.env.USER_DATA_PATH + res.data,
              header: {},
              success: function(res) {
                var tempResultPath = res.tempFilePath
                console.log('临时文件地址是：' + tempResultPath)
                wx.openDocument({
                  filePath: tempResultPath,
                  showMenu: true,
                  fileType: 'xls',
                  success:function(res){
                    console.log('打开文档成功'+res)
                  },
                  fail:function(res){
                    console.log('打开文档失败'+res)
                  },
                  complete:function(res){
                    console.log(res)
                  }
                })
                // wx.saveFile({
                //   tempFilePath: tempResultPath,
                //   success: function(res) {
                //     var saveFilePath = res.savedFilePath   
                //     console.log('save的path:'+saveFilePath)
                    
                //   },//可以将saveFilePath写入到页面数据中
                //   fail: function(res) {},
                //   complete: function(res) {
                //     console.log('complete后的res数据：')
                //   },
                // }) //,
                // const cloudResultPath = 'result/' + tempResultName  //云存储路径
                // console.log('开始上传结果')
                // console.log(cloudResultPath)
                // wx.cloud.uploadFile({
                //   cloudPath: cloudResultPath,
                //   filePath: tempResultPath,
                //   success: resa => {
                //     console.log(resa.fileID)
                //     that.setData({
                //       resultID: res.fileID
                //     })
                //   }
                // })
              },
              fail: function(res) {
                wx.showModal({
                  title: '下载失败',
                  content: '请联系管理员',
                })
              },
              complete: function(res) {},

            })
          }
        })


        //上传文件
        const cloudPath = 'file/' + tempFileName  //云存储路径
        console.log('开始上传文件')
        console.log(cloudPath)
        wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: tempFilePaths,
          success: resa => {
            console.log(resa.fileID)
            that.setData({
              name: tempFileName
            })
            console.log('修改成功')
            console.log(that.data.name)
            console.log('显示file')
            const db = wx.cloud.database()
            //把文件名和文件在云存储的fileID存入fileList数据表中
            db.collection('fileList').add({
              data:{
                filename:tempFileName,
                fileID: resa.fileID
              }
            }).then(
              //提交后显示提示
              wx.showToast({
                title: '提交成功',
                duration:1500
              }),
              console.log('提交成功'),
              //success = true,
              //if(success){
                that.setData({step: 'analyse'})
              //}else{

              //}
            )

          },
          fail: e =>{
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
        })
      }
    })

    
  },


  handleFromFile(){
    let success = false;
    //do something
    success = true;
    if(success){
      this.setData({step: 'analyse'})
    }else{

    }
  },

  
  handleStart(){
    let done = false;
    //do someting
    done = true;
    if(done){
      this.setData({step:'result'})
    }else{
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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