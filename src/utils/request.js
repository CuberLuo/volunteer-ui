import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config // 返回配置
  },
  (error) => {
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
