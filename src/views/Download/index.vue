<template>
  <el-main class="main">
    <Download/>
  </el-main>
</template>

<script>
import {defineComponent} from "vue";

import Download from "@/views/Download/components/Download.vue";


export default defineComponent({
  components: {Download}
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