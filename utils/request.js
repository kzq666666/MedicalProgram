const baseUrl = "https://be.woundhealth.cn"
function request(options={}, headers={}){
    headers = Object.assign(
        {
            'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        },
        headers
    )
    console.log(headers)
    options["url"] = baseUrl + options["url"]
    return new Promise((res, rej)=>{
        wx.request(Object.assign(
            {
                header: headers
            }
            ,
            options,
            {
                success: res,
                fail: rej,
            },
        ))
    })
}
export default request