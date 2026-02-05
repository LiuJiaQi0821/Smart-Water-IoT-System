import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layout/components/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard', // 根路径默认跳转到看板
      component: BasicLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/DataScreen.vue'),
          meta: { title: '智能决策看板' }
        },
        {
          path: '/decision',
          name: 'decision',
          component: () => import('../views/decision/SmartDecision.vue'),
          meta: { 
            title: '智能决策中心',
            roles: ['admin'] // 仅管理员可访问
          }
        },
        {
          path: '/analysis',
          name: 'analysis',
          component: () => import('../views/analysis/WaterHabit.vue'),
          meta: { title: '用水习惯分析' }
        },
        {
          path: '/detection',
          name: 'detection',
          component: () => import('../views/detection/LeakDetection.vue'),
          meta: { title: '管网滴漏检测' }
        },
        {
          path: '/system',
          name: 'system',
          component: () => import('../views/admin/SystemManage.vue'),
          meta: { 
            title: '系统分级管理',
            roles: ['admin'] // 仅管理员可访问
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
      meta: { title: '用户登录' }
    },
    // 捕获所有未定义路由，跳转到 404 或首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 1. 设置网页标题
  document.title = to.meta.title ? `${to.meta.title} - 智慧水务平台` : '智慧水务平台'

  // 2. 获取用户信息
  const userRole = localStorage.getItem('userRole')
  
  // 3. 简单的白名单（不需要登录的页面）
  const whiteList = ['/login']

  if (whiteList.includes(to.path)) {
    // 如果去白名单页面，直接放行
    next()
  } else {
    // 如果没有登录信息，强制跳转登录页
    if (!userRole) {
      next('/login')
    } else {
      // 4. 权限检查
      if (to.meta.roles) {
        // 如果当前页面需要特定角色
        if (to.meta.roles.includes(userRole)) {
          next()
        } else {
          // 权限不足，提示或跳转回首页
          alert('无权访问该页面')
          next('/dashboard')
        }
      } else {
        // 不需要特定角色，直接放行
        next()
      }
    }
  }
})

export default router