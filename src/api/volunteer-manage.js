import request from '@/utils/request'

export const getVolunteerList = (data) => {
  return request({
    url: '/volunteerList',
    method: 'POST',
    data
  })
}

export const deleteVolunteer = (id) => {
  return request({
    url: `/deleteVolunteer/${id}`,
    method: 'DELETE'
  })
}
