<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧：系统介绍 -->
      <div class="login-left">
        <h1>智能导诊系统</h1>
        <p class="desc">医生端 · 工作台</p>

        <ul class="features">
          <li>今日预约与接诊提醒</li>
          <li>患者信息与病历管理</li>
          <li>AI 辅助诊疗与决策支持</li>
        </ul>
      </div>

      <!-- 右侧：医生主页内容 -->
      <div class="login-right">
        <div class="form-title">医生工作台</div>

        <!-- 操作按钮 -->
        <div class="actions">
          <el-button
            type="primary"
            size="large"
            @click="goSchedule"
          >
            查看排班
          </el-button>

          <el-button
            size="large"
            @click="goAppointment"
          >
            开始接诊
          </el-button>

          <el-button
            size="large"
            @click="goAiAssist"
          >
            AI 辅助诊疗
          </el-button>
        </div>

        <!-- 退出登录 -->
        <div class="logout">
          <el-button type="danger" link @click="logout">
            退出登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"

const router = useRouter()

/* 查看排班 */
const goSchedule = () => {
  router.push("/doctor/schedule")
}

/* 查看预约 */
const goAppointment = () => {
  router.push("/doctor/appointments")
}

/* AI 辅助诊疗 */
const goAiAssist = () => {
  router.push("/doctor/ai")
}

/* 退出登录 */
const logout = () => {
  localStorage.removeItem("doctorLogin")
  ElMessage.success("已退出登录")
  router.push("/login")
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
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 40px;
}

/* 操作按钮 */
.actions {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* 退出 */
.logout {
  margin-top: auto;
  text-align: right;
}
</style>
