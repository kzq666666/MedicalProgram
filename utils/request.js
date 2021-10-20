const baseUrl = "https://be.woundhealth.cn"
function request(options={}){
    options["url"] = baseUrl + options["url"]
    return new Promise((res, rej)=>{
        wx.request(Object.assign(
            {
                header: {
                    'Authorization': 'Bearer ' + wx.getStorageSync('token')
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