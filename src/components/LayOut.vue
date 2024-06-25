<template>
  <div id="app">
    <el-container class="full-height">
      <Top/>
      <el-container class="main-container">
        <Left/>
        <Right/>
      </el-container>
      <Bottom/>
    </el-container>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import Top from "@/components/Top.vue";
import Left from "@/components/Left.vue";
import Right from "@/components/Right.vue";
import Bottom from "@/components/Bottom.vue";

export default defineComponent({
  components: {Top, Right, Bottom, Left}
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


</style>