<template>
  <div class="Summay">

    <div class="Species">
      <div class="block">
        <h2>Human</h2>
        <el-image :src="human_image" @click="jumpToPage('homo')">
          <el-button @click="jumpToPage('homo')">Homo</el-button>
        </el-image>
      </div>

      <div class="block">
        <h2>Mouse</h2>
        <el-image :src="mus_image" @click="jumpToPage('mus')">
          <el-button @click="jumpToPage('mus')">Mus</el-button>
        </el-image>
      </div>
    </div>

    <div class="DataPortal">
      <div class="icon-text">
        <el-icon size="50">
          <Link/>
        </el-icon>
        <span>32<br>Projects</span>
      </div>
      <div class="icon-text">
        <el-icon size="50">
          <Document/>
        </el-icon>
        <span>2<br>Species</span>
      </div>
      <div class="icon-text">
        <el-icon size="50">
          <Collection/>
        </el-icon>
        <span>69<br>Source</span>
      </div>

    </div>
  </div>


</template>

<script lang="ts" setup>
import {Link, Document, Collection} from "@element-plus/icons-vue"
import {useRouter} from 'vue-router'; // 导入路由相关内容

const router = useRouter(); // 获取路由实例

const mus_image = "/images/mouse.png"
const human_image = "/images/human.png"
const jumpToPage = (species) => {
  if (species === 'homo') {
    router.push({path: `/human`});
  } else if (species === 'mus') {
    router.push({path: `/mouse`});
  }
}
</script>


<style scoped>

.Summay {
  display: flex;
  align-items: center; /* 垂直居中 */
  flex-direction: column;
}

.DataPortal {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center;
  height: 15vh; /* 设置高度为视口高度，以便垂直居中 */

//margin-bottom: 50px;
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.icon-text span {
  font-size: 30px; /* 设置字体大小 */
  color: #000; /* 设置字体颜色 */
  margin-top: 5px; /* 设置顶部间距 */
}


.Species {
  display: flex;
  flex-direction: row; /* 垂直布局 */
  justify-content: center;
  align-items: center;

  height: 60vh; /* 设置高度为视口高度，以便垂直居中 */
}

.Species .block {
  border: 2px solid #272c2c; /* 设置边框样式，1像素宽，颜色为灰色 */
  margin: 10px; /* 设置外边距 */
  width: 50%;
}

h2 {
  justify-content: center;
  align-items: center;
  color: #0f1313; /* 设置字体颜色为蓝色 */
  font-size: 26px;
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  font-weight: bold; /* 设置字体加粗 */
}


</style>