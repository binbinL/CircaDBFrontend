<script setup>
import {ref, reactive, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router'

import genenames from "@/data/genenames.json";

const router = useRouter(); // 获取路由实例
const route = useRoute()

const species = ref(null)
const omics = ref(null)
const tissue = ref(null)
const gse = ref(null)
const gene = ref(null)
const genes = reactive({name: []});

if (route.path.split('/')[1] === 'details') {
  species.value = route.path.split('/')[2]
  omics.value = route.path.split('/')[3]
  gse.value = route.path.split('/')[4]
  gene.value = route.path.split('/')[5]
} else {
  species.value = route.path.split('/')[2]
  omics.value = route.path.split('/')[3]
  tissue.value = route.path.split('/')[4]
}


onMounted(() => {
  console.log(species, omics, tissue)
  if (species.value === 'human' && omics.value === 'Transcriptome') {
    genes.name = genenames.Homo.genenames
  } else if (species.value === 'mouse' && omics.value === 'Transcriptome') {
    genes.name = genenames.Mus.genenames
  } else {
    genes.name = null
  }
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
const handleChange = () => {
  if (route.path.split('/')[1] === 'home') {
    router.push({path: `/home/${species.value}/${omics.value}/${tissue.value}/${gene.value}`});
  } else {
    router.push({path: `/details/${species.value}/${omics.value}/${gse.value}/${gene.value}`});
  }

}
</script>

<template>
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
</template>

<style scoped>
.SearchBox {
  width: 80%; /* 设置宽度 */
  padding: 16px 16px 16px 16px;
  border: 0;
  margin: 0 auto;
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