<template>
  <el-row class="tac">
    <el-col>
      <!--      <h4 class="mb-2">Dashboard</h4>-->
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <!--        <el-sub-menu index="1">-->
        <!--          <template #title>-->
        <!--            <el-icon>-->
        <!--              <House/>-->
        <!--            </el-icon>-->
        <!--            <span>Home</span>-->
        <!--          </template>-->
        <!--          <el-menu-item index="1-1">item one</el-menu-item>-->
        <!--          <el-menu-item index="1-2">item two</el-menu-item>-->
        <!--          <el-menu-item index="1-3">item three</el-menu-item>-->
        <!--          <el-menu-item index="1-4">item four</el-menu-item>-->
        <!--        </el-sub-menu>-->

        <el-menu-item index="1">
          <el-icon>
            <House/>
          </el-icon>
          <span>Home</span>
        </el-menu-item>

        <el-menu-item index="2">
          <el-icon>
            <Document/>
          </el-icon>
          <span>Guide</span>
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon>
            <Download/>
          </el-icon>
          <span>DownLoad</span>
        </el-menu-item>

        <el-menu-item index="4">
          <el-icon>
            <Message/>
          </el-icon>
          <span>Contact</span>
        </el-menu-item>

        <el-menu-item index="5">
          <el-icon>
            <Link/>
          </el-icon>
          <span>About</span>
        </el-menu-item>


      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  House,
  Document,
  Message,
  Download,
  Link,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
