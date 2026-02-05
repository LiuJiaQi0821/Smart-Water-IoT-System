<template>
  <div class="dashboard-container">
    <div class="header">
      <div class="title">安全监测与智能决策平台</div>
      <div class="right-panel">
        <el-input 
          v-model="searchQuery" 
          placeholder="搜索区域 / 异常事件..." 
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #append><el-button :icon="Search" @click="handleSearch" /></template>
        </el-input>
        <el-button type="danger" plain @click="$router.push('/decision')">进入决策中心</el-button>
        <el-button type="info" text @click="logout">退出</el-button>
      </div>
    </div>

    <div class="main-content">
      <el-row :gutter="20" class="cards-row">
        <el-col :span="6">
          <el-card shadow="hover" class="data-card risk-card">
            <template #header><span>深度学习漏损检测 (DMA-03)</span></template>
            <div class="card-body">
              <el-progress type="dashboard" :percentage="monitorData.leakRisk" :color="riskColors" />
              <p class="status-text">
                状态: {{ monitorData.leakRisk > 80 ? '高危滴漏' : '正常' }}
              </p>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <template #header><span>终端设备状态</span></template>
            <div class="info-list">
              <div class="info-item">
                <span>电池电压</span>
                <span class="value">{{ monitorData.voltage }}</span>
              </div>
              <div class="info-item">
                <span>管网压力</span>
                <span class="value">{{ monitorData.pressure }} MPa</span>
              </div>
              <div class="info-item">
                <span>信号强度</span>
                <span class="value">-85 dBm</span>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
           <el-card shadow="hover" class="data-card">
             <template #header><span>模型运行日志</span></template>
             <el-scrollbar height="120px">
               <p class="log-item">[10:00:01] 接收智能水表终端数据包...完成</p>
               <p class="log-item">[10:00:02] 加载气象数据与人口结构参数...完成</p>
               <p class="log-item">[10:00:05] 时序模型分析：瞬时流量波动在正常范围内。</p>
               <p class="log-item error">[10:00:08] 滴漏检测算法：检测到微小持续声波信号，风险值上升。</p>
             </el-scrollbar>
           </el-card>
        </el-col>
      </el-row>

      <el-card class="chart-container">
        <template #header>
          <div class="chart-header">
            <span>实时用水量时序分析 (15min级)</span>
            <el-tag size="small">实时更新</el-tag>
          </div>
        </template>
        <div ref="chartRef" style="width: 100%; height: 400px;"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import api from '@/API/Service'

const router = useRouter()
const searchQuery = ref('')
const chartRef = ref(null)
const monitorData = reactive({
  leakRisk: 0,
  voltage: '',
  pressure: 0
})

const riskColors = [
  { color: '#67C23A', percentage: 30 },
  { color: '#E6A23C', percentage: 70 },
  { color: '#F56C6C', percentage: 100 },
]

// 初始化图表 (需求④)
const initChart = (data) => {
  const myChart = echarts.init(chartRef.value)
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['瞬时流速 (m³/h)', '累计用水量 (m³)'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.times
    },
    yAxis: [
      { type: 'value', name: '流速', position: 'left' },
      { type: 'value', name: '累计', position: 'right' }
    ],
    series: [
      {
        name: '瞬时流速 (m³/h)',
        type: 'line',
        smooth: true,
        data: data.flowRates,
        lineStyle: { color: '#409EFF' },
        areaStyle: { opacity: 0.2, color: '#409EFF' }
      },
      {
        name: '累计用水量 (m³)',
        type: 'bar',
        yAxisIndex: 1,
        data: data.totalUsage,
        itemStyle: { color: '#67C23A' }
      }
    ]
  }
  myChart.setOption(option)
  
  // 响应式大小
  window.addEventListener('resize', () => myChart.resize())
}

const fetchData = async () => {
  const res = await api.getMonitorData()
  if (res.code === 200) {
    monitorData.leakRisk = res.data.leakRisk
    monitorData.voltage = res.data.voltage
    monitorData.pressure = res.data.pressure
    initChart(res.data)
  }
}

const handleSearch = async () => {
  if (!searchQuery.value) return
  const res = await api.search(searchQuery.value)
  alert(res.msg)
}

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.dashboard-container { min-height: 100vh; background-color: #f0f2f5; }
.header {
  background: #001529;
  color: white;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title { font-size: 20px; font-weight: bold; }
.right-panel { display: flex; align-items: center; gap: 15px; }
.search-input { width: 250px; }
.main-content { padding: 20px; }
.cards-row { margin-bottom: 20px; }
.data-card { height: 220px; }
.card-body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; }
.status-text { margin-top: 10px; font-weight: bold; color: #333; }
.info-item { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.info-item .value { font-weight: bold; color: #409EFF; }
.log-item { font-size: 13px; color: #666; margin-bottom: 5px; }
.log-item.error { color: #F56C6C; }
</style>