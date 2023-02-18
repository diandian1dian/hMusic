// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from "../../service/api_search";
import debounce from "../../utils/debounce";
import stringToNodes from "../../utils/string2nodes";
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [],
    suggestsongs: [],
    searchValue: "",
    suggestSongsNodes: [],
    resultSongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData();
  },
  getPageData() {
    getSearchHot().then((res) => {
      this.setData({ hotKeywords: res.result.hots });
    });
  },
  handleKeywordItemClick(event){
    const keyword = event.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword });
    this.getResultAction()
  },
  getResultAction(){
    const value = this.data.searchValue
    getSearchResult(value).then(res=>{
      this.setData({ resultSongs: res.result.songs });
    })
  },
  handleSearchChange(event) {
    const searchValue = event.detail;
    this.setData({ searchValue });
    if (!searchValue.length) {
      this.setData({ suggestsongs: [] });
      this.setData({ resultSongs: [] });
      //解决在防抖的情况下下面的请求拿到上一次结果的bug
      debounceGetSearchSuggest.cancel()
      return;
    }
    debounceGetSearchSuggest(searchValue).then((res) => {
      this.setData({ suggestsongs: res.result.allMatch });
      const suggestKeywords = this.data.suggestsongs.map(
        (item) => item.keyword
      );
      const suggestSongsNodes = [];
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue);
        suggestSongsNodes.push(nodes);
      }
      this.setData({ suggestSongsNodes });
    });
  },
});
