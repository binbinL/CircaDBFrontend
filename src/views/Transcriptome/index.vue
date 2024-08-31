<template>
  <Chart :options="options"/>
</template>

<script setup>

import {ref, onMounted} from 'vue';
import Chart from "@/views/Transcriptome/components/Chart.vue";
import RingChartOptionCreator from "@/views/Transcriptome/charts/RingChartOptions.js";
import {fetchOmicsData} from "@/apis/apis.js";


const options = ref(null);
const tissues = ref(null)

const fetchData = async () => {
  fetchOmicsData('Homo', {omics: 'Transcriptome'})
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

</style>