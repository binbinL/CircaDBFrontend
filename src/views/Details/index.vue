<template>
  <el-main class="main">
    <p>GSE: {{ gse }}</p>
    <p>Gene: {{ gene }}</p>
    <!--    <div id="chart" style="width: 800px; height: 400px;"></div>-->
    <Chart :options="chart.options"/>
  </el-main>
</template>

<script setup>
import {reactive, ref } from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";
import Chart from "@/views/Details/components/Chart.vue";
import GeneExpraCreator from "@/views/Details/charts/GeneExpra.js";

const route = useRoute();
const gse = ref(route.query.gse);
const gene = ref(route.query.gene);
const expra = ref([])
const chartOptions = GeneExpraCreator();
const chart = reactive({
  options: {}
});
axios.get(`/api/gse/gene`, {params: {gse: gse.value, gene: gene.value}})
    .then(response => {
      expra.value = response.data.data
      chartOptions.xAxis.data = expra.value.xAxis;
      let xAxisHour = expra.value.xAxis;
      let dataList = expra.value.data;
      let conditions = expra.value.condition;
      // 定义一组颜色和线型用于区分不同条件下的数据和不同重复实验
      let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];

      dataList.forEach((conditionData, conditionIndex) => {
        let meanData = new Array(xAxisHour.length).fill(0);

        conditionData.forEach((replicateData) => {
          replicateData.forEach((value, index) => {
            meanData[index] += value; // 累加同一时间点的数据
          });
        });
        meanData = meanData.map(value => value / conditionData.length); // 计算均值
        chartOptions.series.push({
          data: meanData,
          type: 'line', // 使用线连接均值数据点
          smooth: true,
          lineStyle: {
            color: colors[conditionIndex % colors.length] // 使用不同颜色区分不同条件下的数据
          },
          name: conditions[conditionIndex] // 设置数据系列名称
        });

        conditionData.forEach((data) => {
          chartOptions.series.push({
            data: data,
            type: 'scatter', // 使用点图展示原始数据
            symbolSize: 6, // 设置点的大小
            itemStyle: {
              color: colors[conditionIndex % colors.length] // 使用同一颜色区分不同条件下的数据
            },
            name: conditions[conditionIndex] // 设置数据系列名称
          });
        });

        chartOptions.legend.data.push(conditions[conditionIndex]); // 添加均值数据的图例名称
      });
      // console.log('data:', expra.value.condition);
      // console.log('data:', expra.value.data);
      // console.log('data:', expra.value.xAxis);
      chart.options = chartOptions;
    })
    .catch(error => {
      console.error(error);
    })
</script>
