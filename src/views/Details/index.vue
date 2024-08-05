<template>
  <el-main class="main">
    <!--    <p>GSE: {{ gse }}</p>-->
    <!--    <p>Gene: {{ gene }}</p>-->

    <!--    <template>-->
    <!--      <DetailTable :tissuedata="tissueData.data"/>-->
    <!--    </template>-->

    <el-table :data="tableData" stripe style="width: 100%">

      <el-table-column prop="gene__name" label="Gene"/>
      <el-table-column prop="tissue" label="Tissue"/>
      <el-table-column prop="condition" label="Condition"/>
      <el-table-column prop="JTK_pvalue" label="JTK_pvalue"/>
      <el-table-column prop="JTK_BH_Q" label="JTK_BH.Q"/>
      <el-table-column prop="JTK_period" label="JTK_period"/>
      <el-table-column prop="JTK_adjphase" label="JTK_adjphase"/>
      <el-table-column prop="JTK_amplitude" label="JTK_amplitude"/>
      <el-table-column prop="meta2d_Base" label="meta2d_Base"/>
      <el-table-column prop="meta2d_AMP" label="meta2d_AMP"/>
      <el-table-column prop="meta2d_rAMP" label="meta2d_rAMP"/>

    </el-table>
    <br>
    <Chart :options="options" style="width: 100%"/>
  </el-main>
</template>

<script lang="ts" setup>
import {computed, ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import {fetchGeneDeatail} from '@/apis/apis'
import Chart from "@/views/Details/components/Chart.vue";
import GeneExpraCreator from "@/views/Details/charts/GeneExpra.js";
import Table from "@/views/Home/components/Table.vue";

const route = useRoute();
const gse = ref(route.query.gse);
const gene = ref(route.query.gene);
const expra = ref(null);



const fetchData = async () => {
  try {
    // const response = await axios.get(`/api/gse/gene`, {params: {gse: gse.value, gene: gene.value}});
    const response = await fetchGeneDeatail({gse: gse.value, gene: gene.value});
    expra.value = response;

  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchData();
});

// 另一种写法
// const options = ref(null)
// watch(expra, (newVal) => {
//   console.log('---', newVal)
//   if (newVal) {
//     const {xAxisHour, seriesdata, legenddata} = GetData(newVal);
//     options.value = GeneExpraCreator(xAxisHour, seriesdata, legenddata);
//   }
// });

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

  console.log(xAxisHour)
  console.log(legenddata)
  dataList.forEach((conditionData, conditionIndex) => {
    let meanData = new Array(xAxisHour.length).fill(0);
    conditionData.forEach((replicateData) => {
      replicateData.forEach((value, index) => {
        meanData[index] += value; // 累加同一时间点的数据
      });
    });
    meanData = meanData.map(value => value / conditionData.length); // 计算均值

    seriesdata.push({
      data: meanData,
      type: 'line', // 使用线连接均值数据点
      smooth: true,
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
