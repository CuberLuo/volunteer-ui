<template>
  <el-dialog
    :model-value="modelValue"
    @close="closeDialog"
    @opened="requestData"
    width="50%"
  >
    <el-descriptions title="志愿活动详细信息" class="margin-top" :column="1" border>
      <template #extra>
        <el-button type="primary" @click="changeDialog">信息修改</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user />
            </el-icon>
            活动名称
          </div>
        </template>
        {{ aName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            活动编号
          </div>
        </template>
        {{ aId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <office-building />
            </el-icon>
            活动地址
          </div>
        </template>
        {{ aAddress }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <calendar />
            </el-icon>
            活动时间
          </div>
        </template>
        {{aDateTimeSta}} 至 {{aDateTimeEnd}}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getActivityInfoById } from '@/api/activity-manage'
import { OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'

const aName = ref('')
const aId = ref()
const aAddress = ref('')
const aDateTimeSta = ref('')
const aDateTimeEnd = ref('')
// const aStaDate = ref('')
// const aStaTime = ref('')
// const aEndDate = ref('')
// const aEndTime = ref('')

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  activityId: {
    type: Number,
    required: true
  }
})

// 子组件返回一个方法让父组件来调用
// eslint-disable-next-line no-undef
const emits = defineEmits(['update:modelValue', 'setInfoChangeDialog'])

const closeDialog = () => {
  aName.value = ''
  aId.value = ''
  aAddress.value = ''
  // aStaDate.value = ''
  // aStaTime.value = ''
  // aEndDate.value = ''
  // aEndTime.value = ''
  aDateTimeSta.value = ''
  aDateTimeEnd.value = ''
  emits('update:modelValue', false)
}

// 将时间戳转化为时间
const timestampToTime = (timestamp) => {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  const s = date.getSeconds()
  return Y + M + D + h + m + s
}

let infoObj = {}
const requestData = () => {
  getActivityInfoById(props.userId)
    .then((response) => {
      aName.value = response.data.info.name
      aId.value = response.data.info.id
      aAddress.value = response.data.info.address
      aDateTimeSta.value = timestampToTime(response.data.info.dateTime[0])
      aDateTimeEnd.value = timestampToTime(response.data.info.dateTime[1])
      // aDateTime.value = response.data.info.dateTime
      // aStaDate.value = response.data.info.aStaDate
      // aStaTime.value = response.data.info.aStaTime
      // aEndDate.value = response.data.info.aEndDate
      // aEndTime.value = response.data.info.aEndTime
      infoObj = response.data.info
    })
    .catch((error) => {
      console.log(error)
    })
}

const changeDialog = () => {
  closeDialog()
  emits('setInfoChangeDialog', true, infoObj)
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
