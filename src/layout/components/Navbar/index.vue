<template>
  <div class="navbar">
    <el-dropdown>
      <el-avatar :size="40" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item @click="showChangePsdDialog"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item divided @click="confirmExit"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <changePsdDialog v-model="dialogVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'
import changePsdDialog from './components/changePsdDialog'

const circleUrl = ref(
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fucc.alicdn.com%2Favatar%2F9cc3a0c84ecf45de95d7c0bb56d1105e.png&refer=http%3A%2F%2Fucc.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653312625&t=cb2404f47f4aa0a7c933caaa94c05641'
)

const store = useStore()
const logout = () => {
  store.dispatch('user/logoutSystem')
}
const confirmExit = () => {
  ElMessageBox.confirm('您确认要退出登录吗?', '登出确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logout()
    ElMessage.success('登出成功')
  })
}

const dialogVisible = ref(false)
const showChangePsdDialog = () => {
  dialogVisible.value = true
}
</script>

<style scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-dropdown {
  margin-top: 2px;
  margin-right: 40px;
  position: absolute;
  right: 0;
}

.el-avatar {
  --el-avatar-bg-color: none;
}
</style>
