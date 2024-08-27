<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="GEOAccession__GSE" label="GSE"/>
    <el-table-column prop="GEOAccession__title" label="Title"/>
  </el-table>
</template>

<script setup>
import {watch, toRefs, ref} from 'vue';

const props = defineProps({
  tissuedata: {
    type: Object,
  }
});
const {tissuedata} = toRefs(props)
const tableData = ref(tissuedata)

watch(() => tissuedata, (newVal) => {
  tableData.value = newVal;
});

</script>
