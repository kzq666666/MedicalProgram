const baseUrl = "http://120.24.254.248"
function request(options={}){
    options["url"] = baseUrl + options["url"]
    return new Promise((res, rej)=>{
        wx.request(Object.assign(
            {
                header: {
                    'token': wx.getStorageSync('token')
                }
            },
            options,
            {
                success: res,
                fail: rej,
            },
        ))
    })
}
export default request