<template>
  <div id="app">
    <el-container class="full-height">
      <Top/>
      <el-container class="main-container">
        <Left/>
        <el-main class="main">
          <About/>
        </el-main>
      </el-container>
      <Bottom/>
    </el-container>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Top from "@/components/Top.vue";
import Left from "@/components/Left.vue";
import Bottom from "@/components/Bottom.vue";
import About from "@/components/About.vue";1

export default defineComponent({
  components: {Top, About, Bottom, Left}
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