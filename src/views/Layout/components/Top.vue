<script lang="ts" setup>
import {ref} from 'vue'
import {Document, Download, House, Link, Message} from "@element-plus/icons-vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="nav-header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#59938AFF"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <RouterLink to="/home">
        <el-menu-item index="1">
          <el-icon>
            <House/>
          </el-icon>
          Home
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/guide">
        <el-menu-item index="2">
          <el-icon>
            <Document/>
          </el-icon>
          Guide
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/download">
        <el-menu-item index="3">
          <el-icon>
            <Download/>
          </el-icon>
          DownLoad
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/contact">
        <el-menu-item index="4">
          <el-icon>
            <Message/>
          </el-icon>
          Contact
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/about">
        <el-menu-item index="5">
          <el-icon>
            <Link/>
          </el-icon>
          About
        </el-menu-item>
      </RouterLink>
    </el-menu>
  </div>

<!--  <el-header class="header">-->

<!--  </el-header>-->
</template>


<style scoped>
.nav-header {
  flex: 1
}

.header {
  flex: 2;
//display: flex; //justify-content: center; //align-items: center; background-color: #f4f4f4;
}
</style>
