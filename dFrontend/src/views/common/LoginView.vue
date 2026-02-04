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

      <!-- 右侧：登录表单 -->
      <div class="login-right">
        <div class="form-title">用户登录</div>

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

          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="onLogin"
          >
            登录
          </el-button>

          <!--跳转注册 -->
          <el-button
            text
            class="to-register"
            @click="router.push('/register')"
          >
            没有账号？去注册
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
  password: ""
})

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ]
}

const onLogin = async () => {
  if (!formRef.value) return

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  try {
    const res = await axios.post(
      "http://localhost:8080/api/login",
      form,
      { withCredentials: true } // Spring Security Session 必须
    )

    if (res.data?.success) {
      const role = res.data.role
      const username = res.data.name
      const id = res.data.id

      ElMessage.success("登录成功")

      //保存登录状态 & 角色
      localStorage.setItem("login", "true")
      localStorage.setItem("role", role)
      localStorage.setItem("doctorId", id)
      localStorage.setItem("doctorName", username)

      //按角色跳转首页
      switch (role) {
        case "patient":
          router.push("/patient")
          break
        case "doctor":
          router.push("/doctor")
          break
        case "admin":
          router.push("/admin")
          break
        case "pharmacy":
          router.push("/pharmacy")
          break
        default:
          ElMessage.error("未知用户角色")
      }
    } else {
      ElMessage.error(res.data?.message || "登录失败")
    }
  } catch (e) {
    ElMessage.error("用户名或密码错误")
  }
}
</script>

<style scoped>
/* 整体背景 */
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #eef3fb, #f7f9fc);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 主容器 */
.login-container {
  width: 1100px;
  height: 520px;
  background: #ffffff;
  display: flex;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

/* 左侧 */
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

/* 右侧 */
.login-right {
  flex: 1;
  padding: 80px 70px;
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

/*注册跳转按钮 */
.to-register {
  width: 100%;
  margin-top: 10px;
  text-align: center;
}
</style>
