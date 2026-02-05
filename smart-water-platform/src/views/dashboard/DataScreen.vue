<template>
  <div class="p-20">
    <div class="header">
      <h2>{{ isAdmin ? '全网 S 级态势感知 (管理员视图)' : '个人用水安全卫士 (用户视图)' }}</h2>
    </div>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            {{ isAdmin ? '全网漏损风险分布' : '当前漏损风险评估 (AI模型)' }}
          </template>
          
          <div class="center-content">
            <div v-if="isAdmin" class="admin-risk-stat">
              <el-progress type="circle" :percentage="12" status="exception" :width="100">
                <template #default>
                  <span class="risk-num">3</span>
                  <div class="risk-label">高危区域</div>
                </template>
              </el-progress>
              <div class="risk-summary mt-10">
                <p>中风险区域: <strong>5</strong> 个</p>
                <p>低风险区域: <strong>42</strong> 个</p>
              </div>
            </div>

            <div v-else>
              <el-progress type="dashboard" :percentage="monitor.leakRisk" :color="colors" />
              <p>{{ monitor.leakRisk > 80 ? '高危滴漏风险' : '正常' }}</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            {{ isAdmin ? '全网终端运行概览' : '当前终端实时感知' }}
          </template>

          <el-descriptions v-if="isAdmin" border :column="2">
            <el-descriptions-item label="设备总数">1,024 台</el-descriptions-item>
            <el-descriptions-item label="在线率">
              <el-tag type="success">98.5%</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="平均管网压力">0.42 MPa</el-descriptions-item>
            <el-descriptions-item label="今日告警">
              <span style="color: red">12 条</span>
            </el-descriptions-item>
          </el-descriptions>

          <el-descriptions v-else border :column="2">
            <el-descriptions-item label="管网压力">{{ monitor.device?.pressure }}</el-descriptions-item>
            <el-descriptions-item label="信号强度">{{ monitor.device?.signal }}</el-descriptions-item>
            <el-descriptions-item label="电池电压">{{ monitor.device?.voltage }}</el-descriptions-item>
            <el-descriptions-item label="最后上报">刚刚</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-card>
      <template #header>
        {{ isAdmin ? 'S 级全域用水大数据分析' : '基于时序建模的个人用水习惯分析 (15min级)' }}
      </template>
      <div ref="chartRef" style="height: 400px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { useDark } from '@vueuse/core'

// 如果 api/service.js 没有导出 getMonitorData，您可以暂时注释掉 import 并使用下面的模拟数据
// import api from '@/api/service' 

const chartRef = ref(null)
const monitor = ref({})
const colors = [{ color: '#67c23a', percentage: 40 }, { color: '#f56c6c', percentage: 80 }]
const isDark = useDark()
let myChart = null

// 监听主题变化，更新图表
watch(isDark, () => {
  if (myChart) {
    myChart.dispose()
    if (isAdmin.value) initAdminChart()
    else initUserChart(monitor.value)
  }
})

// 获取当前角色
const userRole = localStorage.getItem('userRole') || 'user'
const isAdmin = computed(() => userRole === 'admin')

onMounted(async () => {
  // 模拟数据获取 (实际项目中请根据 userRole 调用不同 API)
  if (isAdmin.value) {
    // --- 管理员数据模拟 ---
    monitor.value = {
      // 管理员不需要单个 leakRisk 值，这里留空或用于其他逻辑
    }
    initAdminChart()
  } else {
    // --- 普通用户数据模拟 ---
    // const data = await api.getMonitorData() // 如果有真实API
    const data = {
      leakRisk: 15,
      device: { pressure: '0.35 MPa', signal: '-75 dBm', voltage: '3.6V' },
      times: ['08:00', '08:15', '08:30', '08:45', '09:00'],
      flowRates: [120, 132, 101, 134, 90],
      totalUsage: [220, 230, 240, 250, 260]
    }
    monitor.value = data
    initUserChart(data)
  }
})

// 初始化用户图表 (个人视角)
const initUserChart = (data) => {
  myChart = echarts.init(chartRef.value, isDark.value ? 'dark' : undefined)
  myChart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    legend: { data: ['瞬时流速', '累计用水'] },
    xAxis: { type: 'category', data: data.times },
    yAxis: [
      { type: 'value', name: '流速 (L/h)' },
      { type: 'value', name: '累计 (m³)' }
    ],
    series: [
      { name: '瞬时流速', type: 'line', smooth: true, data: data.flowRates, areaStyle: {} },
      { name: '累计用水', type: 'bar', yAxisIndex: 1, data: data.totalUsage }
    ]
  })
}

// 初始化管理员图表 (S级全域视角)
const initAdminChart = () => {
  // 使用 'dark' 主题或默认主题
  myChart = echarts.init(chartRef.value, isDark.value ? 'dark' : undefined)
  // 手动把背景设为透明，否则 'dark' 主题自带黑色背景可能与卡片颜色不一致
  const bgColor = 'transparent'
  
  myChart.setOption({
    backgroundColor: bgColor,
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
    legend: { 
      data: ['居民区总量', '商业区总量', '工业区总量', '市政绿化', '漏损预测'],
      top: '0%', // 放在顶部
      icon: 'circle'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [{ type: 'value', name: '总用水量 (万吨)' }],
    series: [
      {
        name: '居民区总量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(128, 255, 165)' }, { offset: 1, color: 'rgb(1, 191, 236)' }]) },
        emphasis: { focus: 'series' },
        data: [140, 232, 101, 264, 90, 340, 250]
      },
      {
        name: '商业区总量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(0, 221, 255)' }, { offset: 1, color: 'rgb(77, 119, 255)' }]) },
        emphasis: { focus: 'series' },
        data: [120, 282, 111, 234, 220, 340, 310]
      },
      {
        name: '工业区总量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(55, 162, 255)' }, { offset: 1, color: 'rgb(116, 21, 219)' }]) },
        emphasis: { focus: 'series' },
        data: [320, 132, 201, 334, 190, 130, 220]
      },
      {
        name: '市政绿化',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: { opacity: 0.8, color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(255, 191, 0)' }, { offset: 1, color: 'rgb(224, 62, 76)' }]) },
        emphasis: { focus: 'series' },
        data: [220, 402, 231, 134, 190, 230, 120]
      },
      {
        name: '漏损预测',
        type: 'line',
        smooth: true,
        data: [20, 32, 21, 54, 10, 20, 30],
        lineStyle: { type: 'dashed', color: '#FF0087' }
      }
    ]
  })
}
</script>

<style scoped>
.p-20 { padding: 20px; }
.mb-20 { margin-bottom: 20px; }
.mt-10 { margin-top: 10px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.center-content { text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }

/* 管理员风险统计样式 */
.admin-risk-stat { display: flex; flex-direction: column; align-items: center; }
.risk-num { font-size: 24px; font-weight: bold; color: #F56C6C; }
.risk-label { font-size: 12px; color: #909399; }
.risk-summary { font-size: 14px; color: #606266; text-align: left; }
</style>