<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/dateFormat.js'
import ArticleEdit from './components/ArticleEdit.vue'
const dataList = ref([])
const total = ref(0)
const loading = ref(false)
// 定义params
const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
})
// 获取数据
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  dataList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 分页逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 当页渲染
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
// 搜索
const dataSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const dataReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 发布信息
const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}
const handleEdit = (row) => {
  articleEditRef.value.open(row)
}

// 添加或者编辑  成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最大页码数
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>
<template>
  <page-container title="信息管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布信息</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="信息分类:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataSearch">搜索</el-button>
        <el-button type="reset" @click="dataReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="dataList" v-loading="loading">
      <el-table-column label="信息标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            plain
            circle
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            plain
            circle
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 添加编辑的抽屉 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
