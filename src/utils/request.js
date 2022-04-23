import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
// axios封装
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      // 请求头Authorization注入token
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config // 返回配置
  },
  (error) => {
    // 请求失败
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)
export default service
