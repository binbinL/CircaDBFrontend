<template>
  <div class="container">

    <div class="vertical-radio-group">
      <el-select v-model="data.species" placeholder="please select Species" @change="handleSpeciesChange">
        <el-option label="Human" value="Human"/>
        <el-option label="Mus" value="Mus"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-radio-group v-model="data.omics">
        <el-radio-button label="Transcriptome" value="Transcriptome"/>
        <el-radio-button label="Metabolome" value="Metabolome"/>
        <el-radio-button label="Acetylome" value="Acetylome"/>
        <el-radio-button label="Proteome" value="Proteome"/>
      </el-radio-group>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-select v-model="data.tissue" clearable placeholder="please select Tissue">
        <el-option
            v-for="(item, key) in tissues"
            :key="key"
            :label="key"
            :value="key"
        />
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-autocomplete
          v-model="data.gene"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          placeholder="Please Input Gene"
          @select="handleGeneSelect"
      />
    </div>


  </div>
</template>

<script setup>
import {watch, reactive, ref} from 'vue'
import axios from 'axios'
import genenames from '@/data/genenames.json'

const data = reactive({
  species: '',
  omics: '',
  tissue: '',
  gene: ''
})

const tissues = ref({})
const emits = defineEmits(['getOmics', 'getTissue', 'getGene'])
const genes = reactive({name: []});

function handleSpeciesChange() {
  // 在这里根据选择的物种进行相应的渲染操作
  console.log('Selected species:', data.species);
  // 根据选择的物种进行相应的渲染操作，例如根据不同的物种显示不同的内容

}

watch(() => data.omics, (newValue, oldValue) => {
  console.log('watch-omics', newValue, oldValue)
  axios.get(`/api/omics`, {params: {omics: data.omics}})
      .then(response => {
        tissues.value = response.data.data.tissue_count
        emits('getOmics', response.data.data)
        genes.name = genenames.Mus.genenames

        console.log('left-watch-omic', response.data.data.tissue_count)
      })
      .catch(error => {
        console.error(error);
      })
})
watch(() => data.tissue, (newValue, oldValue) => {
  console.log('watch-tissue', newValue, oldValue)
  if (newValue === undefined) {
    emits('getTissue', {})

  } else {
    axios.get(`/api/omics/tissue`, {params: {omics: data.omics, tissue: data.tissue}})
        .then(response => {
          console.log('left', response.data.data);
          emits('getTissue', response.data.data)
        })
        .catch(error => {
          console.error(error);
        })
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
  // console.log('res', results)
  cb(results)
}

const handleGeneSelect = (item) => {
  console.log('handleGeneSelect', item)
  data.gene = item.value
  console.log(data.omics, data.tissue, data.gene)
  axios.get(`/api/omics/tissue/gene`, {params: {omics: data.omics, tissue: data.tissue || null, gene: data.gene}})
      .then(response => {
        console.log('leftGene', response.data.data);
        emits('getGene', response.data.data)
      })
      .catch(error => {
        console.error(error);
      })

}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
}

.vertical-radio-group {
  display: flex;
  flex-direction: column;
}

/* Optional: Add margin between radio buttons */
.el-radio-button {
  margin-bottom: 5px;
}
</style>