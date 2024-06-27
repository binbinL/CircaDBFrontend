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
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.full-height {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 10;
  display: flex;
  background-color: #e9ecef;
}

.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

</style>