<template>
  <el-main class="main">
    <!--    <div class="container">-->
    <!--      &lt;!&ndash; 左边内容 &ndash;&gt;-->
    <!--      <div class="container_left" ref="container_left">-->
    <!--        <Chart :options="options"/>-->
    <!--      </div>-->

    <!--      &lt;!&ndash; 右边内容 &ndash;&gt;-->
    <!--      <div class="container_right" ref="container_left">-->
    <!--        <router-view :key='$route.fullPath'/>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="container">
      <!-- 上面内容 -->
      <div class="container_top">
        <h2>HHH</h2>
      </div>

      <!-- 下面内容 -->
      <div class="container_bottom">
        <!-- 左边内容 -->
        <div class="container_left" ref="container_left">
          <Chart :options="options"/>
        </div>

        <!-- 右边内容 -->
        <div class="container_right" ref="container_left">
          <router-view :key='$route.fullPath'/>
        </div>
      </div>
    </div>
  </el-main>


</template>
<script setup>

import {ref, onMounted} from 'vue';
import Chart from "@/views/Species/components/Chart.vue";
import RingChartOptionCreator from "@/views/Species/charts/RingChartOptions.js";


const options = ref(null);


const fetchData = async () => {
  const data = await getOmicsData();
  options.value = await RingChartOptionCreator(data)
  console.log(data)
};

onMounted(() => {
  fetchData();
});

function getOmicsData() {
  let OmicDatas = []
  OmicDatas = [
    {
      value: 12,
      name: 'Transcriptome'
    },
    {
      value: 1,
      name: 'Metabolome'
    },
    {
      value: 3,
      name: 'Acetylome'
    },
    {
      value: 1,
      name: 'Proteome'
    },
  ];
  return OmicDatas
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

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.container_top {
  flex: 1;
}

.container_bottom {
  display: flex;
  flex: 1;
}

.container_left,
.container_right {
  flex: 1;
}

</style>