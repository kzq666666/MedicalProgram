import request from '../../utils/request' 

// 上传照片记录
export const uploadNewPic = (params={}, headers={})=>{
  return request({
      url: '/api/photo-records',
      method: 'POST',
      data: params
  }, headers)
}
// 获取患者所有照片记录接口
export const getPatientAllPic = (params={}, headers={})=>{
  return request({
      url: `/api/photo-records/patient/${params.patientId}?pageSize=${params.pageSize || 10} ? pageNumber`,
      method: 'GET',
  }, headers)
}
export const getPatientAllPicDate = (params={}, headers={})=>{
  return request({
      url: `/api/photo-records/patient/${params.patientId}/dates`,
      method: 'GET',
  }, headers)
}


export const getDomainUpload = (params={}, headers={})=>{
  return request({
      url: '/api/qiniu/cdn/domain',
      method: 'GET',
      data: params
  }, headers)
}
