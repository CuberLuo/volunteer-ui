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
        component: () => import('@/views/about')
      },
      {
        path: 'activity-manage',
        name: 'activity-manage',
        component: () => import('@/views/activity-manage')
      },
      {
        path: 'check-volunteer',
        name: 'check-volunteer',
        component: () => import('@/views/check-volunteer')
      },
      {
        path: 'volunteer-manage',
        name: 'volunteer-manage',
        component: () => import('@/views/volunteer-manage')
      },
      {
        path: 'volunteer-blacklist',
        name: 'volunteer-blacklist',
        component: () => import('@/views/volunteer-blacklist')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
