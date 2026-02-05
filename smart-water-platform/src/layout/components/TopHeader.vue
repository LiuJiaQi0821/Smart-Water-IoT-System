<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'

defineProps({
  isCollapse: Boolean
})

defineEmits(['toggle-collapse'])
</script>

<template>
  <el-header class="header">
    <div class="left-panel">
      <!-- 折叠按钮 -->
      <el-icon 
        class="collapse-btn" 
        @click="$emit('toggle-collapse')"
        :size="20"
      >
        <component :is="isCollapse ? Expand : Fold" />
      </el-icon>
      
      <div class="breadcrumb">{{ $route.meta.title }}</div>
    </div>
    
    <div class="actions">
      <!-- 移除原有主题切换按钮 -->
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header { 
  background: var(--bg-card); /* 修改为跟随主题变量 */
  border-bottom: 1px solid var(--border-color); 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 0 20px; 
  height: 60px; /* 固定高度 */
  color: var(--text-main);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.left-panel {
  display: flex;
  align-items: center;
  gap: 15px;
}

.collapse-btn {
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--primary-color);
  }
}
</style>