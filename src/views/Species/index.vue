<template>
  <el-main class="main">
    <div class="container">
      <!-- 左边内容 -->
      <div class="container_left" ref="container_left">
        <Chart :options="options"/>
      </div>

      <!-- 右边内容 -->
      <div class="container_right" ref="container_left">
        <router-view :key='$route.fullPath'/>
      </div>

    </div>
  </el-main>


</template>
<script setup>

import {ref, onMounted} from 'vue';
import Chart from "@/views/Species/components/Chart.vue";
import RingChartOptionCreator from "@/views/Species/charts/RingChartOptions.js";
import {useRouter} from 'vue-router'; // 导入路由相关内容
import {useRoute} from 'vue-router'

const route = useRoute()
const species = ref(route.path.split('/')[2])

const options = ref(null);


const fetchData = async () => {
  const data = await getOmicsData(species.value);
  options.value = await RingChartOptionCreator(data)
  console.log(data)
};

onMounted(() => {
  fetchData();
});

function getOmicsData(type) {
  let OmicDatas = []
  let cnt = 0
  if (type === 'human') {
    cnt = 11
  } else if (type === 'mouse') {
    cnt = 22
  }
  OmicDatas = [
    {
      value: cnt,
      name: 'Transcriptome'
    },
    {
      value: 1,
      name: 'Metabolome'
    },
    {
      value: 1,
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
  flex: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.container {
  margin-left: 60px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}


.container_left {
  flex: 1;
}

.container_right {
  flex: 1;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f1313; /* 设置字体颜色为蓝色 */
  font-size: 30px;
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  font-weight: bold; /* 设置字体加粗 */
  margin: 25px;
}
</style>