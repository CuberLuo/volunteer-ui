import request from '@/utils/request'

export const getVolunteerList = (data) => {
  return request({
    url: '/volunteerList',
    data
  })
}
