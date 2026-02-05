<template>
  <div class="admin-page">
    <h2>系统分级管理</h2>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <el-button type="primary" style="margin-bottom: 15px;">新增管理员</el-button>
        <el-table :data="users" border>
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="role" label="角色" />
          <el-table-column label="操作"><el-button link type="primary">编辑</el-button></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="操作日志">
        <el-timeline>
          <el-timeline-item timestamp="2023-10-27" placement="top">
            <el-card><h4>管理员 执行了全网数据查询</h4></el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const users = ref([{ name: 'Admin', role: '超级管理员' }, { name: 'User_01', role: '普通居民' }])
</script>

<style scoped>
.admin-page { padding: 20px; }
</style>