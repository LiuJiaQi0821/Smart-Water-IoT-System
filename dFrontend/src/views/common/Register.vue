<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧：系统介绍 -->
      <div class="login-left">
        <h1>智能导诊系统</h1>
        <p class="desc">面向患者的智能就医辅助平台</p>

        <ul class="features">
          <li>智能导诊与科室推荐</li>
          <li>在线预约与就诊管理</li>
          <li>医疗数据安全保障</li>
        </ul>
      </div>

      <!-- 右侧：注册表单 -->
      <div class="login-right">
        <div class="form-title">用户注册</div>

        <el-form
          :model="form"
          :rules="rules"
          ref="formRef"
          label-position="top"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              clearable
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              size="large"
            />
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              show-password
              size="large"
            />
          </el-form-item>

          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="onRegister"
          >
            注册
          </el-button>

          <el-button
            text
            class="to-login"
            @click="router.push('/login')"
          >
            已有账号？去登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import axios from "axios"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter()
const formRef = ref(null)

const form = reactive({
  username: "",
  password: "",
  confirmPassword: ""
})

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码至少 6 位", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error("两次输入的密码不一致"))
        } else {
          callback()
        }
      },
      trigger: "blur"
    }
  ]
}

const onRegister = async () => {
  if (!formRef.value) return

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  try {
    await axios.post(
      "http://localhost:8080/api/register",
      {
        username: form.username,
        password: form.password
      }
    )

    ElMessage.success("注册成功，请登录")
    router.push("/login")
  } catch (e) {
    ElMessage.error("注册失败，用户名可能已存在")
  }
}
</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #eef3fb, #f7f9fc);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 1100px;
  height: 560px;
  background: #ffffff;
  display: flex;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.login-left {
  flex: 1;
  background: linear-gradient(160deg, #409eff, #66b1ff);
  color: #ffffff;
  padding: 70px 60px;
}

.login-left h1 {
  font-size: 34px;
  font-weight: 600;
  margin-bottom: 14px;
}

.login-left .desc {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 2;
  opacity: 0.9;
}

.features li::before {
  content: "• ";
  margin-right: 4px;
}

.login-right {
  flex: 1;
  padding: 70px 70px;
}

.form-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 28px;
}

.login-btn {
  width: 100%;
  margin-top: 18px;
}

.to-login {
  margin-top: 10px;
  width: 100%;
}
</style>
