<template>
<body>
  <div class="bg">
  <div id="login-box">
    <img src="../../assets/system-icon.png" width="300" height="100">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div>
        <h2>登录</h2>
      </div>
      <!-- username -->
      <div class="input-box">
      <el-form-item prop="username">
        <el-input
          class="input"
          placeholder="用户名"
          prefix-icon="avatar"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      </div>
      <!-- password -->
      <div class="input-box">
      <el-form-item prop="password">
        <el-input
          class="input"
          placeholder="密码"
          prefix-icon="lock"
          name="password"
          type="password"
          v-model="loginForm.password"
          width="10px"
        ></el-input>
      </el-form-item>
      </div>
      <!-- 登录按钮 -->
      <el-button class='bt' type="primary" :loading="loading" @click="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
  </div>
</body>
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

<style scoped>
html{
  height:100%;
}
body{
  margin:0;
  padding:0;
}
h2{
	padding-top: 10px;
	color: #ac97ea;
  font-size: "黑体";
  margin-bottom: 30px;
}
div.bg{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:url('../../assets/login_bg.jpg') no-repeat center 0;
  background-size:cover;
}
#login-box{
	background-color: #f6f0f068;
	border-radius: 13px;
	text-align: center;
	margin: auto;
	margin-top: 100px;
	width: 400px;
	height: 420px;
}

.input {
	border: none;
  width: 335px;
	background: none;
	padding: 5px 10px;
  margin: auto;
	outline: none;
	color: #fcfefb;
}

.bt{
	line-height:30px;
	margin-top: 30px;
	width: 130px;
	height: 30px;
	border-radius:13px ;
	outline: none;
	border: none;
	background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
	color: #FFFFFF;
}

.bt:hover{
	background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}
.el-form-item>>> .el-form-item__error{
  color: #e6a23c;
  margin: auto;
  left: 12%;
  top: 100%;
  padding-top: 4px;
  position: absolute;
  border-color: #e6a23c;
}
 .el-form-item>>> .el-form-item.is-error .el-input__inner {
  border-color: #e6a23c;
}

</style>
