import request from '../../utils/request' 

// 获取问卷内容
export const getAllQuestion = (params={}, headers={})=>{
  return request({
      url: '/api/questionnaire/questions',
      method: 'get',
      data: params
  }, headers)
}
// 上传问卷记录
export const uploadQuesionRecord = (params={}, headers={})=>{
  return request({
      url: '/api/questionnaire-records',
      method: 'POST',
      data: params
  }, headers)
}

// 获取患者所有问卷记录接口
export const getAllRecord = (params={}, headers={})=>{
  return request({
      url: `/api/questionnaire-records/patient/${params.patientId}?pageSize=${params.pageSize || 10}`,
      method: 'GET'
  }, headers)
}