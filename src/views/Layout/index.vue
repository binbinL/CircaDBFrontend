<template>
  <div id="app">
    <el-container class="full-height">
      <Top/>
      <el-container class="main-container">
        <RouterView/>
      </el-container>
      <Bottom/>
    </el-container>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Top from "@/views/Layout/components/Top.vue";
import Bottom from "@/views/Layout/components/Bottom.vue";


export default defineComponent({
  components: {Top, Bottom}
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