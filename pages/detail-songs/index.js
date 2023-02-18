// pages/detail-songs/index.js
import {rankingStore} from '../../store/index'
import {getRankings} from '../../service/api_music'

Page({
  data: {
    ranking: '',
    songInfo: {
      name: ''
    },
    type: ''
  },
  onLoad(options) {
    console.log(options)
    const type= options.type
    this.setData({type: type})
    if(type === 'rank'){
      const ranking= options.ranking
      this.setData({ranking: ranking})
      console.log(ranking)
      rankingStore.onState(ranking, (res)=>this.getDataHandler(res))
    }else if(type ==='menu'){
      const id= options.id
      console.log(id)
      getRankings(id).then(res=>{
        this.getDataHandler(res.playlist)
      })
     
    }
    
  },
  onUnload(){
    if(this.data.ranking){
      rankingStore.offState(this.data.ranking, (res)=>this.getDataHandler(res))
    }
    
  },
  getDataHandler(res){
    this.setData({songInfo: res})
  }
})