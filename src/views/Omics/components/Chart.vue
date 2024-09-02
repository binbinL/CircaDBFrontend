<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import {ref, onMounted, watch, toRefs, markRaw} from "vue";
import * as echarts from "echarts";
import {useRouter} from 'vue-router'; // 导入路由相关内容
const router = useRouter(); // 获取路由实例
import {useRoute} from 'vue-router'

const route = useRoute()
const species = ref(route.path.split('/')[1])
const omics = ref(route.path.split('/')[2])

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
      console.log('-chart species', species.value)
      console.log('-chart omics', omics.value)
      chart.value.setOption(newOptions);
      chart.value.on('click', function (params) {
        console.log(params.data.name);
        console.log('--chart species', species.value)
        console.log('--chart omics', omics.value)
        router.push({path: `/${species.value}/${omics.value}/${params.data.name}`});
      });
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