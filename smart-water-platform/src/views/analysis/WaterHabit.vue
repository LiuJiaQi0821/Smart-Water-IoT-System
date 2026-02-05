<template>
  <div class="habit-analysis">
    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <span>用水习惯多维分析建模</span>
          <el-form :inline="true" size="small">
             <!-- Req 4: 多源、异构数据输入层 -->
            <el-form-item label="居民结构">
              <el-select v-model="filters.population" placeholder="家庭规模">
                <el-option label="三口之家" value="3" />
                <el-option label="独居老人" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="外部因素">
              <el-checkbox-group v-model="filters.factors">
                <el-checkbox label="节假日" />
                <el-checkbox label="气象数据" />
              </el-checkbox-group>
            </el-form-item>
            <el-button type="primary" @click="analyze">开始建模分析</el-button>
          </el-form>
        </div>
      </template>

      <!-- Req 4: 时序数据展示 -->
      <div ref="chartRef" style="height: 500px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const filters = reactive({
  population: '3',
  factors: ['气象数据']
})

const chartRef = ref(null)
let myChart = null

const initChart = () => {
  myChart = echarts.init(chartRef.value)
  const option = {
    title: { text: '15分钟级瞬时流量与累计用水量趋势' },
    tooltip: { trigger: 'axis' },
    dataset: {
      // 模拟多维数据源
      source: [
        ['product', '瞬时流速', '累计用水', '预测基线'],
        ['08:00', 43.3, 85.8, 40.1],
        ['08:15', 83.1, 73.4, 80.5],
        ['08:30', 86.4, 65.2, 82.2],
        ['08:45', 72.4, 53.9, 70.0],
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      { type: 'bar' },
      { type: 'bar' },
      { type: 'line', smooth: true, lineStyle: { type: 'dashed' } }
    ]
  }
  myChart.setOption(option)
}

const analyze = () => {
  // 这里调用后端算法接口
  console.log('基于深度学习进行时序建模...', filters)
}

onMounted(() => {
  initChart()
})
</script>