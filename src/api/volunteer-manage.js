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

export const banVolunteer = (id) => {
  return request({
    url: `/banVolunteer/${id}`,
    method: 'GET'
  })
}
