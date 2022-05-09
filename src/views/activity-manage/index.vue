<template>
  <div class="volunteer-manage-container">
    <el-card class="header">
      <div class="searchBox">
        <img
          src="../../assets/svg/searchIcon.svg"
          alt="search"
          class="searchIcon"
        />
        <el-input
          v-model="inputKeyword"
          class="search-input"
          placeholder="请输入志愿活动名称关键字"
        ></el-input>
        <el-button :icon="Search" @click="handleSearch" class="search-button"
          >搜索</el-button
        >
      </div>
      <el-button
        type="primary"
        :icon="Plus"
        class="addButton"
        @click="showAddDialog"
        >志愿活动添加</el-button
      >
      <el-button
        type="success"
        :icon="Download"
        class="excelExport"
        @click="showExportDialog"
        >excel导出</el-button
      >
    </el-card>
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="#" width="220" />
        <el-table-column prop="name" label="活动名称" width="220" />
        <el-table-column prop="id" label="活动编号" width="220" sortable />
        <!-- 操作 -->
        <el-table-column label="操作">
          <!-- 解构scope得到row -->
          <template #default="{ row }">
            <el-button type="primary" @click="showInfDialog(row.id)"
              >详细信息</el-button
            >
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
    <AddActivityDialog v-model="addActivityDialogVisible" />
    <ExportDialog v-model="exportDialogVisible" />
    <ShowInfDialog
      v-model="showInfDialogVisible"
      :activityId="activityId"
      @setInfoChangeDialog="setInfoChangeDialog"
    />
    <InfoChangeDialog
      v-model="infoChangeDialogVisible"
      :infoObj="infoObj"
      @getListData="getListData"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getActivityList, deleteActivity } from '@/api/activity-manage'
import { ElMessageBox, ElMessage } from 'element-plus'
import AddActivityDialog from './components/AddActivityDialog.vue'
import ShowInfDialog from './components/ShowInfDialog.vue'
import ExportDialog from './components/ExportDialog.vue'
import InfoChangeDialog from './components/InfoChangeDialog.vue'
import { Plus, Download } from '@element-plus/icons-vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const routePage = route.query.page
const routeSize = route.query.size
const routeKeyword = route.query.keyword
const inputKeyword = ref(route.query.keyword === undefined ? '' : routeKeyword)

// 页面数据展示参数
const tableData = ref([])
const total = ref(0) // 总条目数
const page = ref(routePage === undefined ? 1 : parseInt(routePage)) // 当前页数
const size = ref(routeSize === undefined ? 10 : parseInt(routeSize)) // 每页显示条目个数
const keyword = ref(routeKeyword)

const activityId = ref(-1)
const showInfDialogVisible = ref(false)
const showInfDialog = (id) => {
  showInfDialogVisible.value = true
  activityId.value = id
}

const addActivityDialogVisible = ref(false)
const showAddDialog = () => {
  addActivityDialogVisible.value = true
}

const exportDialogVisible = ref(false)
const showExportDialog = () => {
  exportDialogVisible.value = true
}

const loading = ref(false)
const getListData = async () => {
  // 第一次来到本页面向后端请求第1页的10条数据
  loading.value = true
  const result = await getActivityList({
    page: page.value,
    size: size.value,
    keyword: keyword.value
  })
  loading.value = false
  tableData.value = result.data.list
  total.value = result.data.total
}
getListData()

const handleCurrentChange = (number) => {
  router.push({
    path: '/activity-manage',
    query: {
      page: number,
      size: size.value,
      keyword: keyword.value
    }
  })
  getListData()
}

const handleSizeChange = (number) => {
  router.push({
    path: '/volunteer-manage',
    query: {
      page: page.value,
      size: number,
      keyword: keyword.value
    }
  })
  getListData()
}

const showDeleteConfirm = (id) => {
  ElMessageBox.confirm('您确认要删除该活动吗?', '删除确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteActivity(id).then((response) => {
      if (response.code === 10000) {
        ElMessage.success('删除成功')
      }
      getListData()
    })
  })
}

const infoObj = reactive({
  aName: '',
  aAddress: '',
  aDateTime: ''
})

const infoChangeDialogVisible = ref(false)
const setInfoChangeDialog = (visible, obj) => {
  infoChangeDialogVisible.value = visible
  infoObj.aName = obj.name
  infoObj.aAddress = obj.address
  infoObj.aDateTime = obj.dateTime
}
const handleSearch = async () => {
  const keywordInput = inputKeyword.value.trim()
  keyword.value = keywordInput
  page.value = 1
  size.value = 10
  router.push({
    path: '/activity-manage',
    query: {
      page: page.value,
      size: size.value,
      keyword: keyword.value
    }
  })
  getListData()
}

</script>

<style>
.header {
  position: relative;
  margin-bottom: 20px;
  height: 70px;
}

.searchBox {
  position: absolute;
  margin-left: 10px;
}

.searchIcon {
  vertical-align: middle;
}

.search-input {
  width: 200px;
}

.addButton {
  position: absolute;
  right: 0;
  margin-right: 150px;
}

.excelExport {
  position: absolute;
  right: 0;
  margin-right: 20px;
}

.el-pagination {
  margin-top: 15px;
  justify-content: center;
}
</style>
