<template>
  <el-table :data="tableData" stripe border style="width: 100%" @row-click="handleRowClick">
    <el-table-column prop="GEOAccession__GSE" label="GSE"/>
    <el-table-column prop="GEOAccession__title" label="Title"/>
    <el-table-column prop="condition" label="Contidion"/>
    <el-table-column prop="pvalue" label="pvalue"/>
    <el-table-column prop="R2" label="R2"/>
    <el-table-column prop="amp" label="amp"/>
    <el-table-column prop="peakTime" label="peakTime"/>
  </el-table>
</template>


<script setup>
import {watch, toRefs, ref} from 'vue';

const props = defineProps({
  genedata: {
    type: Object,
  },
  species: {
    type: String,
  },
});
// const {genedata} = toRefs(props.genedata)
// const {species} = toRefs(props.species)
const {genedata, species} = toRefs(props);
const tableData = ref(genedata)

watch(() => props, (newVal) => {
  tableData.value = newVal;
  console.log('tableData', newVal)
});


const handleRowClick = (row) => {
  console.log(species.value, row.GEOAccession__GSE, row.gene__name)
  //window.open(`api/gse/gene/?gse=${row.GSE__GSE}&gene=${row.gene__name}`, '_blank')
  window.open(`/details?&species=${species.value}&gse=${row.GEOAccession__GSE}&gene=${row.gene__name}`, '_blank')
};


</script>
