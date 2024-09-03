<template>
  <div class="container">
    <div class="Summay">

      <div class="Species">
        <div class="block-outter">
          <h2>Human</h2>
          <div class="block">
            <el-image :src="human_image" @click="jumpToPage('human')">
              <!--          <el-button @click="jumpToPage('human')">human</el-button>-->
            </el-image>
          </div>
        </div>

        <div class="block-outter">
          <h2>Mouse</h2>
          <div class="block">
            <el-image :src="mus_image" @click="jumpToPage('mouse')">
              <!--          <el-button @click="jumpToPage('mouse')">Mus</el-button>-->
            </el-image>
          </div>
        </div>

      </div>

      <div class="DataPortal">

        <div class="icon-text">
          <el-icon size="40">
            <Link/>
          </el-icon>
          <span>32<br>Projects</span>
        </div>

        <div class="icon-text">
          <el-icon size="40">
            <Document/>
          </el-icon>
          <span>108<br>Files</span>
        </div>

        <div class="icon-text">
          <el-icon size="40">
            <Folder/>
          </el-icon>
          <span>69<br>Source</span>
        </div>

        <div class="icon-text">
          <el-icon size="40">
            <Coin/>
          </el-icon>
          <span>49023<br>Genes</span>
        </div>


      </div>
    </div>

    <div class="Description">
      <h1>Introduction</h1>
      <p>
        The Circadian Rhythm Database is a comprehensive repository of biological data that captures and organizes
        information related to circadian rhythms. This database serves as a valuable resource for researchers and
        scientists studying the intricate biological processes that govern the daily rhythmic cycles of various
        organisms. By collating data on gene expression patterns over time, the Circadian Rhythm Database facilitates
        the exploration and analysis of circadian rhythms across
        different species and experimental conditions. Researchers can leverage this repository to gain insights into
        the molecular mechanisms underlying circadian regulation, identify key genes and pathways involved in circadian
        processes, and uncover novel connections between circadian rhythms and various physiological functions. The
        Circadian Rhythm Database plays a crucial role in advancing our understanding of circadian biology and its
        implications for health, disease, and chronobiology research.
      </p>
    </div>

  </div>


</template>

<script lang="ts" setup>
import {Link, Document, Folder, Coin} from "@element-plus/icons-vue"
import {useRouter} from 'vue-router'; // 导入路由相关内容

const router = useRouter(); // 获取路由实例

const mus_image = "/images/AiMus.png"
const human_image = "/images/AiHomo.png"
const jumpToPage = (species) => {
  router.push({path: `/home/${species}`});
}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.Summay {
  display: flex;
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  width: 100%;
  height: 100vh
}

.Description {
  align-items: center;
  width: 100%;
  height: 95vh
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
  font-size: 25px; /* 设置字体大小 */
  color: #000; /* 设置字体颜色 */
  margin-top: 6px; /* 设置顶部间距 */
}


.Species {
  display: flex;
  flex-direction: row; /* 垂直布局 */
  justify-content: center;
  align-items: center;
  height: 60vh; /* 设置高度为视口高度，以便垂直居中 */
}

.Species .block {
  width: 280px; /* 设置每个块的宽度 */
  height: 280px; /* 设置每个块的高度 */
  border: 2px solid #272c2c; /* 设置边框样式，1像素宽，颜色为灰色 */
  margin: 20px; /* 设置外边距 */
  border-radius: 15px;
}

.el-image {
  width: 100%; /* 图片宽度占满父元素 */
  height: 100%; /* 图片高度占满父元素 */
  object-fit: cover; /* 图片填充方式，保持比例并填充 */
  border-radius: 15px;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f1313; /* 设置字体颜色为蓝色 */
  font-size: 26px;
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  font-weight: bold; /* 设置字体加粗 */
  margin: 0;
}

h1 {
  justify-content: center;
  align-items: center;
  color: #0f1313; /* 设置字体颜色为蓝色 */
  font-size: 35px;
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  font-weight: bold; /* 设置字体加粗 */
}

p {
  font-size: 18px; /* 设置字体大小 */
  color: #0f1313; /* 设置字体颜色 */
  font-family: sans-serif; /* 设置字体样式为Arial或sans-serif字体 */
  line-height: 1.8; /* 设行高为1.5倍字体大小 */
  text-align: justify; /* 设置文本对齐方式为两端对齐 */
  width: 90%; /* 设置宽度为90% */
//text-indent: 2em;/*首行缩进*/
}


</style>