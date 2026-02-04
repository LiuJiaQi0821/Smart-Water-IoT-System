<template>
  <div class="patient-page">
    <div class="patient-container">
      <!-- 左侧：系统信息 -->
      <div class="patient-left">
        <h1>患者服务中心</h1>
        <p class="desc">请选择您需要的服务</p>

        <ul class="tips">
          <li>智能导诊可辅助选择科室</li>
          <li>预约挂号请提前安排时间</li>
          <li>系统仅提供就医辅助建议</li>
        </ul>
      </div>

      <!-- 右侧：功能入口 -->
      <div class="patient-right">
        <div class="section-title">常用功能</div>

        <div class="func-grid">
          <div class="func-card" @click="go('/patient/triage')">
            <h3>智能导诊</h3>
            <p>根据症状获取就医建议</p>
          </div>

          <div class="func-card" @click="go('/patient/drugs')">
            <h3>处方查询</h3>
            <p>查看处方信息</p>
          </div>

          <div class="func-card" @click="go('/patient/profiles')">
            <h3>个人信息管理</h3>
            <p>管理个人信息</p>
          </div>

          <div class="func-card" @click="go('/patient/appointment/create')">
            <h3>预约挂号</h3>
            <p>在线预约医生</p>
          </div>

          <div class="func-card" @click="go('/patient/appointments')">
            <h3>我的预约</h3>
            <p>查看历史预约记录</p>
          </div>

          <div class="func-card" @click="go('/patient/triage/logs')">
            <h3>我的导诊记录</h3>
            <p>查看历史智能导诊结果</p>
          </div>

          <div class="func-card" @click="go('/patient/Notice')">
            <h3>医院公告</h3>
            <p>查看医院最新通知信息</p>
          </div>
          <div class="func-card" @click="go('/patient/aidoctor')">
            <h3>AI医生</h3>
            <p>抢先问诊</p>
          </div>
        </div>

        <!-- 退出登录（新增） -->
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

const go = (path) => {
  router.push(path)
}

/* 退出登录 */
const logout = () => {
  localStorage.removeItem("patientLogin")
  ElMessage.success("已退出登录")
  router.push("/login")
}
</script>

<style scoped>
/* 整体背景 */
.patient-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #eef3fb, #f7f9fc);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 主容器 */
.patient-container {
  width: 1100px;
  height: 560px;
  background: #ffffff;
  display: flex;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

/* 左侧说明区 */
.patient-left {
  flex: 1;
  background: linear-gradient(160deg, #409eff, #66b1ff);
  color: #ffffff;
  padding: 70px 60px;
}

.patient-left h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 14px;
}

.patient-left .desc {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.tips {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 2;
  opacity: 0.9;
}

.tips li::before {
  content: "• ";
  margin-right: 4px;
}

/* 右侧功能区 */
.patient-right {
  flex: 1.2;
  padding: 60px 60px;
  overflow-y: auto;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 28px;
}

/* 功能卡片网格 */
.func-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.func-card {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 24px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.func-card:hover {
  background: #e6f0ff;
  transform: translateY(-4px);
}

.func-card h3 {
  font-size: 18px;
  margin-bottom: 6px;
}

.func-card p {
  font-size: 14px;
  color: #666;
}

/* 退出按钮区域 */
.logout {
  margin-top: 30px;
  text-align: right;
}
</style>
