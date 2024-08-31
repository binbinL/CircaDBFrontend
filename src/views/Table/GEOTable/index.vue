<template>
  <el-table border :data="tableData" stripe style="width: 100%">
    <el-table-column prop="GEOAccession__GSE" label="GEOAccession"/>
    <el-table-column prop="GEOAccession__title" label="Title"/>
  </el-table>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router'
import {fetchTissueData} from "@/apis/apis.js";
const route = useRoute()

const tableData = ref(null)

const species = ref(route.path.split('/')[1])
const omics = ref(route.path.split('/')[2])
const tissue = ref(route.path.split('/')[3])

onMounted(() => {
  console.log(species, omics, tissue)
  fetchTissueData(species.value, {omics: omics.value, tissue: tissue.value})
        .then(response => {
          console.log(response)
          tableData.value = response
        })
        .catch(error => {
          console.log(error);
        })
})


</script>
