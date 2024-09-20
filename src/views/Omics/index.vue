<template>
  <!--  <h2>Source Statistics</h2>-->
  <Chart :options="options"/>
</template>

<script setup>

import {ref, onMounted} from 'vue';
import Chart from "@/views/Omics/components/Chart.vue";
import RingChartOptionCreator from "@/views/Omics/charts/RingChartOptions.js";
import {fetchOmicsData} from "@/apis/apis.js";
import {useRoute} from 'vue-router'

const route = useRoute()

const species = ref(route.path.split('/')[2])
const omics = ref(route.path.split('/')[3])

const options = ref(null);
const tissues = ref(null)

let humanData = {
  'tissue_count': {
    'FibroblastCells': 2,
    'SkeletalMuscle': 1,
    'SkeletalMyotubeCells': 1,
    'U2OS': 3,
    'SKNAS': 1,
    'HD-MY-Z': 1,
    'LCL-HO': 1,
    'Shep': 1,
    'VastusLateralisMyotubesCells': 1,
    'Blood': 1,
    'L-1236': 1
  }
}
let mouseData = {
  'tissue_count': {
    'Muscle': 1,
    'DMS': 1,
    'Nac': 1,
    'Liver': 6,
    'Forebrain': 1,
    'BAT': 1,
    'DLS': 1,
    'FrontalCortex': 1,
    'Retina': 1,
    'eWAT': 1,
    'Gastrocnemius': 1,
    'EpidermalCell': 1,
    'Colon': 2,
    'SCN': 1,
    'LN': 1,
    'BiventricularHeart': 1,
    'RenalTubule': 1,
    'Pancreas': 1,
    'Kidney': 1,
    'RenalCortex': 1,
    'Hippocampus': 1
  }
}
const fetchData = async () => {
  // fetchOmicsData(species.value, {omics: omics.value})
  //     .then(response => {
  //       tissues.value = response.tissue_count
  //     }).then(() => {
  //       const data = getTissueData(tissues.value);
  //       console.log('data', data)
  //       options.value = RingChartOptionCreator(data);
  //     }
  // ).catch(error => {
  //   console.log(error);
  // })

  if (species.value === 'human') {
    const data = getTissueData(humanData.tissue_count)
    options.value = RingChartOptionCreator(data);
  } else if (species.value === 'mouse') {
    const data = getTissueData(mouseData.tissue_count)
    options.value = RingChartOptionCreator(data);
  }

};

onMounted(() => {
  fetchData();
});

function getTissueData(rawdata) {
  let tissueDatas = []
  tissueDatas = Object.keys(rawdata).map(key => {
    return {
      value: rawdata[key],
      name: key
    };
  });
  return tissueDatas
}

</script>

<style scoped>

.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

h2 {
  display: flex;

  align-items: center;
  color: #0f1313; /* 设置字体颜色为蓝色 */
  font-size: 30px;
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  font-weight: bold; /* 设置字体加粗 */
  margin: 25px;
  margin-left: 170px; /* 原有的25px左边距 + 5px */
}

</style>