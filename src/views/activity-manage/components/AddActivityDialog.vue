<template>
  <el-dialog
    title="志愿活动添加"
    :model-value="modelValue"
    @close="closeDialog"
    width="80%"
  >
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="addRules"
      label-width="100px"
    >
      <el-form-item label="活动名称" prop="aName">
        <el-input name="aName" v-model="addForm.aName" maxlength="20" />
      </el-form-item>
      <el-form-item name="aIndex" label="活动编号" prop="aIndex">
        <el-input v-model="addForm.aIndex" />
      </el-form-item>
      <el-form-item name="aAddress" label="活动地点" prop="aAddress">
        <el-input v-model="addForm.aAddress" />
      </el-form-item>

      <el-form-item name="aStaDate" label="活动时间" prop="aSta">
      <el-col :span="5">
        <el-date-picker
          v-model="addForm.aStaDate"
          type="date"
          placeholder="选择活动开始日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="5">
        <el-time-picker
          v-model="addForm.aStaTime"
          placeholder="选择活动开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="1" class="text-center">
        <span class="text-gray-500"><span v-html="'\u00a0\u00a0'"></span>-----</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="addForm.aEndDate"
          type="date"
          placeholder="选择活动结束日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="5">
        <el-time-picker
          v-model="addForm.aEndTime"
          placeholder="选择活动结束时间"
          style="width: 100%"
        />
      </el-col>
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
import { ref, reactive } from 'vue'
import { addActivity } from '@/api/activity-manage'
import { ElMessage } from 'element-plus'

const addForm = reactive({
  aName: '',
  aIndex: '',
  aAddress: '',
  aStaDate: '',
  aStaTime: '',
  aEndDate: '',
  aEndTime: ''
})
const addFormRef = ref()

const addRules = reactive({
  aName: [
    {
      required: true,
      trigger: 'blur',
      message: '活动名称不能为空'
    }
  ],
  aIndex: [
    {
      required: true,
      trigger: 'blur',
      message: '活动编号不能为空'
    }
  ],
  aAddress: [
    {
      required: true,
      trigger: 'blur',
      message: '活动地址不能为空'
    }
  ],
  aSta: [
    {
      required: true,
      trigger: 'blur',
      message: '活动时间不能为空'
    }
  ]

})

const loading = ref(false)

const handleAdd = () => {
  addFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    await addActivity(addForm).then((response) => {
      if (response.code === 10000) {
        ElMessage.success('活动添加成功')
        addFormRef.value.resetFields()
      } else if (response.code === 10010) {
        ElMessage.error('活动已存在')
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
