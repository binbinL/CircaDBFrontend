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

const fetchData = async () => {
  console.log('omics species', species.value)
  console.log('omics omics', omics.value)
  fetchOmicsData(species.value, {omics: omics.value})
      .then(response => {
        tissues.value = response.tissue_count
      }).then(() => {
        const data = getTissueData(tissues.value);
        options.value = RingChartOptionCreator(data);
      }
  ).catch(error => {
    console.log(error);
  })
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