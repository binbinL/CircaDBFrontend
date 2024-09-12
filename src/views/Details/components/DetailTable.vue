<script setup>
import {ref, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";

// const router = useRouter(); // 获取路由实例
const route = useRoute()
const props = defineProps({
  tableData: {
    type: Array,
  }
});

const {tableData} = toRefs(props);
const species = ref(route.path.split('/')[2])
const omics = ref(route.path.split('/')[3])
const gse = ref(route.path.split('/')[4])
const gene = ref(route.path.split('/')[5])
const handleRowClick = (row) => {
  console.log('DetailTable:', row.GEOAccession__GSE, row.gene__name, row.tissue, row.condition, row.amp)
  window.open(`/analyse/${species.value}/${omics.value}/${gse.value}/${gene.value}/${row.tissue}/${row.condition}`, '_blank')
};
console.log(tableData.value)

</script>

<template>
  <el-table :data="tableData" stripe style="width: 90% ;margin: 0 auto" @row-click="handleRowClick">
    <el-table-column prop="GEOAccession__GSE" label="GEOAccession"/>
    <el-table-column prop="gene__name" label="Gene"/>
    <el-table-column prop="tissue" label="Tissue"/>
    <el-table-column prop="condition" label="Condition"/>
    <el-table-column prop="pvalue" label="pvalue"/>
    <el-table-column prop="R2" label="R2"/>
    <el-table-column prop="peakTime" label="peakTime"/>
    <!--    <el-table-column prop="amp" label="amp"/>-->
    <!--    <el-table-column prop="phase" label="phase"/>-->
    <!--    <el-table-column prop="offset" label="offset"/>-->
  </el-table>
</template>

<style scoped>

</style>