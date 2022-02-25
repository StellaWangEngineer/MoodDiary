// pages/components/item-card/item-card.js
const iconsMap = {
  weixin:{
    src:'/assets/weixin.svg',
    bgColor:'#5BD234',
    size: 'large',
    padding: 10,
    radius: 10
  },
  folder:{
    src:'/assets/folder.svg',
    bgColor:'#FFB067',
    size:'large',
    padding: 10,
    radius: 10
  },
  excel:{
    src:'/assets/excel.svg',
  },
  file:{
    src:'/assets/file.svg'
  },
  record:{
    src:'/assets/record.svg'
  }
}

Component({
  /**
   * 组件的属性列表
   */


  properties: {
    icon:String,
    close:Boolean,
    date:String,
    forward: Boolean,
    title:String,
    subtitle:String,
    download:Boolean,
    preview: Boolean,
    progress: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    icons: iconsMap,
  },

  onClose(){
    this.triggerEvent('onClose')
  },
  onTap(){
    this.triggerEvent('onTap')
  },
  onDownload(){
    this.triggerEvent('onDownload')
  },
  onPreview(){
    this.triggerEvent('onPreview')
  },



  /**
   * 组件的方法列表
   */
  methods: {

  },
})
