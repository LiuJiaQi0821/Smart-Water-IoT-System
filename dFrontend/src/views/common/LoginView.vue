<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <h2>安全监测与智能决策平台</h2>
        <div class="feature-list">
          <p><el-icon><DataLine /></el-icon> 智能水表大数据接收</p>
          <p><el-icon><Cpu /></el-icon> 深度学习管网检测</p>
          <p><el-icon><Aim /></el-icon> 安全态势感知决策</p>
        </div>
      </div>
      <div class="login-right">
        <h3>欢迎登录</h3>
        <el-form :model="form" ref="formRef" :rules="rules" label-width="0">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号 (admin 或 user)" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码 (任意)" :prefix-icon="Lock" show-password />
          </el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">登 录</el-button>
          <div class="login-options">
            <span>注册账户</span>
            <span>忘记密码?</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, DataLine, Cpu, Aim } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import api from '@/API/Service'

const router = useRouter()
const loading = ref(false)
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
  loading.value = true
  try {
    const res = await api.login(form)
    if (res.code === 200) {
      // 存储用户信息
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('username', res.data.name)
      
      ElMessage.success(`欢迎回来，${res.data.name}`)
      
      // 根据角色跳转不同模块
      if (res.data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      ElMessage.error(res.msg || '登录失败')
    }
  } catch (error) {
    ElMessage.error('服务器连接异常')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 800px;
  height: 450px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}
.login-left {
  flex: 1;
  background: #409EFF;
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-left h2 { font-size: 24px; margin-bottom: 30px; }
.feature-list p { margin: 15px 0; font-size: 16px; display: flex; align-items: center; gap: 10px; }
.login-right {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-right h3 { text-align: center; margin-bottom: 30px; color: #333; }
.login-btn { width: 100%; height: 40px; font-size: 16px; }
.login-options { margin-top: 15px; display: flex; justify-content: space-between; font-size: 12px; color: #999; cursor: pointer; }
</style>