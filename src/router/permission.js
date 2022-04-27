import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'
// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 用户登录前只能在登录页
  // 用户登录后不能进入登录页
  if (store.state.user.token) {
    // 有token
    if (to.path === '/login') {
      next('/') // 已登录后目标地址为登录页则跳转到主页
    } else {
      next()
    }
  } else {
    // 无token
    if (to.path !== '/login') {
      ElMessage.error('对不起,您尚未登录')
      next('/login') // 未登录时只能跳转到登录页
    } else {
      next()
    }
  }
})
