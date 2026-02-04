import { createRouter, createWebHistory } from 'vue-router'

/* ========= 公共 ========= */
import LoginView from '@/views/common/LoginView.vue'
import Register from '@/views/common/Register.vue'

/* ========= 角色1 ========= */
//示例：import PatientHome from '@/views/patient/PatientHome.vue'

/* ========= 角色2 ========= */
//示例：import AdminHome from '@/views/admin/AdminHome.vue'

/* ========= 角色3 ========= */
//示例：import PharmacyHome from '@/views/pharmacy/PharmacyHome.vue'

/* ================== 路由定义 ================== */
const routes = [
  /* ===== 系统入口 ===== */
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: Register
  },

  /* ===== 角色1 ===== */
  //下面这些为留的示例
  { path: '/patient', component: PatientHome },

  /* ===== 角色2 ===== */
  { path: '/admin', component: AdminHome },

  /* ===== 角色3 ===== */
  { path: '/pharmacy', component: PharmacyHome },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* =====================================================
 * 路由守卫：登录校验 + 角色权限控制
 * ===================================================== */
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('login') === 'true'
  const role = localStorage.getItem('role')

  //登录 / 注册 页面直接放行
  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }

  //未登录，强制跳登录页
  if (!isLogin) {
    next('/login')
    return
  }

  //已登录，按路径前缀校验角色
  if (to.path.startsWith('/patient') && role !== 'patient') {
    next('/login')
    return
  }

  if (to.path.startsWith('/doctor') && role !== 'doctor') {
    next('/login')
    return
  }

  if (to.path.startsWith('/admin') && role !== 'admin') {
    next('/login')
    return
  }

  if (to.path.startsWith('/pharmacy') && role !== 'pharmacy') {
    next('/login')
    return
  }

  //校验通过，放行
  next()
})

export default router
