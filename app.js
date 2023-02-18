// app.js
App({
  onLaunch(){ //应用程序启动
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
  },
  globalData:{
    screenWidth: 0,
    screenHeight: 0
  }
})
