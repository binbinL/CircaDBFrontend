<template>
  <div class="main">
    <div class="TableBox">
      <el-table border :data="tableData" stripe style="width: 100%" @row-click="handleRowClick">
        <el-table-column prop="GEOAccession__GSE" label="GEOAccession"/>
        <el-table-column prop="GEOAccession__title" label="Title"/>
        <el-table-column prop="condition" label="Condition"/>
        <el-table-column prop="tissue" label="Tissue"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {fetchAllGEOData} from "@/apis/apis.js";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter(); // 获取路由实例
const tableData = ref(null)
onMounted(() => {

  fetchAllGEOData()
      .then(response => {
        tableData.value = response
      })
      .catch(error => {
        console.log(error);
      })
})

watch(route, (to, from) => {
  router.go(0)
})
</script>

<style scoped>
.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
</style>