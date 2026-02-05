<template>
  <div class="leak-detection">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card header="DMA分区计量管理">
          <el-tree :data="dmaData" :props="defaultProps" default-expand-all highlight-current />
        </el-card>
        <el-card header="关键节点传感器数据" class="mt-20">
          <!-- Req 5: 采集压力、流量、振动、声波 -->
          <el-descriptions :column="1" border>
            <el-descriptions-item label="节点位置">泵站出口 A-01</el-descriptions-item>
            <el-descriptions-item label="管道压力">0.55 MPa</el-descriptions-item>
            <el-descriptions-item label="声波信号">
              <span class="text-green-500">正常 (20dB)</span>
            </el-descriptions-item>
            <el-descriptions-item label="振动频率">
              <span class="text-red-500">异常 (150Hz) - 疑似泄漏</span>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card header="多源数据融合检测模型可视化">
          <div class="model-visual-placeholder">
            <!-- 这里通常放拓扑图或热力图 -->
            <el-alert title="检测到 DMA-02 区域交界处存在高置信度滴漏风险" type="error" show-icon :closable="false" />
            <div ref="leakChart" style="height: 450px; margin-top: 20px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const dmaData = [
  {
    label: '一级分区 (供水厂)',
    children: [
      { label: '二级分区 (东城区)', children: [{ label: 'DMA-01 住宅区' }, { label: 'DMA-02 商业区' }] },
      { label: '二级分区 (西城区)' }
    ]
  }
]
const defaultProps = { children: 'children', label: 'label' }

const leakChart = ref(null)

onMounted(() => {
  const chart = echarts.init(leakChart.value)
  // 模拟漏损分析的热力图或波形图
  chart.setOption({
    title: { text: '声波与振动信号融合分析' },
    xAxis: { type: 'category', data: ['Sensor1', 'Sensor2', 'Sensor3', 'Sensor4'] },
    yAxis: { type: 'value' },
    series: [{
      data: [120, 200, 150, 80],
      type: 'scatter',
      symbolSize: function (data) { return data / 2; },
      itemStyle: { color: (params) => params.value > 180 ? '#F56C6C' : '#409EFF' }
    }]
  })
})
</script>

<style scoped>
.mt-20 { margin-top: 20px; }
</style>