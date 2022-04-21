<template>
  <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div>
        <h3>用户登录</h3>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span>
          <el-icon>
            <avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="用户名"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span>
          <el-icon>
            <lock />
          </el-icon>
        </span>
        <el-input
          placeholder="密码"
          name="password"
          type="password"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" :loading="loading" @click="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { Avatar, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
// import axios from 'axios'
const loginForm = ref({
  username: '',
  password: ''
})

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名不能为空'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码不能为空'
    }
  ]
})

const loading = ref(false)

const loginFormRef = ref()
const handleLogin = () => {
  // valid表示表单校验的有效性
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true // 按钮转圈圈

    // await login(loginForm.value)
  })
}
</script>

<style scoped></style>
