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
.main {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

</style>