<script setup>
import { ref } from 'vue'
import AsideMenu from './AsideMenu.vue'
import TopHeader from './TopHeader.vue'

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="layout-container">
    <AsideMenu :is-collapse="isCollapse" />
    
    <el-container direction="vertical">
      <TopHeader :is-collapse="isCollapse" @toggle-collapse="toggleCollapse" />
      
      <el-main class="main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container { 
  height: 100vh; 
  display: flex;
}

.main { 
  background-color: var(--bg-body); 
  padding: 20px; 
  /* 确保主内容区域可滚动 */
  overflow-y: auto;
  transition: background-color 0.3s ease;
}

/* 简单的过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>