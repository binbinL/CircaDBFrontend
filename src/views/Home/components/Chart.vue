<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, reactive} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});


const {options} = toRefs(props);
const container = ref(null);
const chart = ref(null);

onMounted(() => {
  chart.value = echarts.init(container.value);
  chart.value.setOption(props.options);
});

watch(options, (newOptions) => {
      const chartData = newOptions.series[0].data;
      console.log('chart_chartData', chartData)
      chart.value.setOption(props.options);
    },
    {deep: true}
);

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>