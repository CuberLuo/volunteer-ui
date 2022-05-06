<template>
  <el-dialog
    title="志愿活动详细信息"
    :model-value="modelValue"
    @close="closeDialog"
    @opened="requestData"
    width="50%"
  >
  <el-descriptions
    class="margin-top"
    :column="1"
    :size="size"
    border
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          活动名称
        </div>
      </template>
      {{aName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          活动编号
        </div>
      </template>
      {{aId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          活动地址
        </div>
      </template>
      {{aAddress}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <calendar />
          </el-icon>
          活动时间
        </div>
      </template>
      {{aDateTime}}
    </el-descriptions-item>
  </el-descriptions>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { getActivityInfoById } from '@/api/activity-manage'
import { ElMessage } from 'element-plus'
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
  Connection
} from '@element-plus/icons-vue'

const aName = ref('')
const aId = ref()
const aAddress = ref('')
const aDateTime = ref('')

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
  aName.value = ''
  aId.value = ''
  aAddress.value = ''
  aDateTime.value = ''
  emits('update:modelValue', false)
}

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px'
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px'
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default
  }
})

let infoObj = {}
const requestData = () => {
  getActivityInfoById(props.userId)
    .then((response) => {
      aName.value = response.data.info.name
      aId.value = response.data.info.id
      aAddress.value = response.data.info.address
      aDateTime.value = response.data.info.birthDate
      infoObj = response.data.info
    })
    .catch((error) => {
      console.log(error)
    })
}

</script>

<style scoped>
.genderSelect {
  width: 100%;
}
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
