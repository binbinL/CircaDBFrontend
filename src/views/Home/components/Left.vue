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
      <el-select v-model="data.tissue" placeholder="please select Tissue">
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
          clearable
          placeholder="Please Input Gene"
          @select="handleSelect"
      />
    </div>


  </div>
</template>

<script setup>
import {watch, reactive, ref} from 'vue'
import axios from 'axios'

const data = reactive({
  species: '',
  omics: '',
  tissue: '',
  gene: ''
})

const tissues = ref({})
const emits = defineEmits(['getOmics', 'getTissue'])
const genes = reactive([]);

function handleSpeciesChange() {
  // 在这里根据选择的物种进行相应的渲染操作
  console.log('Selected species:', data.species);
  // 根据选择的物种进行相应的渲染操作，例如根据不同的物种显示不同的内容

}

watch(() => data.omics, (newValue, oldValue) => {
  console.log('watch-omics', newValue, oldValue)
  axios.get(`/api/${data.omics}`)
      .then(response => {
        console.log('left', response.data);
        tissues.value = response.data.data.tissue_count
        emits('getOmics', response.data.data)
        genes.splice(0, genes.length, ...response.data.data.genenames)
        console.log(genes.value)
      })
      .catch(error => {
        console.error(error);
      })
})
watch(() => data.tissue, (newValue, oldValue) => {
  console.log('watch-tissue', newValue, oldValue)
  axios.get(`/api/${data.omics}/${data.tissue}`)
      .then(response => {
        console.log('left', response.data.data);
        emits('getTissue', response.data.data)
      })
      .catch(error => {
        console.error(error);
      })
})

const createFilter = (queryString) => {
  return (gene) => {
    console.log('createFilter', queryString, gene)
    return gene.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const querySearch = (queryString, cb) => {
  const results = queryString ? genes.filter(createFilter(queryString)) : genes
  console.log('res', results)
  cb(results)
}

const handleSelect = (item) => {
  console.log(item)
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