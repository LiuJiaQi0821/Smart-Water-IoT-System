<template>
  <div class="p-20">
    <div class="header">
      <h2>全网安全态势感知</h2>
      <div>
        <el-button type="warning" @click="$router.push('/decision')">进入智能决策中心</el-button>
        <el-button type="info" @click="$router.push('/login')">退出</el-button>
      </div>
    </div>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>漏损风险评估 (AI模型)</template>
          <div class="center-content">
            <el-progress type="dashboard" :percentage="monitor.leakRisk" :color="colors" />
            <p>{{ monitor.leakRisk > 80 ? '高危滴漏风险' : '正常' }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>终端实时感知</template>
          <el-descriptions border :column="2">
            <el-descriptions-item label="管网压力">{{ monitor.device?.pressure }}</el-descriptions-item>
            <el-descriptions-item label="信号强度">{{ monitor.device?.signal }}</el-descriptions-item>
            <el-descriptions-item label="电池电压">{{ monitor.device?.voltage }}</el-descriptions-item>
            <el-descriptions-item label="最后上报">刚刚</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

    <el-card>
      <template #header>基于时序建模的用水习惯分析 (15min级)</template>
      <div ref="chartRef" style="height: 400px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import api from '@/api/service'

const chartRef = ref(null)
const monitor = ref({})
const colors = [{ color: '#67c23a', percentage: 40 }, { color: '#f56c6c', percentage: 80 }]

onMounted(async () => {
  const data = await api.getMonitorData()
  monitor.value = data
  
  // 初始化 ECharts
  const myChart = echarts.init(chartRef.value)
  myChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['瞬时流速', '累计用水'] },
    xAxis: { type: 'category', data: data.times },
    yAxis: [
      { type: 'value', name: '流速 (m³/h)' },
      { type: 'value', name: '累计 (m³)' }
    ],
    series: [
      { name: '瞬时流速', type: 'line', smooth: true, data: data.flowRates },
      { name: '累计用水', type: 'bar', yAxisIndex: 1, data: data.totalUsage }
    ]
  })
})
</script>

<style scoped>
.p-20 { padding: 20px; }
.mb-20 { margin-bottom: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.center-content { text-align: center; }
</style>