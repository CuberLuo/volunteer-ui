<template>
  <el-dialog
    title="志愿活动添加"
    :model-value="modelValue"
    @close="closeDialog"
    width="40%"
    top="25vh"
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

      <el-form-item name="aDateTime" label="活动时间" prop="aDateTime">
        <el-date-picker
          v-model="addForm.aDateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="活动开始时间"
          end-placeholder="活动结束时间"
          format="YYYY/MM/DD hh:mm:ss"
          value-format="x"
          class="date-picker"
        />
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
  aDateTime: ''
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
  aDateTime: [
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
        console.log(addForm.aDateTime)
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
.date-picker {
  width: 100%;
}
</style>
