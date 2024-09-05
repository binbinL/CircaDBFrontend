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
import {ref, onMounted, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {fetchGeneData} from "@/apis/apis.js";
import Search from "@/views/Table/components/Search.vue";

const router = useRouter(); // 获取路由实例
const route = useRoute()

const tableData = ref(null)

const species = ref(route.path.split('/')[2])
const omics = ref(route.path.split('/')[3])
const tissue = ref(route.path.split('/')[4])
const gene = ref(route.path.split('/')[5])


onMounted(() => {
  console.log('Genetable', species, omics, tissue, gene)
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
  console.log('GeneTable:', row.GEOAccession__GSE, row.gene__name)
  router.push({path: `/details/${species.value}/${omics.value}/${row.GEOAccession__GSE}/${row.gene__name}`});
};

</script>

<style>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.TableBox {
  height: 100%;
  width: 80%;
}
</style>
