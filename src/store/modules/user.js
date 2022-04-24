import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import router from '@/router'
export default {
  namespaced: true,
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
          .then((response) => {
            if (response.code === 10000) {
              this.commit('user/setToken', response.token)
              router.push('/') // 登录成功后页面跳转到主页面
            }
            resolve(response.code)
          })
          .catch((error) => {
            // error是一个object类型
            reject(error)
          })
      })
    },
    logoutSystem() {
      this.commit('user/setToken', '')
      removeAllItem()
      router.push('/login')
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  state: () => ({
    // Vuex和localStorage均保存token
    token: getItem('token') || '' // 获取不到token则token设置为空
  })
}
