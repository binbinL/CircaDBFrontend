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
import {watch, ref} from 'vue';
import router from '@/router'

const props = defineProps({
  genedata: {
    type: Object,
  }
});
const tableData = ref(props.genedata)

watch(() => props.genedata, (newVal) => {
  tableData.value = newVal;
  console.log('tableData', newVal)
});

const handleRowClick = (row) => {
  console.log(row.GSE__GSE, row.gene__name)

  //router.push({path: '/gse/gene', query: {gse: row.GSE__GSE, gene: row.gene__name}}, {target: '_blank'});
  window.open(`api/gse/gene/?gse=${row.GSE__GSE}&gene=${row.gene__name}`, '_blank')

};


// const tableData = JSON.parse(JSON.stringify(props.data));
// console.log('tableData', Object.values(tableData))
// watch(props, (newVal) => {
//   console.log('tableData', newVal.data)
//   tableData.data = newVal.data
// });
</script>
