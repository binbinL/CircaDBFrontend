<template>
  <el-main class="main">
    <Search/>
    <DetailTable :tableData="tableData"/>
    <br>
    <Chart :options="options" style="width: 100%"/>
  </el-main>
</template>

<script lang="ts" setup>
import {computed, ref, onMounted, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {fetchGeneDeatail} from '@/apis/apis'
import Chart from "@/views/Details/components/Chart.vue";
import GeneExpraCreator from "@/views/Details/charts/GeneExpra.js";
import DetailTable from "@/views/Details/components/DetailTable.vue";
import Search from "@/views/Table/components/Search.vue";
const router = useRouter(); // 获取路由实例

const route = useRoute();
const species = ref(route.path.split('/')[2])

const gse = ref(route.path.split('/')[4])
const gene = ref(route.path.split('/')[5])
const expra = ref(null);

const fetchData = async () => {
  try {
    const response = await fetchGeneDeatail(species.value, {gse: gse.value, gene: gene.value});
    expra.value = response;

  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchData();
});
watch(route, (to, from) => {
  router.go(0)
})

const options = computed(() => {
  console.log(expra.value);
  if (expra.value) {
    const {xAxisHour, seriesdata, legenddata} = GetChartData(expra.value);
    return GeneExpraCreator(xAxisHour, seriesdata, legenddata);
  }
  return null; // 或者返回适当的默认值
});

const tableData = computed(() => {
  if (expra.value) {
    const data = GetTableData(expra.value);
    console.log('---', data)
    return data;
  }
  return null; // 或者返回适当的默认值
});

function GetTableData(data) {
  return data.DetialData
}

function GetChartData(data) {
  console.log(data)
  let xAxisHour = [];
  let seriesdata = [];
  let legenddata = [];

  xAxisHour = data.xAxis;
  let dataList = data.data;
  let conditions = data.condition;
  let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];

  dataList.forEach((conditionData, conditionIndex) => {
    let meanData = new Array(xAxisHour.length).fill(0);
    console.log('conditionData', conditionData)
    console.log('conditionIndex', conditionIndex)
    conditionData.forEach((replicateData) => {
      replicateData.forEach((value, index) => {
        meanData[index] += value; // 累加同一时间点的数据
      });
    });

    meanData = meanData.map(value => value / conditionData.length); // 计算均值
    console.log('meanData', meanData)
    seriesdata.push({
      data: meanData,
      type: 'line', // 使用线连接均值数据点
      smooth: false,
      lineStyle: {
        color: colors[conditionIndex % colors.length] // 使用不同颜色区分不同条件下的数据
      },
      name: conditions[conditionIndex] // 设置数据系列名称
    });

    conditionData.forEach((data) => {
      seriesdata.push({
        data: data,
        type: 'scatter', // 使用点图展示原始数据
        symbolSize: 6, // 设置点的大小
        itemStyle: {
          color: colors[conditionIndex % colors.length] // 使用同一颜色区分不同条件下的数据
        },
        name: conditions[conditionIndex] // 设置数据系列名称
      });
    });

    legenddata.push(conditions[conditionIndex]); // 添加均值数据的图例名称

  });
  console.log(xAxisHour, legenddata)
  return {xAxisHour, seriesdata, legenddata};

}

</script>
