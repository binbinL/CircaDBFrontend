<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="GSE__GSE" label="GSE" />
    <el-table-column prop="GSE__title" label="Title"/>
  </el-table>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const tableData = JSON.parse(JSON.stringify(props.data));
console.log('tableData', Object.values(tableData))

</script>
