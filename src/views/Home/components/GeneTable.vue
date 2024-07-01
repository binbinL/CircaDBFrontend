<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="GSE__GSE" label="GSE"/>
    <el-table-column prop="GSE__title" label="Title"/>
    <el-table-column prop="JTK_pvalue" label="JTK_pvalue"/>
    <el-table-column prop="JTK_BH_Q" label="JTK_BH_Q"/>
  </el-table>
</template>

<script setup>
import {watch, reactive} from 'vue';

const props = reactive({
  data: {
    type: Object,
    required: true
  }
});

const tableData = JSON.parse(JSON.stringify(props.data));
console.log('tableData', Object.values(tableData))
watch(props, (newVal) => {
  console.log('tableData', newVal.data)
  tableData.data = newVal.data
});
</script>
