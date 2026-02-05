<template>
  <div class="login-container">
    <div class="login-box animate__animated animate__fadeInUp">
      <div class="header">
        <div class="logo-circle">
          <el-icon :size="30" color="#fff"><Monitor /></el-icon>
        </div>
        <h2>智慧水务物联网平台</h2>
        <p class="subtitle">{{ isRegister ? '注册新账户' : 'Smart Water IoT System' }}</p>
      </div>
      
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        class="login-form"
        size="large"
        status-icon
      >
        <el-form-item prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入账号" 
            :prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码" 
            :prefix-icon="Lock"
            show-password
            class="custom-input"
          />
        </el-form-item>

        <el-form-item prop="confirmPassword" v-if="isRegister">
          <el-input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="请确认密码" 
            :prefix-icon="Check"
            show-password
            class="custom-input"
          />
        </el-form-item>
        
        <div class="action-buttons">
          <el-button 
            type="primary" 
            class="submit-btn" 
            :loading="loading" 
            @click="handleSubmit"
            round
          >
            {{ isRegister ? '立即注册' : '登 录' }}
          </el-button>
        </div>

        <div class="toggle-box">
          <span v-if="!isRegister">
            还没有账号？ <a href="javascript:;" @click="toggleMode">立即注册</a>
          </span>
          <span v-else>
            已有账号？ <a href="javascript:;" @click="toggleMode">返回登录</a>
          </span>
        </div>
        
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Check, Monitor } from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(false)
const isRegister = ref(false)
const formRef = ref(null)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 1. 提取验证函数
const validatePass2 = (rule, value, callback) => {
  // 如果不在注册模式，直接通过（防止额外触发）
  if (!isRegister.value) {
    callback()
    return
  }
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

// 2. 将 rules 改为静态对象，不再使用 computed
// 这样切换时 rules 对象本身不变，不会触发重新校验
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  // 即使这里定义了规则，只要 el-form-item 被 v-if 移除，就不会触发校验
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
})

// 3. 优化切换逻辑
const toggleMode = async () => {
  isRegister.value = !isRegister.value
  
  // 等待 DOM 更新（输入框显示/隐藏）
  await nextTick()
  
  if (formRef.value) {
    // 重置表单值
    formRef.value.resetFields()
    // 强制清除所有校验状态（这是解决“直接提示错误”的关键）
    formRef.value.clearValidate()
  }
}

const handleSubmit = () => {
  if (!formRef.value) return
  
  formRef.value.validate((valid) => {
    if (valid) {
      if (isRegister.value) {
        handleRegister()
      } else {
        handleLogin()
      }
    }
  })
}

const handleRegister = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const users = getUserDB()
    
    if (users.find(u => u.username === form.username) || form.username === 'admin' || form.username === 'user') {
      ElMessage.error('该账号已存在')
      return
    }

    users.push({ username: form.username, password: form.password, role: 'user' })
    localStorage.setItem('mockUsers', JSON.stringify(users))
    
    ElMessage.success('注册成功，请登录')
    toggleMode()
  }, 800)
}

const handleLogin = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const { username, password } = form
    
    // 内置账号
    if (username === 'admin' || username === 'user') {
       loginSuccess(username, username)
       return
    }

    // 注册账号
    const users = getUserDB()
    const registeredUser = users.find(u => u.username === username && u.password === password)

    if (registeredUser) {
      loginSuccess(username, registeredUser.role)
    } else {
      ElMessage.error('账号或密码错误')
    }
  }, 1000)
}

const getUserDB = () => {
  try {
    return JSON.parse(localStorage.getItem('mockUsers') || '[]')
  } catch (e) {
    return []
  }
}

const loginSuccess = (name, role) => {
  localStorage.setItem('userRole', role)
  localStorage.setItem('username', name)
  ElMessage.success(`欢迎回来，${name}`)
  router.push('/dashboard')
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 420px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  text-align: center;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #409EFF, #00C6FB);
  border-radius: 50%;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
}

.header h2 {
  color: #303133;
  font-size: 24px;
  margin: 0;
  font-weight: 600;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 30px;
}

.custom-input :deep(.el-input__wrapper) {
  background-color: #f5f7fa;
  box-shadow: none;
  border: 1px solid transparent;
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  background-color: #fff;
  border-color: #409EFF;
  box-shadow: 0 0 0 1px #409EFF inset;
}

.submit-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  margin-top: 10px;
  background: linear-gradient(90deg, #409EFF, #00C6FB);
  border: none;
}

.toggle-box {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}

.toggle-box a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}

.tips {
  margin-top: 20px;
  padding: 10px;
  background: #ecf5ff;
  border-radius: 4px;
  color: #409EFF;
  font-size: 12px;
}
</style>