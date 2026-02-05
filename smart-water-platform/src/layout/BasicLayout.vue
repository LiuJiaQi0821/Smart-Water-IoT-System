<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取当前用户角色
const userRole = localStorage.getItem('userRole') || 'user'
const username = localStorage.getItem('username') || '访客'

// 判断是否为管理员
const isAdmin = computed(() => userRole === 'admin')

const handleLogout = () => {
  // 清除缓存
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="220px" class="aside">
      <div class="logo">智慧水务平台</div>
      
      <el-menu
        router
        :default-active="$route.path"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
        class="menu-flex"
      >
        <el-menu-item index="/dashboard">
          <span>智能决策看板</span>
        </el-menu-item>

        <el-menu-item index="/decision" v-if="isAdmin">
          <span>智能决策中心</span>
        </el-menu-item>

        <el-menu-item index="/analysis">
          <span>用水习惯分析</span>
        </el-menu-item>

        <el-menu-item index="/detection">
          <span>管网滴漏检测</span>
        </el-menu-item>

        <el-menu-item index="/system" v-if="isAdmin">
          <span>系统分级管理</span>
        </el-menu-item>
      </el-menu>
      
      <div class="logout-btn" @click="handleLogout">
        <span>退出 ({{ username }})</span>
      </div>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="breadcrumb">{{ $route.meta.title }}</div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container { height: 100vh; }

.aside { 
  background-color: #001529; 
  display: flex;
  flex-direction: column;

  .logo { 
    height: 60px; 
    line-height: 60px; 
    color: #fff; 
    text-align: center; 
    font-size: 18px; 
    font-weight: bold; 
    flex-shrink: 0;
  }
  
  .menu-flex {
    flex: 1;
    border-right: none;
    overflow-y: auto;
  }

  .logout-btn {
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s;
    font-size: 14px;
    
    &:hover {
      background-color: #002140;
      color: #409EFF;
    }
  }
}

.header { 
  background: #fff; 
  border-bottom: 1px solid #eee; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 0 20px; 
}

.main { 
  background-color: #f0f2f5; 
  padding: 20px; 
}
</style>