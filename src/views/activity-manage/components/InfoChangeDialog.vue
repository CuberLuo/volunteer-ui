<template>
  <el-dialog
    title="志愿活动信息修改"
    :model-value="modelValue"
    @close="closeDialog"
    @opened="initForm"
    width="80%"
  >
    <el-form
      ref="infoChangeFormRef"
      :model="infoChangeForm"
      :rules="changeRules"
      label-width="100px"
    >
      <el-form-item label="活动名称" prop="aName">
        <el-input name="aName" v-model="infoChangeForm.aName" maxlength="20" />
      </el-form-item>
      <el-form-item name="vAddress" label="活动地点" prop="aAddress">
        <el-input v-model="infoChangeForm.aAddress" maxlength="50" />
      </el-form-item>
      <el-form-item name="aDateTime" label="活动时间" prop="aDateTime">
      <el-col :span="5">
        <el-date-picker
          v-model="infoChangeForm.aDateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="活动开始时间"
          end-placeholder="活动结束时间"
          format="YYYY/MM/DD hh:mm:ss"
          value-format="x"
        />
      </el-col>
      <!-- <el-col :span="5">
        <el-date-picker
          v-model="infoChangeForm.aStaDate"
          type="date"
          placeholder="选择活动开始日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="5">
        <el-time-picker
          v-model="infoChangeForm.aStaTime"
          placeholder="选择活动开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="1" class="text-center">
        <span class="text-gray-500"><span v-html="'\u00a0\u00a0'"></span>-----</span>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="infoChangeForm.aEndDate"
          type="date"
          placeholder="选择活动结束日期"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="5">
        <el-time-picker
          v-model="infoChangeForm.aEndTime"
          placeholder="选择活动结束时间"
          style="width: 100%"
        />
      </el-col> -->
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleChange" :loading="loading"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  changeActivityInfo
} from '@/api/activity-manage'

const infoChangeForm = reactive({
  aName: '',
  aAddress: '',
  aDateTime: []
  // aStaDate: '',
  // aStaTime: '',
  // aEndDate: '',
  // aEndTime: ''
})
const infoChangeFormRef = ref()

const changeRules = reactive({
  aName: [
    {
      required: true,
      trigger: 'blur',
      message: '活动名称不能为空'
    }
  ],
  aAddress: [
    {
      required: true,
      trigger: 'blur',
      message: '活动地点不能为空'
    }
  ],
  aDateTime: [
    {
      required: true,
      trigger: 'change',
      message: '活动时间不能为空'
    }
  ]
})
const options = ref([])

const loading = ref(false)

const handleChange = () => {
  infoChangeFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    await changeActivityInfo(infoChangeForm).then((response) => {
      if (response.code === 10000) {
        ElMessage.success('修改成功')
        closeDialog()
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
  },
  infoObj: {
    type: Object,
    required: true
  }
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['update:modelValue'])

const closeDialog = () => {
  infoChangeFormRef.value.resetFields()
  emits('update:modelValue', false)
}

const initForm = () => {
  infoChangeForm.aName = props.infoObj.aName
  infoChangeForm.aAddress = props.infoObj.aAddress
  infoChangeForm.aDateTime = props.infoObj.aDateTime
}
</script>

<style scoped>
.genderSelect,
.spaceSelect {
  width: 100%;
}
</style>
