<script setup>
import { RouterView } from 'vue-router'
import GlobalBack from '@/components/GlobalBack.vue'
</script>

<template>
  <!-- 全局返回按钮 -->
  <GlobalBack />

  <!-- 页面内容 -->
  <RouterView />
</template>

<style scoped>
/* 无额外样式 */
</style>
