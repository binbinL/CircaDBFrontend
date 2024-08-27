<script setup>
import {toRefs} from "vue";

const props = defineProps({
  tableData: {
    type: Array,
  }
});

const {tableData} = toRefs(props);


</script>

<template>
  <el-table :data="tableData" stripe style="width: 100%">

    <el-table-column prop="gene__name" label="Gene"/>
    <el-table-column prop="tissue" label="Tissue"/>
    <el-table-column prop="condition" label="Condition"/>
    <el-table-column prop="pvalue" label="pvalue"/>
    <el-table-column prop="R2" label="R2"/>
    <el-table-column prop="amp" label="amp"/>
    <el-table-column prop="peakTime" label="peakTime"/>
    <el-table-column prop="phase" label="phase"/>
<!--    <el-table-column prop="offset" label="offset"/>-->

  </el-table>
</template>

<style scoped>

</style>