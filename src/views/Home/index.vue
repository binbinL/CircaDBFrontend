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

.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

</style>