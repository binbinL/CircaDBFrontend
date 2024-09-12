<script setup>

</script>

<template>
  <el-main class="main">
    <h1> Contact </h1>
    <br>
    <span>For any questions or suggestions, please contact:xxx</span>
    <span>Email:</span>
    <span>Address:</span>
  </el-main>

</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  align-items: flex-start; /* 左对齐 */
  background-color: #ffffff;
  height: 80vh; /* 设置高度为视口高度，使内容铺满整个视口 */
  padding: 20px; /* 添加内边距 */
}

h1 {
  color: #0f1313;
  font-size: 35px;
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 10px; /* 添加下边距 */
}

span {
  font-size: 18px;
  color: #0f1313;
  font-family: sans-serif;
  line-height: 1.8;
  text-align: left; /* 左对齐 */
  margin-bottom: 10px; /* 添加下边距 */
  display: block; /* 确保每个 span 元素独占一行 */
}
</style>

