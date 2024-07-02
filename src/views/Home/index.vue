<template>
  <Left @getOmics="emitsOmics" @getTissue="emitsTissue" @getGene="emitsGene"/>
  <el-main class="main">
    <template v-if="Object.keys(tissueData.data).length === 0 && Object.keys(geneData.data).length === 0">
      <Chart :options="chart.options"/>
    </template>
    <template v-else-if="Object.keys(tissueData.data).length > 0 && Object.keys(geneData.data).length === 0">
      <Table :tissuedata="tissueData.data"/>
    </template>
    <!--    ="Object.keys(geneData.data).length > 0"-->
    <template v-else>
      <GeneTable :genedata="geneData.data"/>
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

const chart = reactive({
  options: {}
});
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
  omicsData.data = data
}
const emitsTissue = (data) => {
  tissueData.data = data
}
const emitsGene = (data) => {
  geneData.data = data
}


watch(omicsData, (newVal) => {
  const proxyData = newVal.data.tissue_count
  chartOptions.series[0].data = Object.keys(proxyData).map(key => {
    return {
      value: proxyData[key],
      name: key
    };
  })
  chart.options = chartOptions;
  console.log('chart', chart.options)
});

watch(chart.options, (newVal) => {
  console.log('chart-change', newVal.options)
});

watch(tissueData, (newVal) => {
  console.log('index-watch-tissue', newVal.data)
  tissueData.data = newVal.data
  console.log('tissueData Length', Object.keys(tissueData.data).length)
});

watch(geneData, (newVal) => {
  console.log('index-watch-gene', newVal.data)
  geneData.data = newVal.data
  console.log('geneData Length', Object.keys(geneData.data).length)
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