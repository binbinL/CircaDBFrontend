<template>
  <div class="container" ref="container" style="width: 600px;height:400px;"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, markRaw} from "vue";
import * as echarts from "echarts";
import {useRouter} from 'vue-router'; // 导入路由相关内容
const router = useRouter(); // 获取路由实例

import {useRoute} from 'vue-router'

const route = useRoute()
const species = ref(route.path.split('/')[2])

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});
const {options} = toRefs(props)
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
      chart.value.on('click', function (params) {
        router.push({path: `/home/${species.value}/${params.data.name}`});
      });
    },
    {deep: true}
);


</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
}

</style>