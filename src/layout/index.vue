<template>
  <el-container class="layout-container-demo">
    <!-- 左侧菜单栏 -->
    <el-aside width="200px">
      <el-scrollbar>
        <div class="logo-container">
          <img src="../assets/system-icon.png" alt="system-icon" />
        </div>
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
  background: #5d6368;
}

.el-header {
  padding: 0;
  text-align: right;
}

.logo-container {
  width: 100%;
}
img {
  height: 100%;
  width: 100%;
}
</style>
