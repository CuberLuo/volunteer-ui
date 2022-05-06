<template>
  <el-dialog
    :model-value="modelValue"
    @close="closeDialog"
    @opened="requestData"
    width="60%"
  >
    <el-descriptions
      class="margin-top"
      title="志愿者详细信息"
      :column="1"
      border
    >
      <template #extra>
        <el-button type="primary" @click="changeDialog">信息修改</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user />
            </el-icon>
            姓名
          </div>
        </template>
        {{ vName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <tickets />
            </el-icon>
            志愿者号
          </div>
        </template>
        {{ vId }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <connection />
            </el-icon>
            性别
          </div>
        </template>
        {{ vGender }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <iphone />
            </el-icon>
            手机号
          </div>
        </template>
        {{ vPhone }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <office-building />
            </el-icon>
            地址
          </div>
        </template>
        {{ vAddress }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <calendar />
            </el-icon>
            出生日期
          </div>
        </template>
        {{ vBirthDate }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <credit-card />
            </el-icon>
            身份证号
          </div>
        </template>
        {{ vIdCard }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <map-location />
            </el-icon>
            活动地点
          </div>
        </template>
        {{ vSpace }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <info-filled />
            </el-icon>
            工作状态
          </div>
        </template>
        {{ vState }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getVolunteerInfoById } from '@/api/volunteer-manage'

const vName = ref('')
const vId = ref()
const vGender = ref('')
const vIdCard = ref()
const vPhone = ref()
const vAddress = ref('')
const vBirthDate = ref('')
const vSpace = ref('')
const vState = ref('')

// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['update:modelValue', 'setInfoChangeDialog'])

const closeDialog = () => {
  vName.value = ''
  vId.value = ''
  vGender.value = ''
  vIdCard.value = ''
  vPhone.value = ''
  vAddress.value = ''
  vBirthDate.value = ''
  vSpace.value = ''
  vState.value = ''
  emits('update:modelValue', false)
}

let infoObj = {}

const requestData = () => {
  getVolunteerInfoById(props.userId)
    .then((response) => {
      vName.value = response.data.info.name
      vId.value = response.data.info.id
      vGender.value = response.data.info.gender
      vIdCard.value = response.data.info.idCard
      vPhone.value = response.data.info.phone
      vAddress.value = response.data.info.address
      vBirthDate.value = response.data.info.birthDate
      vSpace.value = response.data.info.space
      vState.value = response.data.info.state

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

<style>
.el-descriptions__label.el-descriptions__cell.is-bordered-label {
  width: 20%;
}
</style>
