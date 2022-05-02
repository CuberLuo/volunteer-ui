<template>
  <el-dialog
    title="修改密码"
    :model-value="modelValue"
    @close="closeDialog"
    width="30%"
  >
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleChange">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['update:modelValue'])
const closeDialog = () => {
  emits('update:modelValue', false)
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

const store = useStore()
const handleChange = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    await store
      .dispatch('user/changePsdSystem', ruleForm)
      .then((response) => {
        if (response === 10000) {
          ElMessage.success('修改密码成功')
          ruleFormRef.value.resetFields()
          closeDialog()
        } else if (response === 10010) {
          ElMessage.error('原密码不正确')
        } else if (response === 10020) {
          ElMessage.error('原密码和新密码相同')
        } else {
          ElMessage.error('error code:', response.code)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    loading.value = false
  })
}
</script>

<style>
.el-dialog__footer {
  padding-top: 0;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
