<template>
  <div class="admin-page">
    <div class="admin-container">
      <!-- 左侧：系统说明 -->
      <div class="admin-left">
        <h1>管理员控制台</h1>
        <p class="desc">系统基础数据与人员管理</p>

        <ul class="tips">
          <li>统一维护医生与排班信息</li>
          <li>保障系统数据规范性</li>
          <li>为患者预约提供数据支持</li>
        </ul>
      </div>

      <!-- 右侧：功能入口 -->
      <div class="admin-right">
        <div class="section-title">管理功能</div>

        <div class="func-grid">
          <div class="func-card" @click="go('/admin/users')">
            <h3>用户管理</h3>
            <p>管理患者、医生、药师账号</p>
          </div>

          <div class="func-card" @click="go('/admin/doctors')">
            <h3>医生管理</h3>
            <p>配置医生所属科室与职称</p>
          </div>

          <div class="func-card" @click="go('/admin/departments')">
            <h3>科室管理</h3>
            <p>维护医院科室基础信息</p>
          </div>

          <div class="func-card" @click="go('/admin/icd')">
            <h3>疾病编码管理</h3>
            <p>维护 ICD 疾病分类数据</p>
          </div>

          <div class="func-card" @click="go('/admin/statistic')">
            <h3>图表分析</h3>
            <p>查看系统数据可视化分析</p>
          </div>

          <div class="func-card" @click="go('/admin/NoticeManage')">
            <h3>公告管理</h3>
            <p>发布与维护医院公告信息</p>
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
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const go = (path) => {
  router.push(path)
}

/* 退出登录 */
const logout = () => {
  localStorage.removeItem("adminLogin")
  ElMessage.success("已退出登录")
  router.push("/login")
}
</script>

<style scoped>
/* 整体背景 */
.admin-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #eef3fb, #f7f9fc);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 主容器 */
.admin-container {
  width: 1100px;
  height: 560px;
  background: #ffffff;
  display: flex;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

/* 左侧说明区 */
.admin-left {
  flex: 1;
  background: linear-gradient(160deg, #2c7be5, #4dabf7);
  color: #ffffff;
  padding: 70px 60px;
}

.admin-left h1 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 14px;
}

.admin-left .desc {
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
.admin-right {
  flex: 1.2;
  padding: 60px 60px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 28px;
}

/* 功能卡片 */
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
