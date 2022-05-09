<template>
  <div>
    <el-card class="about-main">
      <div class="txt-introduce">
        <p class="title">亚运会志愿者管理项目介绍</p>
        <div class="project-target">
          <strong>
            该项目旨在为亚运会提供一套便捷式的志愿者管理平台 <br />
            管理各个志愿者的信息，提高管理人员和分配相应任务的效率
          </strong>
        </div>

        <div class="techBox">
          <div>
            前端:
            <span class="vueSpan">Vue </span>+
            <span class="eleSpan">Element Plus</span>
          </div>
          <div>
            后端: <span class="phpSpan">PHP</span> +
            <span class="mysqlSpan">MYSQL</span>
          </div>
        </div>
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
  right: -80px;
  width: 750px;
  height: 100%;
}

.txt-introduce {
  position: absolute;
  left: 20px;
  height: 100%;
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

.title {
  /* 华文行楷 */
  font-family: STXingkai;
  font-size: 40px;
  margin-top: 20px;
}

.project-target {
  /* 仿宋 */
  font-family: FangSong;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
}

.techBox {
  font-size: 40px;
  margin-top: 120px;
}

.vueSpan {
  background: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
}

.eleSpan {
  background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}

.phpSpan {
  background: linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%);
}

.mysqlSpan {
  background: linear-gradient(to top, #e14fad 0%, #f9d423 100%);
}

.vueSpan,
.eleSpan,
.phpSpan,
.mysqlSpan {
  -webkit-background-clip: text;
  color: transparent;
}

.projectDivide {
  font-size: 18px;
  margin-left: 90px;
}
</style>
