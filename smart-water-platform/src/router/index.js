import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layout/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. 登录页
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/LoginView.vue')
    },

    // 2. 主应用布局 (需要登录)
    {
      path: '/',
      component: BasicLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: '智能决策看板' },
          component: () => import('@/views/dashboard/DataScreen.vue')
        },
        {
          path: 'decision',
          name: 'SmartDecision',
          meta: { title: '智能决策中心', roles: ['admin'] }, // 标记: 仅管理员可进 (可选路由级控制)
          component: () => import('@/views/decision/SmartDecision.vue')
        },
        {
          path: 'analysis',
          name: 'WaterHabit',
          meta: { title: '用水习惯分析' },
          component: () => import('@/views/analysis/WaterHabit.vue')
        },
        {
          path: 'detection',
          name: 'LeakDetection',
          meta: { title: '管网滴漏检测' },
          component: () => import('@/views/detection/LeakDetection.vue')
        },
        {
          path: 'system',
          name: 'SystemAdmin',
          meta: { title: '系统分级管理', roles: ['admin'] }, // 标记: 仅管理员
          component: () => import('@/views/system/SystemAdmin.vue')
        }
      ]
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

// --- 全局权限守卫 ---
router.beforeEach((to, from, next) => {
  // 模拟从 localStorage 获取用户信息
  const userRole = localStorage.getItem('userRole')

  // 如果去的不是登录页，且没有角色信息，强制跳回登录页
  if (to.path !== '/login' && !userRole) {
    next('/login')
  } else {
    // 简单的权限判断 (如果路由配置了 meta.roles)
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      alert('无权访问该页面')
      next(from.path) // 或者是 '/dashboard'
    } else {
      next()
    }
  }
})

export default router