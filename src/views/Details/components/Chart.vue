<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, markRaw} from "vue";
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
  chart.value = markRaw(echarts.init(container.value));
  chart.value.setOption(options);

});

watch(
    options,
    (newOptions) => {
      chart.value.setOption(newOptions);
    },
    {deep: true}
);

</script>

<style scoped>
.container {
  width: 50%;
  height: 100%;
}
</style>