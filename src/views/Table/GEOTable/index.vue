<template>
  <div class="container">

    <Search/>

    <div class="TableBox">
      <el-table border :data="tableData" stripe style="width: 100%" @row-click="handleRowClick">
        <el-table-column prop="GEOAccession__GSE" label="GEOAccession"/>
        <el-table-column prop="GEOAccession__title" label="Title"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {fetchTissueData} from "@/apis/apis.js";
import Search from "@/views/Table/components/Search.vue";

const router = useRouter(); // 获取路由实例
const route = useRoute()

const tableData = ref(null)

const species = ref(route.path.split('/')[2])
const omics = ref(route.path.split('/')[3])
const tissue = ref(route.path.split('/')[4])


onMounted(() => {
  console.log('GEOTable', species, omics, tissue)
  fetchTissueData(species.value, {omics: omics.value, tissue: tissue.value})
      .then(response => {
        tableData.value = response
      })
      .catch(error => {
        console.log(error);
      })
})

watch(route, (to, from) => {
  router.go(0)
})
const handleRowClick = (row) => {
  console.log('GeneTable:', row.GEOAccession__GSE)
  window.open(`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${row.GEOAccession__GSE}`, '_blank')
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.TableBox {
  height: 100%;
  width: 80%;
}

.SearchBox {
  width: 80%; /* 设置宽度 */
  margin: 10px; /* 设置间距 */
  padding: 16px 16px 16px 16px;
  border: 0;
}

.el-input__wrapper {
  width: 80%; /* 设置宽度 */
  margin: 10px; /* 设置间距 */
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px 16px 16px 16px;
  border-radius: 40px;
}

.SearchBox input::placeholder {
  color: #0f1313; /* 设置placeholder的颜色为红色 */
  font-style: italic; /* 设置placeholder的字体为斜体 */
  font-size: 18px; /* 设置placeholder的字体大小为14像素 */
}

</style>