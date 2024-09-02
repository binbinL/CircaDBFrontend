<template>
  <div class="container">
    <div class="SearchBox">
      <el-autocomplete
          v-model="gene"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          placeholder="Input Gene"
          @select="handleChange"
      />
    </div>
    <div class="TableBox">
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="GEOAccession__GSE" label="GEOAccession"/>
        <el-table-column prop="GEOAccession__title" label="Title"/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue';
import {useRoute} from 'vue-router'
import {fetchTissueData} from "@/apis/apis.js";
import genenames from "@/data/genenames.json";

const route = useRoute()

const tableData = ref(null)

const species = ref(route.path.split('/')[1])
const omics = ref(route.path.split('/')[2])
const tissue = ref(route.path.split('/')[3])

const gene = ref(null)
const genes = reactive({name: []});

onMounted(() => {
  console.log(species, omics, tissue)
  if (species.value === 'human' && omics.value === 'Transcriptome') {
    genes.name = genenames.Homo.genenames
  } else if (species.value === 'mouse' && omics.value === 'Transcriptome') {
    genes.name = genenames.Mus.genenames
  } else {
    genes.name = null
  }

  fetchTissueData(species.value, {omics: omics.value, tissue: tissue.value})
      .then(response => {
        console.log(response)
        tableData.value = response
      })
      .catch(error => {
        console.log(error);
      })
})

const createFilter = (queryString) => {
  let count = 0;
  return (gene) => {
    if (count >= 10) {
      return false; // 如果已经找到十条匹配项，立即返回false
    }
    if (gene.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
      count++;
      return true;
    }
    return false;
  }
}

const querySearch = (queryString, cb) => {
  const results = queryString ? genes.name.filter(createFilter(queryString)) : genes.name
  cb(results)
}

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
//justify-content: center; align-items: center; height: 100vh; /* 让容器铺满整个视口高度 */
}

.TableBox {
  height: 100%;
  width: 80%;
}

.SearchBox {
  width: 80%; /* 设置宽度 */
  margin: 10px; /* 设置间距 */
  padding: 16px 16px 16px 16px;
  border: 0;
}

.el-input__wrapper {
  width: 80%; /* 设置宽度 */
  margin: 10px; /* 设置间距 */
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px 16px 16px 16px;
  border-radius: 40px;
}
.SearchBox input::placeholder {
  color: #0f1313; /* 设置placeholder的颜色为红色 */
  font-style: italic; /* 设置placeholder的字体为斜体 */
  font-size: 16px; /* 设置placeholder的字体大小为14像素 */
}

</style>