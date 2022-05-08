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

export const addVolunteer = (data) => {
  return request({
    url: '/addVolunteer',
    method: 'POST',
    data
  })
}

export const getAllVolunteerList = () => {
  return request({
    url: '/getAllVolunteerList',
    method: 'GET'
  })
}

export const getVolunteerInfoById = (id) => {
  return request({
    url: `/volunteerInfo/${id}`,
    method: 'GET'
  })
}

export const getActivitySelectList = () => {
  return request({
    url: '/getActivitySelectList',
    method: 'GET'
  })
}

export const changeVolunteerInfo = (data) => {
  return request({
    url: '/changeVolunteerInfo',
    method: 'POST',
    data
  })
}

export const getVolunteerOrderList = (data) => {
  return request({
    url: '/volunteerOrderList',
    method: 'POST',
    data
  })
}
