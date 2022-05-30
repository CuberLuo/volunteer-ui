<template>
  <div class="volunteer-manage-container">
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <!-- 索引 -->
        <el-table-column type="index" label="#" width="220" />
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="220" />
        <!-- 志愿者号 -->
        <el-table-column prop="id" label="志愿者号" width="220" sortable />
        <!-- 操作 -->
        <el-table-column label="操作">
          <!-- 解构scope得到row -->
          <template #default="{ row }">
            <el-button type="primary" @click="showInfDialog(row.id)"
              >详细信息</el-button
            >
            <el-button type="success" @click="showPassConfirm(row.id)"
              >通过</el-button
            >
            <el-button type="danger" @click="showObjectConfirm(row.id)"
              >退回</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="size"
        :total="total"
        :page-sizes="[5, 10]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
    <ShowInfDialog v-model="showInfDialogVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getCheckVolList,
  passVolunteer,
  objectVolunteer
} from '@/api/check-volunteer'
import { ElMessageBox, ElMessage } from 'element-plus'
import ShowInfDialog from './components/ShowInfDialog.vue'

// 页面数据展示参数
const tableData = ref([])
const total = ref(0) // 总条目数
const page = ref(1) // 当前页数
const size = ref(10) // 每页显示条目个数

const showInfDialogVisible = ref(false)
const userId = ref(-1)
const showInfDialog = (id) => {
  showInfDialogVisible.value = true
  userId.value = id
}

const loading = ref(false)
const getListData = async () => {
  // 第一次来到本页面向后端请求第1页的10条数据
  loading.value = true
  const result = await getCheckVolList({
    page: page.value,
    size: size.value
  })
  loading.value = false
  tableData.value = result.data.list
  total.value = result.data.total
}
getListData()

const handleCurrentChange = (number) => {
  page.value = number
  getListData()
}

const handleSizeChange = (number) => {
  size.value = number
  getListData()
}
const showPassConfirm = (id) => {
  ElMessageBox.confirm('您确定审核通过该志愿者吗?', '审核通过确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await passVolunteer(id).then((response) => {
        if (response.code === 10000) {
          ElMessage.success('成功通过申请')
        }
        getListData()
      })
    })
    .catch(() => {})
}
const showObjectConfirm = (id) => {
  ElMessageBox.confirm('您确定要退回该志愿者的申请吗?', '退回申请确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await objectVolunteer(id).then((response) => {
        if (response.code === 10000) {
          ElMessage.success('成功退回申请')
        }
        getListData()
      })
    })
    .catch(() => {})
}
</script>

<style>
.el-pagination {
  margin-top: 15px;
  justify-content: center;
}
</style>
