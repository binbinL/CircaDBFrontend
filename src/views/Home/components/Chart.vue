<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, reactive, markRaw} from "vue";
import * as echarts from "echarts";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});
const {propsRef} = toRefs(props);
const container = ref(null);
const chart = ref(null);
onMounted(() => {
  chart.value = markRaw(echarts.init(container.value));
  chart.value.setOption(props.options);
});

watch(() => props.options, (newOptions) => {
      const chartData = newOptions.series[0].data;
      console.log('chart_chartData', chartData)
      chart.value.setOption(newOptions);
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