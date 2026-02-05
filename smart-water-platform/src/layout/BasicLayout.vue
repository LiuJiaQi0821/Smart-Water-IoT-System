<template>
  <el-container class="layout-container">
    <el-aside width="220px" class="aside">
      <div class="logo">智慧水务平台</div>
      <el-menu
        router
        :default-active="$route.path"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard">
          <span>智能决策看板</span>
        </el-menu-item>
        <el-menu-item index="/habit-analysis">
          <span>用水习惯分析</span>
        </el-menu-item>
        <el-menu-item index="/leak-detection">
          <span>管网滴漏检测</span>
        </el-menu-item>
        <el-menu-item index="/system">
          <span>系统分级管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="breadcrumb">{{ $route.meta.title }}</div>
        <div class="user-info">管理员 | 退出</div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container { height: 100vh; }
.aside { background-color: #001529; .logo { height: 60px; line-height: 60px; color: #fff; text-align: center; font-size: 18px; font-weight: bold; } }
.header { background: #fff; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
.main { background-color: #f0f2f5; padding: 20px; }
</style>