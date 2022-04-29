<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#5d6368"
    class="el-menu-vertical-demo"
    :default-active="path"
    text-color="#fff"
    :unique-opened="true"
    router
  >
    <el-menu-item index="/about">
      <el-icon><home-filled /></el-icon>
      <span>项目介绍</span>
    </el-menu-item>
    <el-sub-menu index="系统管理">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/volunteer-manage">
        <el-icon><document /></el-icon>
        <span>志愿者管理</span>
      </el-menu-item>
      <el-menu-item index="/activity-manage">
        <el-icon><document /></el-icon>
        <span>志愿活动管理</span>
      </el-menu-item>
      <el-menu-item index="/check-volunteer">
        <el-icon><document /></el-icon>
        <span>志愿者审核</span>
      </el-menu-item>
      <el-menu-item index="/volunteer-blacklist">
        <el-icon><document /></el-icon>
        <span>志愿者黑名单</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { Document, Setting, HomeFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { path } = route // 当前路由的路径path
// route是Proxy对象, path是ComputedRefImpl对象
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>
