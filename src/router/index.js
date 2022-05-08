import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    redirect: '/about',
    component: () => import('@/layout/index'),
    children: [
      {
        path: '/about',
        name: 'about',
        meta: { title: '项目介绍' },
        component: () => import('@/views/about')
      },
      {
        path: '/volunteer-manage',
        name: 'volunteer-manage',
        meta: { title: '志愿者管理' },
        component: () => import('@/views/volunteer-manage')
      },
      {
        path: '/activity-manage',
        name: 'activity-manage',
        meta: { title: '志愿活动管理' },
        component: () => import('@/views/activity-manage')
      },
      {
        path: '/check-volunteer',
        name: 'check-volunteer',
        meta: { title: '志愿者审核' },
        component: () => import('@/views/check-volunteer')
      },
      {
        path: '/volunteer-blacklist',
        name: 'volunteer-blacklist',
        meta: { title: '志愿者黑名单' },
        component: () => import('@/views/volunteer-blacklist')
      },
      {
        path: '/:catchAll(.*)',
        component: () => import('@/views/404')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 后置路由守卫
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
