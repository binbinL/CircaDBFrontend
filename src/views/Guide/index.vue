<template>
  <el-main class="main">
    <Guide/>
  </el-main>
</template>

<script>
import {defineComponent} from "vue";
import Guide from "@/views/Guide/components/Guide.vue";

export default defineComponent({
  components: {Guide}
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