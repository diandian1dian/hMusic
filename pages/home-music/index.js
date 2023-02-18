// pages/home-music/index.js
import { rankingStore, rankingMap } from '../../store/index'
import {getBanners, getSongMenu,} from '../../service/api_music'
import queryRect from '../../utils/query'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect) //只会执行一次

Page({
  data: {
    banners: [],
    swiperHeight:0,
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    rankings: {19723756: {}, 3779629: {}, 2884035: {}}
  },
  onLoad(options) {
    this.getPageData()
    //
    rankingStore.dispatch("getRankingDataAction")

    rankingStore.onState("hotRanking", res=>{
      if(!res.tracks?.length) return
        this.setData({recommendSongs: res.tracks.slice(0, 6)})
    })
  
    rankingStore.onState("newRanking", this.getRankingHandler(3779629))
    rankingStore.onState("upRanking", this.getRankingHandler(19723756))
    rankingStore.onState("originRanking", this.getRankingHandler(2884035))
  },
  //获取banner
  getPageData() {
    getBanners().then(res=>{
      this.setData({banners: res.banners})
    })
    getSongMenu().then(res=>{
      this.setData({hotSongMenu: res.playlists})
    })
    getSongMenu("华语").then(res=>{
      this.setData({recommendSongMenu: res.playlists})
    })
  },
  //事件处理
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  //准确的获取组件的高度
  handleSwiperLoaded(){
    throttleQueryRect('.swiper-image').then(res=>{
      const rect = res[0]
      this.setData({swiperHeight: rect.height})
    })
    // const query = wx.createSelectorQuery()
    // query.select('.swiper-image').boundingClientRect()
    // query.exec((res)=>{
    //   const rect = res[0]
    //   this.setData({swiperHeight: rect.height})
    // })
  },
  handlerMoreClick(){
    this.navigateToDetailSongPage("hotRanking")
  },
  handlerRankingItemClick(event){
   const idx = event.currentTarget.dataset.idx
   const rankingName = rankingMap[idx]
   this.navigateToDetailSongPage(rankingName)
  },
  navigateToDetailSongPage(name){
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${name}&type=rank`,
    })
  },
  onUnload(){
      //销毁
      // rankingStore.offState('newRanking', this.getNewRankingHandler)
  },
  getRankingHandler(idx){
    return (res)=> {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      // [idx] 动态的key ...this.data.rankings 固定榜单的顺序 否则就是谁先返回谁先展示
      const newRankings = { ...this.data.rankings, [idx]: rankingObj}
      this.setData({ 
        rankings: newRankings
      })
    }
  }
})