//数据库连接
const db = wx.cloud.database();
const note = db.collection("note");
//echart
var wxCharts = require('../../utils/wxcharts');
var radarChart = null;
//全局变量配置
var app = getApp();
var openId = app.openId;
//雷达图属性值
var anger = 100;
var disappointed = 100;
var happy = 100;
var praise = 100;
var reliable = 100;
var surprise = 100;

Page({
    //加载page时在note collection中查询用户各情绪值累计值，计算并填入雷达图中
    onLoad: function () {
      note.where({
        _openid: openId
      }).get({
        success:res=>{
          console.log(res);
          var items = new Array(res.data.length);
          if (res.data.length != 0) {
            for (let index = 0; index < res.data.length; index++) {
              anger += res.data[index].motion.anger;
              disappointed += res.data[index].motion.disappointed;
              happy += res.data[index].motion.happy;
              praise += res.data[index].motion.praise;
              reliable += res.data[index].motion.reliable;
              surprise += res.data[index].motion.surprise;
              items[index] = res.data[index];
            }
          }
          this.setData({
            items: items
          })
        }
      })
    },

    onReady: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        radarChart = new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            categories: ['anger', 'disappointed', 'happy', 'praise', 'reliable', 'surprise'],
            series: [{
                name: 'value',
                data: [anger, disappointed, happy, praise, reliable, surprise]
            }],
            width: windowWidth,
            height: 150,
            extra: {
                radar: {
                    max: 150
                }
            }
        });
    },
});
