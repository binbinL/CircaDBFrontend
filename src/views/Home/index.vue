<template>
  <Left @getTissues="emitsTissues"/>
  <el-main class="main">
    <RingChart/>
  </el-main>
</template>

<script setup>
import {defineComponent} from "vue";
import Left from "@/views/Home/components/Left.vue";
import Msg from "@/views/Home/components/Msg.vue";
import RingChart from "@/views/Home/components/RingChart.vue";

// defineComponent({
//   components: {Msg, Left, RingChart}
// })

const emitsTissues = (data) => {
  console.log(data)
}
</script>

<style scoped>

.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

</style>