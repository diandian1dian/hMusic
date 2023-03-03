// pages/music-player/index.js
import {getSongDetail, getSongLyric} from '../../service/api_player'
import {audioContext} from '../../store/index'
import {parseLyric} from '../../utils/parse-lyric'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicDetail: {},
    playingName: "play",
    currentTime: 0,
    currentLyricText: '',
    currentLyricIndex: '',
    lyricInfo: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    console.log(id)
    this.getPageData(id)
  },
  getPageData(id){
    getSongDetail(id).then(res=>{
      this.setData({musicDetail: res.songs[0]})
    })
    getSongLyric(id).then(res=>{
      const lyricInfo = parseLyric(res.lrc.lyric)
      this.setData({lyricInfo})
    })
    this.handleAudioContext(id)
  },
  handleAudioContext(id){
    //使用audioContext播放音频
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    audioContext.onCanplay(()=>{ //已经准备好了 音频流解析好了
      audioContext.play()
    })
    audioContext.onTimeUpdate(()=>{
      // console.log(audioContext.currentTime)
      const currentTime = audioContext.currentTime * 1000
      this.setData({currentTime})
      for(let i = 0; i< this.data.lyricInfo.length;i++){
        const lyricInfo = this.data.lyricInfo[i]
        if(currentTime < lyricInfo.time){
          const currentIndex = i -1
          if(this.data.currentLyricIndex !== currentIndex){
            const currenInfo = this.data.lyricInfo[currentIndex]
            this.setData({currentLyricText: currenInfo.text, currentLyricIndex:currentIndex })
          }
          break
        }
      }



    })
  },
  handlePlayBtnClick(){
  },
  handleBackBtnClick(){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    audioContext.stop()

  },
})