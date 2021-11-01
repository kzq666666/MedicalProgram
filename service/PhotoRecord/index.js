import request from '../../utils/request' 

export const uploadNewPic = (params={}, headers={})=>{
  console.log(params)
  return request({
      url: '/api/photo-records',
      method: 'post',
      data: params
  }, headers)
}


export const getDomainUpload = (params={}, headers={})=>{
  return request({
      url: '/api/qiniu/cdn/domain',
      method: 'GET',
      data: params
  }, headers)
}
