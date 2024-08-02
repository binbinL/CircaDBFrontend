<template>
  <Left @getOmics="emitsOmics" @getTissue="emitsTissue" @getGene="emitsGene"/>
  <el-main class="main">

    <template v-if="Object.keys(tissueData.data).length===0 && geneData.name.length === 0">
      <Chart :options="options"/>
    </template>
    <template v-else-if="Object.keys(tissueData.data).length > 0 && Object.keys(geneData.data).length === 0">
      <Table :tissuedata="tissueData.data"/>
    </template>
    <template v-else>
      <GeneTable :genedata="geneData.data"/>
    </template>

    <!--    <template>-->
    <!--      <div v-show="echart_show">-->
    <!--        <Chart :options="options"/>-->
    <!--      </div>-->
    <!--      <div v-show="table_show">-->
    <!--        <Table :tissuedata="tissueData.data"/>-->
    <!--      </div>-->
    <!--      <div v-show="genetable_show">-->
    <!--        <GeneTable :genedata="geneData.data"/>-->
    <!--      </div>-->
    <!--    </template>-->


  </el-main>
</template>

<script setup>
import Left from "@/views/Home/components/Left.vue";
import {reactive, watch, computed, ref} from 'vue';
import Chart from "@/views/Home/components/Chart.vue";
import RingChartOptionCreator from "@/views/Home/charts/RingChartOptions.js";
import Table from "@/views/Home/components/Table.vue";
import GeneTable from "@/views/Home/components/GeneTable.vue";

// const options = ref(null)
// let chartOptions = RingChartOptionCreator();

const omicsData = reactive({
  data: {}
})
const tissueData = reactive({
  name: '',
  data: {}
})
const geneData = reactive({
  name: '',
  data: {}
})
const emitsOmics = (data) => {
  omicsData.data = data
}
const emitsTissue = (name, data) => {
  tissueData.name = name
  tissueData.data = data
}
const emitsGene = (name, data) => {
  geneData.name = name
  geneData.data = data
}
// const echart_show = computed(() => {
//   return Object.keys(tissueData.data).length === 0 && geneData.name.length === 0;
// });
// const table_show = computed(() => {
//   return Object.keys(tissueData.data).length > 0 && Object.keys(geneData.data).length === 0;
// });
// const genetable_show = computed(() => {
//   return Object.keys(geneData.data).length > 0;
// });

const options = ref(null)
watch(omicsData, (newOmicsData) => {
  // console.log('index-watchomics-data', newOmicsData.data)
  const data = getTissueData(newOmicsData.data.tissue_count)
  options.value = RingChartOptionCreator(data)
});


function getTissueData(rawdata) {
  let tissueDatas = []
  if (Object.keys(rawdata).length === 0) {
    // 如果proxyData为空，返回特定的数据
    tissueDatas = [
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
    tissueDatas = Object.keys(rawdata).map(key => {
      return {
        value: rawdata[key],
        name: key
      };
    });
  }
  return tissueDatas
}


watch(tissueData, (newVal) => {
  // console.log('index-watch-tissue', newVal.data)
  tissueData.data = newVal.data
  // console.log('tissueData Length', Object.keys(tissueData.data).length)
});

watch(geneData, (newVal) => {
  // console.log('index-watch-gene', newVal.data)
  geneData.data = newVal.data
  // console.log('geneData Length', Object.keys(geneData.data).length)
  // console.log('genename', geneData.name)
  // console.log('tissueDataname', tissueData.name)
  if (Object.keys(geneData.data).length === 0 && geneData.name.length !== 0) {
    // 显示弹窗提示
    alert('this gene no result');
  }
  if (geneData.name.length === 0 && Object.keys(tissueData.data).length === 0) {
    // console.log('how to do')
    // echart_show.value = true;
    // table_show.value = false;
    // genetable_show.value = false;
    // console.log('omicsData.data.tissue_count', omicsData.data.tissue_count)
    // const data = getTissueData(omicsData.data.tissue_count)
    // options.value = RingChartOptionCreator(data)
    // console.log('options', options.value)

  }
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