<template>
  <el-table :data="tableData" stripe style="width: 100%" @row-click="handleRowClick">
    <el-table-column prop="GSE__GSE" label="GSE"/>
    <el-table-column prop="GSE__title" label="Title"/>
    <el-table-column prop="condition" label="Contidion"/>
    <el-table-column prop="JTK_pvalue" label="JTK_pvalue"/>
    <el-table-column prop="JTK_BH_Q" label="JTK_BH_Q"/>
  </el-table>
</template>


<script setup>
import {watch, toRefs, ref} from 'vue';

const props = defineProps({
  genedata: {
    type: Object,
  }
});
const {genedata} = toRefs(props)
const tableData = ref(genedata)

watch(() => genedata, (newVal) => {
  tableData.value = newVal;
  console.log('tableData', newVal)
});

const handleRowClick = (row) => {
  console.log(row.GSE__GSE, row.gene__name)

  //window.open(`api/gse/gene/?gse=${row.GSE__GSE}&gene=${row.gene__name}`, '_blank')
  window.open(`/details?gse=${row.GSE__GSE}&gene=${row.gene__name}`, '_blank')
};


</script>
