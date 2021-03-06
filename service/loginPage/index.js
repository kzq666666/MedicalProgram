const app = getApp();
import request from '../../utils/request' 

// Doctor
// 注册
export const registerDoctor = (params = params?params:{}, registerCode)=>{
    return request({
        url: '/api/doctors?registerCode=' +  registerCode,
        method: 'POST',
        data: params
    })
}
// 获取所有医生
export const getAllDoctors = (params = params?params:{})=>{
    return request({
        url: '/api/doctors',
        method: 'GET',
        data: params
    })
}
// 修改医生个人信息
export const editDoctorInfo = (params)=>{
    return request({
        url: '/api/doctors/',
        method: 'PUT',
        data: params
    })
}
// 医生登录（工号密码）
export const doctorLogin = (params)=>{
    return request({
        url: '/api/doctors/authenticate',
        method: 'POST',
        data: params
    })
}
// 通过openid获取医生信息
export const getDoctorInfoByOpenId = (params)=>{
    return request({
        url: `/api/doctors/openid/${params.openid}`,
        method: 'GET'
    })
}
// Patient
// 注册
export const registerPatient = (params = params?params:{})=>{
    return request({
        url: '/api/patients',
        method: 'POST',
        data: params
    })
}
// 修改患者个人信息
export const editPatientInfo = (params)=>{
    return request({
        url: '/api/patients/',
        method: 'PUT',
        data: params
    })
}


export const getPatientsInfo = (params={}) =>{
    return request({
        url: '/api/patients/openid/' + params.openid,
        method: 'GET' 
    })
}