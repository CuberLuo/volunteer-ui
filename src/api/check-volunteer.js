import request from '@/utils/request'

export const passVolunteer = (id) => {
  return request({
    url: `/passVolunteer/${id}`,
    method: 'GET'
  })
}
export const objectVolunteer = (id) => {
  return request({
    url: `/objectVolunteer/${id}`,
    method: 'DELETE'
  })
}
export const getCheckVolList = (data) => {
  return request({
    url: '/checkVolList',
    method: 'POST',
    data
  })
}
