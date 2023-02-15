const BASE_URL = 'http://localhost:4000/'
class HRequest{
 request(url, method, param){
   return new Promise((resolve, reject)=>{
     wx.request({
      url: BASE_URL+url,
      data: param,
      method: method,
      success: (result) => {
        //通过promise回调出去
        resolve(result.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
 }
 get(url, params){
  return this.request(url, "GET", params)
 }
 post(url, data){
   return this.request(url,"POST", data)
 }
}

export default HRequest