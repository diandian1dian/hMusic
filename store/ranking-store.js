import { HYEventStore } from "hy-event-store";
import { getRankings } from "../service/api_music";

const rankingMap = {
  19723756: 'upRanking',
  3779629: 'newRanking',
  2884035: 'originRanking',
  3778678: 'hotRanking',
}

const rankingStore = new HYEventStore({
  state: {
    hotRanking: [],
    newRanking: [],
    upRanking: [],
    originRanking: []
  },
  actions: {
    getRankingDataAction(ctx) {
     //飙升榜:19723756
     //新歌榜:3779629
     //原创榜:2884035
     //热歌榜:3778678
     Object.keys(rankingMap).forEach(id=>{
       getRankings(id).then((res) => {
         const rankingName = rankingMap[id]
         ctx[rankingName] =  res.playlist
          // switch(id){
          //   case 19723756: 
          //     ctx.upRanking = res.playlist.tracks
          //     break;
          //   case 3779629: 
          //     ctx.newRanking = res.playlist.tracks
          //     break;
          //   case 2884035: 
          //     ctx.originRanking = res.playlist.tracks
          //     break;
          //   case 3778678: 
          //     ctx.hotRanking = res.playlist.tracks
          //     break;
          // }
        });
     })
      
    },
  },
});

export  {rankingStore, rankingMap}
