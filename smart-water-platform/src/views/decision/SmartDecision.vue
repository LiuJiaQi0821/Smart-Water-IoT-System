<template>
  <div class="smart-decision">
    <el-row :gutter="20" class="mb-20">
      <el-col :span="6">
        <el-card shadow="always" class="data-card">
          <div class="stat-value text-danger">3</div>
          <div class="stat-label">待处理高危告警</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="data-card">
          <div class="stat-value text-success">98.5%</div>
          <div class="stat-label">全网健康度</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="data-card">
          <div class="stat-value text-primary">自动</div>
          <div class="stat-label">当前调度模式</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="data-card">
          <div class="stat-value">12</div>
          <div class="stat-label">今日AI优化次数</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="14">
        <el-card header="AI 智能决策建议" class="mb-20">
          <el-table :data="suggestions" stripe style="width: 100%">
            <el-table-column prop="type" label="事件类型" width="120">
              <template #default="scope">
                <el-tag :type="scope.row.level">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="问题描述" />
            <el-table-column prop="action" label="建议操作" />
            <el-table-column label="执行" width="100">
              <template #default>
                <el-button type="primary" size="small" plain>执行</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card header="调度日志">
           <el-timeline>
            <el-timeline-item timestamp="14:20" type="primary">
              AI 自动调节：东区加压泵站压力下调 0.02MPa (夜间低峰模式)
            </el-timeline-item>
            <el-timeline-item timestamp="12:00" type="success">
              系统自检：全网传感器在线率 100%
            </el-timeline-item>
            <el-timeline-item timestamp="09:15" type="warning">
              人工干预：关闭 A-03 区域检修阀门
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card header="远程控制中心">
          <div class="control-panel">
            <div class="control-group">
              <h4>区域阀门控制</h4>
              <div class="control-item">
                <span>DMA-01 总阀</span>
                <el-switch v-model="controls.valve1" active-text="开启" inactive-text="关闭" />
              </div>
              <div class="control-item">
                <span>DMA-02 旁路阀</span>
                <el-switch v-model="controls.valve2" active-text="开启" inactive-text="关闭" />
              </div>
            </div>

            <el-divider />

            <div class="control-group">
              <h4>泵站压力设定</h4>
              <div class="slider-block">
                <span>东区泵站 (MPa)</span>
                <el-slider v-model="controls.pressure1" :min="0" :max="1.0" :step="0.01" show-input />
              </div>
              <div class="slider-block">
                <span>西区泵站 (MPa)</span>
                <el-slider v-model="controls.pressure2" :min="0" :max="1.0" :step="0.01" show-input />
              </div>
            </div>
            
            <div class="mt-20">
               <el-button type="danger" style="width: 100%">紧急切断全网供水 (需授权)</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const controls = reactive({
  valve1: true,
  valve2: false,
  pressure1: 0.45,
  pressure2: 0.38
})

const suggestions = [
  { type: '漏损预警', desc: 'DMA-03 夜间最小流量异常升高', action: '推荐关闭支路阀门检修', level: 'danger' },
  { type: '能效优化', desc: '当前供水压力超过需求 15%', action: '建议降低泵站频率', level: 'warning' },
  { type: '水质异常', desc: '末端余氯浓度偏低', action: '增加次氯酸钠投放量', level: 'danger' },
]
</script>

<style scoped>
.mb-20 { margin-bottom: 20px; }
.mt-20 { margin-top: 20px; }
.data-card { text-align: center; padding: 10px 0; }
.stat-value { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
.stat-label { color: #909399; font-size: 14px; }
.text-danger { color: #F56C6C; }
.text-success { color: #67C23A; }
.text-primary { color: #409EFF; }

.control-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.slider-block { margin-bottom: 15px; }
.slider-block span { display: block; margin-bottom: 5px; color: #606266; }
</style>