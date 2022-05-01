<template>
  <div class="navbar">
    <el-dropdown>
      <el-avatar :size="40" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item @click="changePsd">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="confirmExit"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="dialogVisible" title="修改密码" width="30%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码：" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码：" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.checkPassword"></el-input>
        </el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleChange">
          确认
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'

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

const changePsd = () => {
  dialogVisible.value = true
}

const loading = ref(false)

const ruleFormRef = ref()
const ruleForm = reactive({
  password: '',
  newPassword: '',
  checkPassword: ''
})

const validatePass1 = (rule, value, callback) => {
  if (ruleForm.newPassword !== ruleForm.checkPassword) {
    callback(new Error('新密码不一致'))
  } else {
    callback()
  }
}

const rules = ref({
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '原密码不能为空'
    }
  ],
  newPassword: [
    {
      required: true,
      trigger: 'blur',
      message: '新密码不能为空'
    }
  ],
  checkPassword: [
    {
      required: true,
      trigger: 'blur',
      message: '必须再次确认密码'
    },
    {
      validator: validatePass1,
      trigger: 'blur'
    }
  ]
})

const handleChange = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    await store
      .dispatch('user/changePsdSystem', ruleForm)
      .then((response) => {
        if (response === 10000) {
          ElMessage.success('修改密码成功')
          dialogVisible.value = false
        } else if (response === 10010) {
          ElMessage.error('原密码不正确')
        } else if (response === 10020) {
          ElMessage.error('原密码和新密码相同')
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
  /* border: 2px solid red; */
}

.el-avatar {
  /* border: 1px solid var(--el-color-primary); */
  --el-avatar-bg-color: none;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
