import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      // ① 注册登录模块
      component: () => import('../views/common/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // ⑥ 数据可视化 & ② 搜索
      component: () => import('../views/dashboard/DataScreen.vue'),
      meta: { title: '安全监测大屏', requiresAuth: true }
    },
    {
      path: '/decision',
      name: 'decision',
      // ④ 智能决策模块
      component: () => import('../views/Decision/SmartDecision.vue'),
      meta: { title: '智能决策中心', requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      // ⑤ 系统分级管理模块
      component: () => import('../views/admin/SystemManage.vue'),
      meta: { title: '后台管理系统', requiresAuth: true, role: 'admin' }
    }
  ]
})

// 路由守卫：登录拦截与权限控制
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/admin' && role !== 'admin') {
    alert('权限不足：非管理员无法访问')
    next('/dashboard')
  } else {
    next()
  }
})

export default router