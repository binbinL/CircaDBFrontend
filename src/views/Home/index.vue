<template>
  <Left @getOmics="emitsOmics" @getTissue="emitsTissue" @getGene="emitsGene"/>
  <el-main class="main">
    <template v-if="Object.keys(tissueData.data).length === 0 && Object.keys(geneData.data).length === 0">
      <!--      <Chart :options="charts.options"/>-->
      <Chart :options="options"/>
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
import {reactive, watch, computed, ref, toRef} from 'vue';
import Chart from "@/views/Home/components/Chart.vue";
import RingChartOptionCreator from "@/views/Home/charts/RingChartOptions.js";
import Table from "@/views/Home/components/Table.vue";
import GeneTable from "@/views/Home/components/GeneTable.vue";

// let charts = reactive({
//   options: {}
// });

// const options = ref(null)
// let chartOptions = RingChartOptionCreator();
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

// watch(omicsData, (newVal) => {
//   const proxyData = newVal.data.tissue_count
//   if (Object.keys(proxyData).length === 0) {
//     // 如果proxyData为空，返回特定的数据
//     chartOptions.series[0].data = [{
//       value: 1,  // 特定数值
//       name: 'null'  // 特定名称
//     }];
//   } else {
//     // 如果proxyData不为空，根据proxyData生成数据
//     chartOptions.series[0].data = Object.keys(proxyData).map(key => {
//       return {
//         value: proxyData[key],
//         name: key
//       };
//     });
//   }
//   charts.options = chartOptions;
//   console.log('home-index-chart', charts.options.series[0].data)
// });


// watch(() => charts, (newVal, oldValue) => {
//   console.log('index-watch-chart', newVal, oldValue)
// }, {deep: true});

const options = ref(null)
watch(omicsData, (newVal) => {
  console.log('index-watchomics-data', newVal.data)
  const data = getTissueData(newVal.data.tissue_count)
  options.value = RingChartOptionCreator(data)
});

// const options = computed(() => {
//   const data = getTissueData(omicsData.data)
//   return RingChartOptionCreator(data)
// })

function getTissueData(rawdata) {
  let tissueData = []
  if (Object.keys(rawdata).length === 0) {
    // 如果proxyData为空，返回特定的数据
    tissueData = [
      {
        value: 1,  // 特定数值
        name: 'null'  // 特定名称
      },
      {
        value: 1,
        name: 'null2'
      }
    ];
  } else {
    // 如果proxyData不为空，根据proxyData生成数据
    tissueData = Object.keys(rawdata).map(key => {
      return {
        value: rawdata[key],
        name: key
      };
    });
  }
  return tissueData
}


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