var openId;

App({
  onLaunch: function () {
      //全局初始化云服务
      wx.cloud.init({
        //用云ID配置环境
        env:"cloud1-0g1f8tyrab6b9e29",
        traceUser: true
      });

      //通过云函数获取_openid
      wx.cloud.callFunction({
        name: 'getOpenID',
        complete: res => {
          openId = res.result.userInfo.openId;
      }
    })
  },

  //全局变量
  openId: openId
})
