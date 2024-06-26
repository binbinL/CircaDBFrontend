<script lang="ts" setup>
import {ref} from 'vue'
import {Document, Download, House, Link, Message} from "@element-plus/icons-vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <!--  <div class="navigation">-->
  <!-- -->
  <!--  </div>-->

  <el-header class="header">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <el-menu-item index="1">
        <el-icon>
          <House/>
        </el-icon>

        <RouterLink to="/home">
          <span>Home</span>
        </RouterLink>

      </el-menu-item>


      <RouterLink to="/guide">
        <el-menu-item index="2">
          <el-icon>
            <Document/>
          </el-icon>
          <span>Guide</span>
        </el-menu-item>
      </RouterLink>


      <el-menu-item index="3">
        <el-icon>
          <Download/>
        </el-icon>
        <RouterLink to="/download">
          DownLoad
        </RouterLink>
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon>
          <Message/>
        </el-icon>
        <RouterLink to="/contact">
          Contact
        </RouterLink>
      </el-menu-item>

      <el-menu-item index="5">
        <el-icon>
          <Link/>
        </el-icon>
        <RouterLink to="/about">
          About
        </RouterLink>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>


<style scoped>
.header {
  flex: 1;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  background-color: #f4f4f4;
}
</style>
