<template>
  <div class="decision-container">
    <el-page-header @back="$router.back()" content="智能决策中心" title="返回" />
    
    <el-alert title="AI 引擎已根据管网震动与声波信号生成以下建议" type="info" show-icon style="margin: 20px 0" />

    <el-table :data="list" border stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column label="风险等级" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.level === 'high' ? 'danger' : 'warning'">{{ scope.row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="事件" />
      <el-table-column prop="suggestion" label="智能建议方案" />
      <el-table-column label="操作">
        <template #default>
          <el-button type="primary" size="small">生成工单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/service'

const list = ref([])
onMounted(async () => {
  list.value = await api.getDecisions()
})
</script>

<style scoped>
.decision-container { padding: 20px; background: white; min-height: 100vh; }
</style>