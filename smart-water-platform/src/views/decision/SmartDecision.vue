<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 顶部关键指标 (Req 6-6 感知数据显示) -->
      <el-col :span="6" v-for="item in kpiList" :key="item.label">
        <el-card shadow="hover" class="kpi-card">
          <template #header>
            <div class="card-header">
              <span>{{ item.label }}</span>
              <el-tag :type="item.statusType">{{ item.status }}</el-tag>
            </div>
          </template>
          <div class="kpi-value">{{ item.value }} <span class="unit">{{ item.unit }}</span></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <!-- 左侧：管网运行态势 (ECharts) -->
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between">
              <span>实时管网压力与流量监测</span>
              <el-button size="small" type="primary" plain>搜索查询</el-button> <!-- Req 6-2 -->
            </div>
          </template>
          <div ref="mainChartRef" style="height: 400px;"></div>
        </el-card>
      </el-col>

      <!-- 右侧：智能决策模块 (Req 6-4) -->
      <el-col :span="8">
        <el-card shadow="hover" class="decision-card">
          <template #header>
            <span>智能决策中心</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity,RPIndex) in decisionLogs"
              :key="RPIndex"
              :type="activity.type"
              :timestamp="activity.timestamp"
            >
              <h4>{{ activity.title }}</h4>
              <p>{{ activity.content }}</p>
              <el-button v-if="activity.action" size="small" type="primary" link>生成维修工单</el-button>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 模拟KPI数据 (Req 6-6)
const kpiList = ref([
  { label: '实时总用水量', value: '4,231', unit: 'm³', status: '正常', statusType: 'success' },
  { label: '管网平均压力', value: '0.42', unit: 'MPa', status: '波动', statusType: 'warning' },
  { label: '滴漏风险指数', value: 'Low', unit: 'Level', status: '安全', statusType: 'success' },
  { label: '在线终端数', value: '12,045', unit: '个', status: '99%', statusType: 'primary' },
])

// 智能决策日志 (Req 6-4)
const decisionLogs = ref([
  { title: '管网安全告警', content: 'A区03号节点检测到异常振动，疑似微小渗漏。', timestamp: '2023-10-27 14:23', type: 'danger', action: true },
  { title: '终端安全扫描', content: '完成全网1.2万个水表终端固件安全检查，未发现入侵威胁。', timestamp: '2023-10-27 12:00', type: 'success' },
  { title: '维修调度建议', content: '建议优先处理B区阀门老化问题，预计节约水量50m³/天。', timestamp: '2023-10-27 09:15', type: 'warning', action: true },
])

const mainChartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(mainChartRef.value)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['瞬时流量', '管道压力'] },
    xAxis: { type: 'category', data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] },
    yAxis: [
      { type: 'value', name: '流量 (m³/h)' },
      { type: 'value', name: '压力 (MPa)' }
    ],
    series: [
      { name: '瞬时流量', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230], areaStyle: {} },
      { name: '管道压力', type: 'line', smooth: true, yAxisIndex: 1, data: [0.4, 0.42, 0.38, 0.45, 0.41, 0.39] }
    ]
  })
})
</script>

<style lang="scss" scoped>
.mt-20 { margin-top: 20px; }
.kpi-value { font-size: 24px; font-weight: bold; .unit { font-size: 12px; color: #999; } }
.decision-card { height: 500px; overflow-y: auto; }
</style>