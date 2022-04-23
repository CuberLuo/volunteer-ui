<template>
  <el-container class="layout-container-demo">
    <!-- 左侧菜单栏 -->
    <el-aside width="200px">
      <el-scrollbar>
        <Sidebar />
      </el-scrollbar>
    </el-aside>
    <!-- 右边主容器 -->
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header>
        <Navbar />
      </el-header>
      <!-- 页面主内容 -->
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
</script>

<style scoped>
.layout-container-demo {
  height: 100%;
}

.layout-container-demo .el-aside {
  background: #545c64;
}

.el-header {
  padding: 0;
  text-align: right;
}
</style>
