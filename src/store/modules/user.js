import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    // Vuex和localStorage均保存token
    token: getItem('token') || '' // 获取不到token则token设置为空
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
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
            this.commit('user/setToken', data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
