<!--<template>-->
<!--  <div id="app">-->
<!--    <el-container class="full-height">-->
<!--      <Top/>-->
<!--      <el-container class="main-container">-->
<!--        <Left/>-->
<!--        <el-main class="main">-->
<!--          <Msg/>-->
<!--        </el-main>-->
<!--      </el-container>-->
<!--      <Bottom/>-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->
<template>
  <Left/>
  <el-main class="main">
    <Msg/>
  </el-main>
</template>

<script>
import {defineComponent} from "vue";
import Left from "@/views/Home/components/Left.vue";
import Msg from "@/views/Home/components/Msg.vue";

export default defineComponent({
  components: {Msg, Left}
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