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
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = reactive({
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
const store = useStore()
const handleLogin = () => {
  // console.log(loginForm.value) // Proxy {username: '123', password: '123'}
  // valid表示表单校验的有效性
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true // 按钮转圈圈
    // 调用vuex中user模块的loginSystem函数
    await store
      .dispatch('user/loginSystem', loginForm)
      .then((response) => {
        if (response === 10000) {
          ElMessage.success('登录成功!')
        } else if (response === 10010) {
          ElMessage.error('用户不存在')
        } else if (response === 10020) {
          ElMessage.error('密码错误')
        } else {
          ElMessage.error('error code:', response)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    loading.value = false
  })
}
</script>

<style scoped></style>
