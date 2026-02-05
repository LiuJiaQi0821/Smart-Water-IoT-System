<template>
  <el-tabs type="border-card">
    <!-- 用户与角色管理 -->
    <el-tab-pane label="用户与角色管理">
      <div class="toolbar mb-4">
        <el-button type="primary" icon="Plus">新增用户</el-button>
        <el-input v-model="search" placeholder="搜索用户" style="width: 200px; margin-left: 10px;" />
      </div>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag :type="getRoleType(scope.row.role)">{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default>
            <el-button link type="primary" size="small">权限设置</el-button>
            <el-button link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <!-- 操作管理与日志 (Req 6-5 操作管理模块) -->
    <el-tab-pane label="操作日志与反馈">
      <el-table :data="logList" stripe style="width: 100%">
        <el-table-column prop="time" label="操作时间" width="180" />
        <el-table-column prop="user" label="操作人" width="120" />
        <el-table-column prop="action" label="请求/操作内容" />
        <el-table-column prop="result" label="系统反馈/解决方案" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

// 模拟用户数据
const userList = ref([
  { username: 'admin', role: '管理员', status: '正常' },
  { username: 'repair_01', role: '维修人员', status: '执勤中' },
  { username: 'resident_102', role: '用水居民', status: '正常' },
])

// 模拟日志数据
const logList = ref([
  { time: '2023-10-27 10:00', user: 'resident_102', action: '报修漏水', result: '已生成工单 #GD2023102701' },
  { time: '2023-10-27 11:30', user: 'admin', action: '全网数据查询', result: '成功' }
])

const getRoleType = (role) => {
  if (role === '管理员') return 'danger'
  if (role === '维修人员') return 'warning'
  return 'success'
}
</script>

<style scoped>
.mb-4 { margin-bottom: 1rem; }
</style>