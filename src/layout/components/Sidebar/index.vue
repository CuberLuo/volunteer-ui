<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#5d6368"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
  >
    <el-menu-item index="1">
      <el-icon><home-filled /></el-icon>
      <span>项目介绍</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="1-1">
        <el-icon><document /></el-icon>
        <span>志愿者管理</span>
      </el-menu-item>
      <el-menu-item index="1-2">
        <el-icon><document /></el-icon>
        <span>志愿活动管理</span>
      </el-menu-item>
      <el-menu-item index="1-3">
        <el-icon><document /></el-icon>
        <span>志愿者审核</span>
      </el-menu-item>
      <el-menu-item index="1-4">
        <el-icon><document /></el-icon>
        <span>志愿者黑名单</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  HomeFilled
} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu {
  border: none;
}
</style>
