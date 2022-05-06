import request from '@/utils/request'

export const getActivityList = (data) => {
  return request({
    url: '/activityList',
    method: 'POST',
    data
  })
}

export const deleteActivity = (id) => {
  return request({
    url: `/deleteActivity/${id}`,
    method: 'DELETE'
  })
}

export const addActivity = (data) => {
  return request({
    url: '/addActivity',
    method: 'POST',
    data
  })
}

export const getAllActivityList = () => {
  return request({
    url: '/getAllActivityList',
    method: 'GET'
  })
}

export const getActivityInfoById = (id) => {
  return request({
    url: `/activityInfo/${id}`,
    method: 'GET'
  })
}
