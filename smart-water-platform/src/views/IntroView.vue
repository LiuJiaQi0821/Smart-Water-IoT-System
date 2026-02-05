<template>
  <div class="intro-container">
    <div class="content-wrapper">
      <div class="hero-section">
        <h1 class="title animate__animated animate__fadeInDown">智慧水务物联网系统</h1>
        <p class="subtitle animate__animated animate__fadeInUp">Smart Water IoT Management Platform</p>
        <div class="description animate__animated animate__fadeInUp">
          <p>基于 AI 深度学习与物联网技术的全栈式水务管理解决方案</p>
          <ul class="features">
            <li>🌊 <strong>全网态势感知</strong> - 实时监控管网压力、流量与水质</li>
            <li>🤖 <strong>智能决策大脑</strong> - 自动调控泵站阀门，优化能效</li>
            <li>🔍 <strong>精准滴漏检测</strong> - 多源数据融合，毫秒级定位异常</li>
          </ul>
        </div>
        <div class="actions animate__animated animate__fadeInUp">
          <el-button type="primary" size="large" class="enter-btn" @click="enterSystem">
            进入控制台 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
          <el-button size="large" plain @click="about">了解更多</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      © 2026 Smart Water System | Designed by LiuJiaQi
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue' // 确保你安装了图标库，如果没有可以去掉icon

const router = useRouter()

const enterSystem = () => {
  // 跳转到新的系统主页路径
  router.push('/system/dashboard')
}

const about = () => {
  window.open('https://github.com/liujiaqi0821', '_blank')
}
</script>

<style scoped>
.intro-container {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #001529 0%, #003a70 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 增加一些背景纹理或光效 */
.intro-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  animation: rotate 60s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.content-wrapper {
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.title {
  font-size: 3.5rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
  font-weight: 700;
  background: linear-gradient(to right, #409EFF, #36cfc9);
  -webkit-background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: #a6adb4;
  margin-bottom: 40px;
  font-weight: 300;
}

.description {
  margin-bottom: 50px;
}

.features {
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.features li {
  background: rgba(255,255,255,0.1);
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.enter-btn {
  font-weight: bold;
  padding-left: 30px;
  padding-right: 30px;
}

.footer {
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}
</style>