<template>
  <div class="volunteer-manage-container">
    <el-card class="header">
      <el-button type="success">excel导出</el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column type="index" label="#" width="220" />
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="220" />
        <!-- 志愿者号 -->
        <el-table-column prop="id" label="志愿者号" width="220" />
        <!-- 操作 -->
        <el-table-column label="操作">
          <!-- 解构scope得到row -->
          <template #default="{ row }">
            <el-button type="primary">详细信息</el-button>
            <el-button type="warning">封禁</el-button>
            <el-button type="danger" @click="showDeleteConfirm(row.id)"
              >删除</el-button
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getVolunteerList, deleteVolunteer } from '@/api/volunteer-manage'
import { ElMessageBox, ElMessage } from 'element-plus'

// 页面数据展示参数
const tableData = ref([])
const total = ref(0) // 总条目数
const page = ref(1) // 当前页数
const size = ref(10) // 每页显示条目个数

const getListData = async () => {
  // 第一次来到本页面向后端请求第1页的10条数据
  const result = await getVolunteerList({
    page: page.value,
    size: size.value
  })
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

const showDeleteConfirm = (id) => {
  ElMessageBox.confirm('您确认要删除该志愿者吗?', '删除确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteVolunteer(id).then((response) => {
      if (response.code === 10000) {
        ElMessage.success('删除成功')
      }
      getListData()
    })
  })
}
</script>

<style scoped>
.header {
  margin-bottom: 20px;
}
</style>
