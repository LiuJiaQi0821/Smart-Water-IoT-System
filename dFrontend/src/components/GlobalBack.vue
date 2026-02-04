<template>
  <el-button
    v-if="show"
    class="global-back"
    type="primary"
    link
    size="small"
    @click="goBack"
  >
    ← 返回
  </el-button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

/* 登录页 / 注册页不显示返回 */
const show = computed(() => {
  return !['/login', '/register'].includes(route.path)
})
</script>

<style scoped>
.global-back {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
}
</style>
