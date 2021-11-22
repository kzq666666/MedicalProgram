import request from '../../utils/request' 

// 获取医生主治的所有患者信息接口
export const getAllPatients = (params={}, headers={})=>{
  return request({
      url: `/api/patients/doctor/${params.doctorId}`,
      method: 'GET',
  }, headers)
}