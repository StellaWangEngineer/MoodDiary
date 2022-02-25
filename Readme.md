!!!Readme文档是从上往下排的!!!

添加UI界面，数据绑定

dataAnalyse 数据分析，包括
  dataImport 数据导入 
  dataRecord 数据录入 
emotionManagment 情绪管理
emotionHistory 批量历史
help 帮助中心
home 主页
note 便签
personalCenter 个人中心
setting 个人设置

components 全局组件
  ec-canvas 微信小程序版本的echart用于绘制图表
  item-card 用于显示信息的卡片，具体介绍见后
  navbar 导航栏，部分页面需要定制化的导航栏，取消了自带的导航栏

navbar组件
  pageType: home页面有特定的导航栏组件，无特定组件可以不需要
  title: 居中标题
  back: 左侧返回按钮，不写则不显示
  例子：
    <navbar title="页面1" back />


item-card组件
  使用方式<item-card />
  绑定事件为 onTap,不要使用bindTap，会导致其他按钮无法生效
  属性：
    icon：可以传入record/weixin/folder/excel/file/record，都是已经配置好的图表，如果需要添加可以在pages\components\item-card\item-card.js里面的iconsMap对象添加
    close：右上角的关闭按钮，绑定onClose事件
    data：右上角的日期，格式为'2021-05-11'
    forward：右边的箭头，用于指示点击继续
    title: 中间的大标题
    subtitle：大标题下的小标题
    download: 右下角的下载按钮，绑定onDownload事件
    preview: 右下角的预览按钮，绑定onPreview按钮
    progress：最下方的进度条，传入数字，为0时不显示
  例子：
    <item-card icon="record" date="2021-05-10" forward title="记录" download preview />

2021.5.11 23:52

加入了一个algorithm算法的代码，放错位置了，这个代码是写分类算法的
2021。5.8 16：10
胡思可

icon文件夹放置的为小程序内需要的图标

pages文件夹为需要的页面，其中每一个页面由js, wxml, wxss, json四个文件组成，分别对应逻辑控制，页面渲染，页面样式，JSON配置

app.js 为全局逻辑控制文件，非必要不要改动

app.json为全局配置文件，非必要不要改动

project.config.json和sitemap.json为全局参数确认文件和sitemap，非必要不要改动



2021.4.19 10：47 

马鸣骏

