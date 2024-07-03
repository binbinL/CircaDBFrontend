<template>
  <el-main class="main">
    <p>GSE: {{ gse }}</p>
    <p>Gene: {{ gene }}</p>
    <!--    <div id="chart" style="width: 800px; height: 400px;"></div>-->
    <Chart :options="chart.options"/>
  </el-main>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from "axios";
import * as echarts from 'echarts';
import Chart from "@/views/Home/components/Chart.vue";
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
      console.log('data:', expra.value);
      console.log('data1:', expra.value[0]);
      console.log('data1:', expra.value[0].attr);
      chart.options = chartOptions;
    })
    .catch(error => {
      console.error(error);
    })

</script>
