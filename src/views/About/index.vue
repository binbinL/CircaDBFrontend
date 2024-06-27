<template>
  <el-main class="main">
    <About/>
  </el-main>
</template>

<script>
import {defineComponent} from "vue";
import About from "@/views/About/components/About.vue";

export default defineComponent({
  components: {About}
})
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