import request from '@/utils/request'

export const login = (data) => {
  return request({
    // 返回一个Promise对象
    url: '/login',
    method: 'POST',
    data
  })
}

export const changePsd = (data) => {
  return request({
    // 返回一个Promise对象
    url: '/changePsd',
    method: 'POST',
    data
  })
}
