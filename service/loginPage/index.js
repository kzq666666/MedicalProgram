const app = getApp();
import request from '../../utils/request' 
export const registerDoctor = (params = params?params:{})=>{
    return request({
        url: '/api/doctors',
        method: 'POST',
        data: params
    })
}

export const registerPatient = (params = params?params:{})=>{
    return request({
        url: '/api/patients',
        method: 'POST',
        data: params
    })
}

// Doctor
export const getAllDoctors = (params = params?params:{})=>{
    return request({
        url: '/api/doctors',
        method: 'GET',
        data: params
    })
}


export const editDoctorInfo = (params)=>{
    return request({
        url: '/api/doctors/',
        method: 'PUT',
        data: params
    })
}
