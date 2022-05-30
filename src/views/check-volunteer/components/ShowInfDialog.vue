<template>
  <el-dialog
    title="志愿者详细信息"
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
              <Iphone />
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
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getVolunteerInfoById } from '@/api/volunteer-manage'
import {
  Iphone,
  OfficeBuilding,
  Tickets,
  User,
  Connection
} from '@element-plus/icons-vue'

const vName = ref('')
const vId = ref()
const vGender = ref('')
const vIdCard = ref()
const vPhone = ref()
const vAddress = ref('')
const vBirthDate = ref('')

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
const emits = defineEmits(['update:modelValue'])

const closeDialog = () => {
  vName.value = ''
  vId.value = ''
  vGender.value = ''
  vIdCard.value = ''
  vPhone.value = ''
  vAddress.value = ''
  vBirthDate.value = ''
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
