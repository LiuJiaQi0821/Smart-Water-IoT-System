<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { Monitor, DataAnalysis, View, Setting, Moon, Sunny, SwitchButton } from '@element-plus/icons-vue' 

const props = defineProps({
  isCollapse: Boolean
})

const router = useRouter()
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 获取用户信息
const userRole = localStorage.getItem('userRole') || 'user'
const isAdmin = computed(() => userRole === 'admin')

// 菜单配置
const menuItems = computed(() => [
  { index: '/dashboard', title: '智能决策看板', show: true, icon: Monitor }, // 添加图标
  { index: '/decision', title: '智能决策中心', show: isAdmin.value, icon: DataAnalysis },
  { index: '/analysis', title: '用水习惯分析', show: true, icon: View },
  { index: '/detection', title: '管网滴漏检测', show: true, icon: View },
  { index: '/system', title: '系统分级管理', show: isAdmin.value, icon: Setting }
])

const handleLogout = () => {
  localStorage.removeItem('userRole')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<template>
  <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
    <!-- Logo 区域随折叠变化 -->
    <div class="logo">
      <el-icon v-if="isCollapse" :size="24" color="var(--primary-color)"><Monitor /></el-icon>
      <span v-else>智慧水务平台</span>
    </div>
    
    <el-menu
      router
      :default-active="$route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="transparent"
      class="menu-flex"
    >
      <template v-for="item in menuItems" :key="item.index">
        <el-menu-item :index="item.index" v-if="item.show">
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <template #title><span>{{ item.title }}</span></template>
        </el-menu-item>
      </template>
    </el-menu>
    
    <div class="bottom-panel">
      <!-- 主题切换 -->
      <div class="theme-switch" :class="{ 'collapsed': isCollapse }" @click="toggleDark()">
        <el-icon :size="18" :color="isDark ? '#F1C40F' : '#606266'">
          <component :is="isDark ? Moon : Sunny" />
        </el-icon>
        <span v-if="!isCollapse" class="label">{{ isDark ? '暗黑模式' : '明亮模式' }}</span>
        <el-switch
          v-if="!isCollapse"
          v-model="isDark"
          inline-prompt
          size="small"
          style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #dcdfe6"
          @click.stop
        />
      </div>

      <!-- 退出按钮 -->
      <div class="logout-btn" :class="{ 'collapsed': isCollapse }" @click="handleLogout">
        <el-icon :size="18"><SwitchButton /></el-icon>
        <span v-if="!isCollapse">退出</span>
      </div>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
.aside { 
  background-color: var(--bg-card); /* 修改为跟随主题 */
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: width 0.3s, background-color 0.3s, border-color 0.3s; /* 添加过渡动画 */

  .logo { 
    height: 60px; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-main); /* 跟随主题文字颜色 */
    font-size: 18px; 
    font-weight: bold; 
    flex-shrink: 0;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    overflow: hidden;
  }
  
  .menu-flex {
    flex: 1;
    border-right: none;
    overflow-y: auto;
    
    /* 覆盖 Element Plus 菜单默认样式，使其适配亮/暗主题 */
    :deep(.el-menu-item) {
      color: var(--text-regular);
      display: flex;
      align-items: center;
      
      .el-icon {
        margin-right: 10px; /* 调整图标间距 */
      }
      
      &:hover, &.is-active {
        color: var(--primary-color);
        background-color: var(--el-menu-hover-bg-color); /* 利用 Element Plus 内置变量 */
      }
      
      &.is-active {
         background-color: rgba(64, 158, 255, 0.1); 
         &::before {
           content: '';
           position: absolute;
           left: 0;
           top: 0;
           bottom: 0;
           width: 3px;
           background: var(--primary-color);
         }
      }
    }
    
    /* 折叠时图标样式调整，防止位置偏移 */
    &.el-menu--collapse {
      :deep(.el-menu-item) {
        .el-icon {
          margin: 0;
        }
      }
    }
  }

  .bottom-panel {
    border-top: 1px solid var(--border-color);
    padding: 10px 0;
    background-color: var(--bg-card);
    
    .theme-switch, .logout-btn {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      color: var(--text-regular);
      transition: all 0.3s;
      white-space: nowrap;
      
      &:hover {
        background-color: rgba(64, 158, 255, 0.1);
        color: var(--primary-color);
      }
      
      &.collapsed {
        justify-content: center;
        padding: 0;
      }

      .el-icon {
        margin-right: 10px;
      }
      
      &.collapsed .el-icon {
        margin-right: 0;
      }
      
      .label {
        flex: 1;
        font-size: 14px;
      }
    }
  }
}
</style>