<template>
  <el-dialog
    title="Excel导出"
    :model-value="modelValue"
    @close="closeDialog"
    width="40%"
  >
    <el-form ref="exportFormRef" :model="exportForm" :rules="exportRules">
      <el-form-item prop="excelName">
        <el-input
          v-model="exportForm.excelName"
          type="text"
          name="excelName"
          placeholder="导出文件名"
          maxlength="30"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleExport" :loading="loading"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getAllActivityList } from '@/api/activity-manage'
const exportFormRef = ref()
const exportForm = reactive({
  excelName: ''
})
const exportRules = reactive({
  excelName: [
    {
      required: true,
      trigger: 'blur',
      message: '导出文件名不能为空'
    }
  ]
})

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
const handleExport = () => {
  exportFormRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    const allActivity = (await getAllActivityList()).data.list
    // console.log(allVolunteer)
    // 动态导入Export2Excel
    const excel = await import('@/utils/Export2Excel')
    const data = formatJson(allActivity)
    // console.log(data)
    excel.export_json_to_excel({
      // excel 表头
      header: [
        '志愿活动编号',
        '活动名称',
        '活动时间',
        '活动地点'
      ],
      // excel 数据（二维数组结构）
      data,
      // 文件名称
      filename: exportForm.excelName,
      // 是否自动列宽
      autoWidth: true,
      // 文件类型
      bookType: 'xlsx'
    })
    loading.value = false
    exportFormRef.value.resetFields()
    closeDialog()
  })
}

// [{ username: '张三'},{},{}]  => [['张三'],[],[]]
const formatJson = (rows) => rows.map((item) => Object.values(item))
</script>

<style scoped></style>
