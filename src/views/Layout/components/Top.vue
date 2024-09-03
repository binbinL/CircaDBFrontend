<script lang="ts" setup>
import {ref} from 'vue'
import {Document, Download, House, Link, Message} from "@element-plus/icons-vue";

const activeIndex = ref(null)
const handleSelect = (key, keyPath) => {
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
          <span>Home</span>
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/guide">
        <el-menu-item index="2">
          <el-icon>
            <Document/>
          </el-icon>
          <span>Guide</span>
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/download">
        <el-menu-item index="3">
          <el-icon>
            <Download/>
          </el-icon>
          <span>Download</span>
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/contact">
        <el-menu-item index="4">
          <el-icon>
            <Message/>
          </el-icon>
          <span>Contact</span>
        </el-menu-item>
      </RouterLink>

      <RouterLink to="/about">
        <el-menu-item index="5">
          <el-icon>
            <Link/>
          </el-icon>
          <span>About</span>
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

.el-icon {
  font-size: 30px;
}


.el-menu-item span {
  border: none;
  font-size: 16px; /* 设置字体大小 */
  color: #ffffff; /* 设置字体颜色 */
  margin-top: 6px; /* 设置顶部间距 */
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}

</style>
