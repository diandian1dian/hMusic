// pages/datail-video/index.js
import {getMVURL, getMVDetail, getRelatedVideo} from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvDetail: {},
    mvUrlInfo: {},
    relatedVideo: {},
    danmuList:
    [{
      text: '第一',
      color: '#ff0000',
      time: 1
    }, {
      text: '好听好听',
      color: '#ff00ff',
      time: 3
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getPageData(id)
  },
  getPageData(id) {
    getMVURL(id).then(res=>{
      this.setData({mvUrlInfo: res.data})
    })
    getMVDetail(id).then(res=>{
      this.setData({mvDetail: res.data})
    })
    getRelatedVideo(id).then(res=>{
      this.setData({relatedVideo: res.data})
    })
  }
})