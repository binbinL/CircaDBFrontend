<template>
  <Left @getOmics="emitsOmics" @getTissue="emitsTissue" @getGene="emitsGene"/>
  <el-main class="main">
    <template v-if="Object.keys(tissueData.data).length === 0">
      <Chart :options="chartOptions"/>
    </template>
    <template v-else-if="Object.keys(tissueData.data).length > 0 && Object.keys(geneData.data).length === 0">
      <Table :data="tissueData.data"/>
    </template>
    <!--    ="Object.keys(geneData.data).length > 0"-->
    <template v-else>
      <GeneTable :data="geneData.data"/>
    </template>

  </el-main>
</template>

<script setup>
import Left from "@/views/Home/components/Left.vue";
import {reactive, watch} from 'vue';
import Chart from "@/views/Home/components/Chart.vue";
import RingChartOptionCreator from "@/views/Home/charts/RingChartOptions.js";
import Table from "@/views/Home/components/Table.vue";
import GeneTable from "@/views/Home/components/GeneTable.vue";

const chartOptions = RingChartOptionCreator();
const omicsData = reactive({
  data: {}
})
const tissueData = reactive({
  data: {}
})
const geneData = reactive({
  data: {}
})
const emitsOmics = (data) => {
  console.log('index', data)
  omicsData.data = data
}
const emitsTissue = (data) => {
  console.log('index', data)
  tissueData.data = data
}
const emitsGene = (data) => {
  console.log('index', data)
  geneData.data = data
}


watch(omicsData, (newVal) => {
  // Update chart options when tissueData changes
  const chartData = Object.entries(newVal.data).map(([name, value]) => ({name, value}));
  console.log(chartData)
  // Update chart options with the new data format
  chartOptions.series[0].data = chartData;
});

watch(tissueData, (newVal) => {
  console.log('index-watch-tissue', newVal.data)
  tissueData.data = newVal.data
  console.log('tissueData', Object.keys(tissueData.data).length)
});

watch(geneData, (newVal) => {
  console.log('index-watch-gene', newVal.data)
  geneData.data = newVal.data
  console.log('geneData', Object.keys(geneData.data).length)
});

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