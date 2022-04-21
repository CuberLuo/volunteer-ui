import { login } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    loginSystem(context, userInfo) {
      // userInfo传入的是Proxy对象,有属性username和password
      // Proxy {username: 'admin', password: '123'}
      const { username, password } = userInfo // 解构赋值
      return new Promise((resolve, reject) => {
        // 发送axios登录请求(异步操作)
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
