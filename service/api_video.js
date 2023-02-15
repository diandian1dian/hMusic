import HRequest from './index'

const hRequest = new HRequest()

export function getTopMV(offset, limit = 10){
  return hRequest.get("top/mv", {offset, limit})
}