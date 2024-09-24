<template>
  <el-main class="main">
    <!--    <Search/>-->
    <DetailTable :tableData="tableData"/>
    <Chart :options="options" style="width: 100%"/>
  </el-main>
</template>

<script lang="ts" setup>
import {computed, ref, onMounted, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {fetchGeneDeatail} from '@/apis/apis'
import Chart from "@/views/Analyse/components/Chart.vue";
import GeneExpraCreator from "@/views/Analyse/charts/GeneExpra.js";
import DetailTable from "@/views/Analyse/components/DetailTable.vue";
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
  if (expra.value) {
    const {NewxAxisHour, seriesdata, legenddata} = GetChartData(expra.value);
    console.log('options', NewxAxisHour)
    return GeneExpraCreator(NewxAxisHour, seriesdata, legenddata);
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
  console.log('data', data)
  let xAxisHour = [];
  let NewxAxisHour = {};
  let seriesdata = [];
  let legenddata = [];

  xAxisHour = data.xAxis
  console.log('xAxisHour', xAxisHour)
  let dataList = data.data;
  let conditions = data.condition;
  let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];

  let numbers = xAxisHour.map(x => parseInt(x.replace(/[^\d]/g, ''))); // 提取数字部分
  // 找到数字部分的最小值和最大值
  let minValue = Math.min(...numbers);
  let maxValue = Math.max(...numbers);
  // 计算要生成的点的数量
  let numPoints = (maxValue - minValue) + 1;
  // 生成一系列点
  let generatedPoints = Array.from({length: numPoints}, (_, index) => {
    let point = minValue + index;
    return Math.max(minValue, Math.min(maxValue, point)); // 确保点在最小值和最大值范围内
  });
  let flag = 0;
  if (xAxisHour[0].startsWith('CT')) {
    flag = 1;
  } else if (xAxisHour[0].startsWith('ZT')) {
    flag = 2;
  } else {
    flag = 0
  }
  console.log('flag', flag)

  if (flag == 1) {
    NewxAxisHour = generatedPoints.map(x => 'CT' + x);
  } else if (flag == 2) {
    NewxAxisHour = generatedPoints.map(x => 'ZT' + x);
  } else {
    NewxAxisHour = generatedPoints.map(x => 'CT' + x);
  }
  console.log('NewxAxisHour', NewxAxisHour);

  dataList.forEach((conditionData, conditionIndex) => {
    console.log('dataList', conditionData, conditionIndex)
    // console.log(conditions[conditionIndex].split('_').slice(1))
    try {
      // Add sine function data
      let amp = data.DetialData[conditionIndex].amp;
      let phase = data.DetialData[conditionIndex].phase;
      let offset = data.DetialData[conditionIndex].offset;
      console.log(amp, phase, offset)

      conditionData.forEach((data) => {
        let dataIndex = 0;
        const extendedData = [];
        for (let j = 0; j < NewxAxisHour.length; j++) {
          if (numbers.includes(generatedPoints[j])) {
            extendedData.push(data[dataIndex]);
            dataIndex++;
          } else {
            extendedData.push(null);
          }
        }
        seriesdata.push({
          data: extendedData,
          type: 'scatter', // 使用点图展示原始数据
          symbolSize: 6, // 设置点的大小
          itemStyle: {
            color: colors[conditionIndex % colors.length] // 使用同一颜色区分不同条件下的数据
          },
          name: conditions[conditionIndex] // 设置数据系列名称
        });
      });

      let A24 = 24
      let sineData = generatedPoints.map(x => {
        let result = amp * Math.sin(2 * Math.PI / A24 * (x + phase)) + offset;
        return result;
      });
      seriesdata.push({
        data: sineData,
        type: 'line',
        smooth: false,
        showSymbol: false,
        clip: true,
        lineStyle: {
          color: colors[conditionIndex % colors.length]
        },
        name: conditions[conditionIndex]
      });
    } catch (error) {
      console.error('error'); // 捕获并处理异常
    }

    legenddata.push(conditions[conditionIndex]); // 添加均值数据的图例名称

  });
  return {NewxAxisHour, seriesdata, legenddata};

}

</script>
