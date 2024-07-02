<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="GSE__GSE" label="GSE"/>
    <el-table-column prop="GSE__title" label="Title"/>
  </el-table>
</template>

<script setup>
import {watch, ref, reactive} from 'vue';

const props = defineProps({
  tissuedata: {
    type: Object,
  }
});
const tableData = ref(props.tissuedata)

watch(() => props.tissuedata, (newVal) => {
  tableData.value = newVal;
});

// const tableData = ref(JSON.parse(JSON.stringify(props.data)));
// watch(props.tissuedata, (newVal) => {
//   gse_data.value = newVal
//   console.log('tissuedata', newVal)
// });
</script>
