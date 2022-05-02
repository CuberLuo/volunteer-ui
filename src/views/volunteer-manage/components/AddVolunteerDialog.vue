<template>
  <el-dialog
    title="志愿者添加"
    :model-value="modelValue"
    @close="closeDialog"
    width="40%"
  >
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addRules"
      label-width="100px"
    >
      <el-form-item label="姓名" prop="vName">
        <el-input name="vName" v-model="addForm.vName" maxlength="20" />
      </el-form-item>
      <el-form-item label="性别" prop="vGender">
        <el-select
          name="vGender"
          v-model="addForm.vGender"
          class="genderSelect"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item name="vIdCard" label="身份证号" prop="vIdCard">
        <el-input v-model="addForm.vIdCard" />
      </el-form-item>
      <el-form-item name="vPhone" label="手机号" prop="vPhone">
        <el-input v-model="addForm.vPhone" />
      </el-form-item>
      <el-form-item name="vAddress" label="家庭住址" prop="vAddress">
        <el-input v-model="addForm.vAddress" maxlength="50" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleAdd" :loading="loading"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { addVolunteer } from '@/api/volunteer-manage'
import { ElMessage } from 'element-plus'
import idCard from 'idcard' // 身份证号验证第三方库
import isMobilePhone from 'validator/lib/isMobilePhone' // 手机号验证第三方库

const addForm = ref({
  vName: '',
  vGender: '',
  vIdCard: '',
  vPhone: '',
  vAddress: ''
})
const addFormRef = ref()
const validateIdCard = (rule, value, callback) => {
  if (!idCard.verify(addForm.value.vIdCard)) {
    callback(new Error('身份证格式错误'))
  } else {
    callback()
  }
}
const validatePhone = (rule, value, callback) => {
  if (!isMobilePhone(addForm.value.vPhone, 'zh-CN')) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
const addRules = ref({
  vName: [
    {
      required: true,
      trigger: 'blur',
      message: '姓名不能为空'
    }
  ],
  vGender: [
    {
      required: true,
      trigger: 'change',
      message: '性别不能为空'
    }
  ],
  vIdCard: [
    {
      required: true,
      trigger: 'blur',
      message: '身份证号不能为空'
    },
    {
      validator: validateIdCard,
      trigger: 'blur'
    }
  ],
  vPhone: [
    {
      required: true,
      trigger: 'blur',
      message: '手机号不能为空'
    },
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  vAddress: [
    {
      required: true,
      trigger: 'blur',
      message: '家庭住址不能为空'
    }
  ]
})

const loading = ref(false)

const handleAdd = () => {
  addFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    await addVolunteer(addForm.value).then((response) => {
      if (response.code === 10000) {
        ElMessage.success('添加成功')
        addFormRef.value.resetFields()
      } else if (response.code === 10010) {
        ElMessage.error('志愿者身份证号已存在,不可重复添加')
      }
    })
    loading.value = false
  })
}

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
</script>

<style scoped>
.genderSelect {
  width: 100%;
}
</style>
