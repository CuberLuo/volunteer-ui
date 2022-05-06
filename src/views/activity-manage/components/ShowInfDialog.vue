<template>
  <el-dialog
    title="志愿活动详细信息"
    :model-value="modelValue"
    @close="closeDialog"
    @opened="requestData"
    width="50%"
  >
    <el-descriptions class="margin-top" :column="1" border>
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
        {{ aDateTime }}
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
