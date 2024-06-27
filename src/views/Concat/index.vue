<template>
  <el-main class="main">
    <Contact/>
  </el-main>
</template>

<script>
import {defineComponent} from "vue";
import Contact from "@/views/Concat/components/Contact.vue";

export default defineComponent({
  components: {Contact}
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