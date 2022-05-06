import request from '@/utils/request'

export const removeBlackVol = (id) => {
  return request({
    url: `/removeBlackVol/${id}`,
    method: 'GET'
  })
}
export const deleteBlackVol = (id) => {
  return request({
    url: `/deleteBlackVol/${id}`,
    method: 'DELETE'
  })
}
export const getBlackVolList = (data) => {
  return request({
    url: '/blackVolList',
    method: 'POST',
    data
  })
}
