<template>

  <div class="container">
    <Search/>
    <div class="TableBox" :key="$router.fullpath">
      <el-table :data="tableData" stripe border @row-click="handleRowClick">
        <el-table-column prop="GEOAccession__GSE" label="GSE"/>
        <el-table-column prop="GEOAccession__title" label="Title"/>
        <el-table-column prop="condition" label="Contidion"/>
        <el-table-column prop="pvalue" label="pvalue"/>
        <el-table-column prop="R2" label="R2"/>
        <el-table-column prop="amp" label="amp"/>
        <el-table-column prop="peakTime" label="peakTime"/>
      </el-table>
    </div>
  </div>

</template>


<script setup>
import {ref, onMounted, reactive, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {fetchGeneData} from "@/apis/apis.js";
import Search from "@/views/Table/components/Search.vue";

const router = useRouter(); // 获取路由实例
const route = useRoute()

const tableData = ref(null)

const species = ref(route.path.split('/')[1])
const omics = ref(route.path.split('/')[2])
const tissue = ref(route.path.split('/')[3])
const gene = ref(route.path.split('/')[4])


onMounted(() => {
  console.log(species, omics, tissue)

  fetchGeneData(species.value, {omics: omics.value, tissue: tissue.value || null, gene: gene.value})
      .then(response => {
        tableData.value = response
      })
      .catch(error => {
        console.error(error);
      })
})

watch(route, (to, from) => {
  router.go(0)
})

const handleRowClick = (row) => {
  console.log('GEO:', row.GEOAccession__GSE, row.gene__name)
  // router.push({path: `/details?&species=${species.value}&gse=${row.GEOAccession__GSE}&gene=${row.gene__name}`});
  router.push({path: `/details/${species.value}/${omics.value}/${row.GEOAccession__GSE}/${row.gene__name}`});
};

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
//justify-content: center; align-items: center; height: 100vh; /* 让容器铺满整个视口高度 */
}

.TableBox {
  height: 100%;
  width: 80%;
}
</style>
