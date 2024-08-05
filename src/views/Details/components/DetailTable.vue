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
    <el-table-column prop="JTK_pvalue" label="JTK_pvalue"/>
    <el-table-column prop="JTK_BH_Q" label="JTK_BH.Q"/>
    <el-table-column prop="JTK_period" label="JTK_period"/>
    <el-table-column prop="JTK_adjphase" label="JTK_adjphase"/>
    <el-table-column prop="JTK_amplitude" label="JTK_amplitude"/>
    <el-table-column prop="meta2d_Base" label="meta2d_Base"/>
    <el-table-column prop="meta2d_AMP" label="meta2d_AMP"/>
    <el-table-column prop="meta2d_rAMP" label="meta2d_rAMP"/>

  </el-table>
</template>

<style scoped>

</style>