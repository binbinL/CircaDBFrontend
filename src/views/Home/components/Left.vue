<template>
  <div class="container">

    <div class="vertical-radio-group">
      <el-select v-model="data.species" placeholder="Please Select Species" @change="handleSpeciesChange">
        <el-option label="Homo" value="Homo"/>
        <el-option label="Mus" value="Mus"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">

      <el-select v-model="data.omics" clearable placeholder="Please Select Omics" @change="handleChange">
        <el-option label="Transcriptome" value="Transcriptome"/>
        <el-option label="Metabolome" value="Metabolome"/>
        <el-option label="Acetylome" value="Acetylome"/>
        <el-option label="Proteome" value="Proteome"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-select v-model="data.tissue" clearable placeholder="Please Select Tissue" @change="handleChange">
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
          @select="handleChange"
      />
    </div>


  </div>
</template>

<script setup>
import {watch, reactive, ref} from 'vue'
import {fetchOmicsData, fetchTissueData, fetchGeneData} from '@/apis/apis'
import genenames from '@/data/genenames.json'

const data = reactive({
  species: '',
  omics: '',
  tissue: '',
  gene: ''
})

const tissues = ref({})
const emits = defineEmits(['getSpecies', 'getOmics', 'getTissue', 'getGene'])
const genes = reactive({name: []});

function handleSpeciesChange() {
  // 在这里根据选择的物种进行相应的渲染操作
  console.log('Selected species:', data.species);
  // 根据选择的物种进行相应的渲染操作，例如根据不同的物种显示不同的内容
  emits('getSpecies', data.species)
}

// onMounted(() => {
//   fetchOmicsData();
// })


const handleChange = () => {
  console.log('Selected omics:', data.omics)
  console.log('Selected tissue:', data.tissue)
  console.log('Selected gene:', data.gene)

  // emits('getGene', data.gene, '')
  if (data.omics !== '' && (data.tissue === '' || data.tissue === undefined) && (data.gene === '' || data.gene === undefined)) {
    emits('getTissue', data.tissue, '')
    fetchOmicsData(data.species, {omics: data.omics})
        .then(response => {
          tissues.value = response.tissue_count
          emits('getOmics', response)
          if (data.species === 'Homo') {
            genes.name = genenames.Homo.genenames
          } else {
            genes.name = genenames.Mus.genenames
          }
        })
        .catch(error => {
          console.log(error);
        })
  } else if (data.tissue !== '' && data.gene === '') {
    fetchTissueData(data.species, {omics: data.omics, tissue: data.tissue})
        .then(response => {
          emits('getTissue', data.tissue, response)
        })
        .catch(error => {
          console.log(error);
        })
  } else {
    fetchGeneData(data.species, {omics: data.omics, tissue: data.tissue || null, gene: data.gene})
        .then(response => {
          emits('getGene', data.species, data.gene, response)
        })
        .catch(error => {
          console.error(error);
        })
  }
}

watch(() => data.gene, (newValue, oldValue) => {
  console.log('newgene', newValue)
  console.log('oldgene', oldValue)
  if (newValue === '') {
    emits('getGene', data.species, data.gene, '')
    if (data.tissue === '' || data.tissue === undefined) {
      emits('getTissue', data.tissue, '')
      fetchOmicsData(data.species, {omics: data.omics})
          .then(response => {
            tissues.value = response.tissue_count
            emits('getOmics', response)
          })
          .catch(error => {
            console.log(error);
          })
    } else {
      fetchTissueData(data.species, {omics: data.omics, tissue: data.tissue})
          .then(response => {
            emits('getTissue', data.tissue, response)
          })
          .catch(error => {
            console.log(error);
          })
    }
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

// const handleGeneSelect = (item) => {
//   console.log('handleGeneSelect', item)
//   data.gene = item.value
//   console.log(data.omics, data.tissue, data.gene)
//   fetchGeneData({omics: data.omics, tissue: data.tissue || null, gene: data.gene})
//       .then(response => {
//         emits('getGene', data.gene, response)
//       })
//       .catch(error => {
//         console.error(error);
//       })
// }

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  flex: 2;
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