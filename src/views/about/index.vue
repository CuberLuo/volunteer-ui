<template>
  <div>
    <el-card class="about-main">
      <div class="txt-introduce">
        <span>亚运会志愿者管理项目介绍</span>
        <div>
          该项目旨在为亚运会提供一套便捷式的志愿者管理平台，
          管理各个志愿者的信息，提高管理人员和分配相应任务的效率
        </div>
        <div>项目分为志愿者管理和系统管理</div>
        <div>前端: Vue</div>
        <div>后端: PHP + MYSQL</div>
      </div>

      <el-image :src="src" class="about-img">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </el-card>
  </div>
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
const src = require('@/assets/tech_img.png')
</script>

<style scoped>
.about-main {
  position: relative;
  height: 700px;
  width: 100%;
}

.about-img {
  position: absolute;
  right: 0;
  width: 750px;
  height: 100%;
}

.txt-introduce {
  position: absolute;
  left: 0;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 80px;
}
</style>
