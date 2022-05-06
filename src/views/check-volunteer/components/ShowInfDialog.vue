<template>
  <el-dialog
    title="志愿者详细信息"
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
          姓名
        </div>
      </template>
      {{vName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          志愿者号
        </div>
      </template>
      {{vId}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <connection />
          </el-icon>
          性别
        </div>
      </template>
      {{vGender}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Iphone />
          </el-icon>
          手机号
        </div>
      </template>
      {{vPhone}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          地址
        </div>
      </template>
      {{vAddress}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <calendar />
          </el-icon>
          出生日期
        </div>
      </template>
      {{vBirthDate}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <credit-card />
          </el-icon>
          身份证号
        </div>
      </template>
      {{vIdCard}}
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
import { getVolunteerInfoById } from '@/api/volunteer-manage'
import { ElMessage } from 'element-plus'
import {
  Iphone,
  Location,
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

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px'
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px'
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

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
