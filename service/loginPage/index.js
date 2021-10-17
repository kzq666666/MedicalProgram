const app = getApp();
import request from '../../utils/request' 
export const registerDoctor = (params=null)=>{
    return request({
        url: '/api/doctors',
        method: 'POST',
        data: params
    })
}