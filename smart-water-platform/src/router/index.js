import { createRouter, createWebHistory } from 'vue-router'
// 引入布局组件
import BasicLayout from '@/layout/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. 登录页 (不需要 Layout)
    {
      path: '/login',
      name: 'Login',
      // 对应文件: src/views/login/LoginView.vue
      component: () => import('@/views/login/LoginView.vue')
    },

    // 2. 主布局路由
    {
      path: '/',
      component: BasicLayout,
      redirect: '/dashboard', // 默认跳到仪表盘
      children: [
        {
          // 仪表盘
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: '数据大屏' },
          // 对应文件: src/views/dashboard/DataScreen.vue
          component: () => import('@/views/dashboard/DataScreen.vue')
        },
        {
          // 智能决策
          path: 'decision',
          name: 'SmartDecision',
          meta: { title: '智能决策' },
          // 对应文件: src/views/decision/SmartDecision.vue
          component: () => import('@/views/decision/SmartDecision.vue')
        },
        {
          // 用水习惯分析
          path: 'analysis',
          name: 'WaterHabit',
          meta: { title: '用水习惯分析' },
          // 对应文件: src/views/analysis/WaterHabit.vue
          component: () => import('@/views/analysis/WaterHabit.vue')
        },
        {
          // 管网滴漏检测
          path: 'detection',
          name: 'LeakDetection',
          meta: { title: '管网滴漏检测' },
          // 对应文件: src/views/detection/LeakDetection.vue
          component: () => import('@/views/detection/LeakDetection.vue')
        },
        {
          // 系统分级管理
          path: 'system',
          name: 'SystemAdmin',
          meta: { title: '系统分级管理' },
          // 对应文件: src/views/system/SystemAdmin.vue
          component: () => import('@/views/system/SystemAdmin.vue')
        },
        {
          // (备用) 后台管理 - 对应你截图里的 admin 文件夹
          path: 'admin-manage',
          name: 'SystemManage',
          meta: { title: '后台管理' },
          // 对应文件: src/views/admin/SystemManage.vue
          component: () => import('@/views/admin/SystemManage.vue')
        }
      ]
    },

    // 3. 兜底路由 (404) - 可选，防止乱输网址报错
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ]
})

export default router