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
          placeholder="请输入志愿者姓名关键字"
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
        >志愿者添加</el-button
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
        @sort-change="changeTableSort"
        border
        style="width: 100%"
      >
        <!-- 索引 -->
        <el-table-column type="index" label="#" width="220" />
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="220" />
        <!-- 志愿者号 -->
        <el-table-column
          prop="id"
          label="志愿者号"
          width="220"
          sortable="custom"
        />
        <!-- 操作 -->
        <el-table-column label="操作">
          <!-- 解构scope得到row -->
          <template #default="{ row }">
            <el-button type="primary" @click="showDetailedInfoDialog(row.id)"
              >详细信息</el-button
            >
            <el-button type="warning" @click="showBanConfirm(row.id)"
              >封禁</el-button
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
    <AddVolunteerDialog v-model="addVolunteerDialogVisible" />
    <ExportDialog v-model="exportDialogVisible" />
    <DetailedInfoDialog
      v-model="detailedInfoDialogVisible"
      :userId="userId"
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
import {
  getVolunteerList,
  deleteVolunteer,
  banVolunteer,
  getVolunteerOrderList
} from '@/api/volunteer-manage'
import { ElMessageBox, ElMessage } from 'element-plus'
import AddVolunteerDialog from './components/AddVolunteerDialog.vue'
import ExportDialog from './components/ExportDialog.vue'
import DetailedInfoDialog from './components/DetailedInfoDialog.vue'
import InfoChangeDialog from './components/InfoChangeDialog'
import { Plus, Download, Search } from '@element-plus/icons-vue'
import router from '@/router'
import { useRoute } from 'vue-router'
const route = useRoute()

const routePage = route.query.page
const routeSize = route.query.size
const routeKeyword = route.query.keyword

const inputKeyword = ref(route.query.keyword === undefined ? '' : routeKeyword)
const infoObj = reactive({
  vName: '',
  vGender: '',
  vIdCard: '',
  vPhone: '',
  vAddress: ''
})
const infoChangeDialogVisible = ref(false)

// 页面数据展示参数
const tableData = ref([])
const total = ref(0) // 总条目数
const page = ref(routePage === undefined ? 1 : parseInt(routePage)) // 当前页数
const size = ref(routeSize === undefined ? 10 : parseInt(routeSize)) // 每页显示条目个数
const keyword = ref(routeKeyword)

const changeTableSort = async ({ column, prop, order }) => {
  const result = await getVolunteerOrderList({
    page: page.value,
    size: size.value,
    prop: prop, // el-table-column的prop值
    order: order // 升序ascending 降序descending 默认null
  })
  tableData.value = result.data.list
  total.value = result.data.total
}

const addVolunteerDialogVisible = ref(false)
const showAddDialog = () => {
  addVolunteerDialogVisible.value = true
}
const exportDialogVisible = ref(false)
const showExportDialog = () => {
  exportDialogVisible.value = true
}

const detailedInfoDialogVisible = ref(false)
const userId = ref(-1)
const showDetailedInfoDialog = (id) => {
  detailedInfoDialogVisible.value = true
  userId.value = id
}

const loading = ref(false)
const getListData = async () => {
  // console.log('请求当前页数据')
  // 第一次来到本页面向后端请求第1页的10条数据
  loading.value = true
  const result = await getVolunteerList({
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
    path: '/volunteer-manage',
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
const showBanConfirm = (id) => {
  ElMessageBox.confirm('您确认要封禁该志愿者吗?', '封禁确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await banVolunteer(id).then((response) => {
        if (response.code === 10000) {
          ElMessage.success('封禁成功')
        }
        getListData()
      })
    })
    .catch(() => {})
}
const showDeleteConfirm = (id) => {
  ElMessageBox.confirm('您确认要删除该志愿者吗?', '删除确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteVolunteer(id).then((response) => {
        if (response.code === 10000) {
          ElMessage.success('删除成功')
        }
        getListData()
      })
    })
    .catch(() => {})
}

const setInfoChangeDialog = (visible, obj) => {
  infoChangeDialogVisible.value = visible
  infoObj.vName = obj.name
  infoObj.vGender = obj.gender
  infoObj.vIdCard = obj.idCard
  infoObj.vPhone = obj.phone
  infoObj.vAddress = obj.address
  infoObj.vSpace = obj.space
}

const handleSearch = async () => {
  const keywordInput = inputKeyword.value.trim()
  keyword.value = keywordInput
  page.value = 1
  size.value = 10
  router.push({
    path: '/volunteer-manage',
    query: {
      page: page.value,
      size: size.value,
      keyword: keyword.value
    }
  })
  getListData()
}
</script>

<style scoped>
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
