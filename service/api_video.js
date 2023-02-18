import hRequest from "./index";

export function getTopMV(offset, limit = 20) {
  return hRequest.get("/top/mv", { offset, limit });
}
/**
 * 请求MV的播放地址
 * @param {number} id MV的id
 */
export function getMVURL(id) {
  return hRequest.get("/mv/url", {
    id,
  });
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export function getMVDetail(mvid) {
  return hRequest.get("/mv/detail", {
    mvid,
  });
}

export function getRelatedVideo(id) {
  return hRequest.get("/related/allvideo", {
    id,
  });
}
