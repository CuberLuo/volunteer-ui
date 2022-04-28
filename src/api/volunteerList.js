import request from '@/utils/request'

export const getVolunteerList = (data) => {
  console.log(data)
  return request({
    url: '/volunteerList',
    method: 'POST',
    data
  })
}
