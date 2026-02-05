<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="title">
        <h2>安全监测与智能决策平台</h2>
        <p>Smart Water IoT System</p>
      </div>
      <el-form :model="form" class="login-form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="账号 (admin / user)" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码 (任意)" prefix-icon="Lock" />
        </el-form-item>
        <el-button type="primary" class="btn" @click="handleLogin" :loading="loading">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '@/api/service' // 引入API

const router = useRouter()
const loading = ref(false)
const form = reactive({ username: '', password: '' })

const handleLogin = async () => {
  loading.value = true
  const res = await api.login(form)
  loading.value = false
  
  if (res.code === 200) {
    ElMessage.success(`欢迎回来，${res.name}`)
    // 简单的权限跳转逻辑
    if (res.role === 'admin') router.push('/admin')
    else router.push('/dashboard')
  }
}
</script>

<style scoped>
.login-wrapper { height: 100vh; display: flex; align-items: center; justify-content: center; background: #2c3e50; }
.login-box { width: 400px; padding: 40px; background: white; border-radius: 8px; text-align: center; }
.title h2 { color: #333; margin-bottom: 5px; }
.title p { color: #666; margin-bottom: 30px; }
.btn { width: 100%; margin-top: 10px; }
</style>