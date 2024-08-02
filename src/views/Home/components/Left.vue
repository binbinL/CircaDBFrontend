<template>
  <div class="container">

    <div class="vertical-radio-group">
      <el-select v-model="data.species" placeholder="please select Species" @change="handleSpeciesChange">
        <el-option label="Human" value="Human"/>
        <el-option label="Mus" value="Mus"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <!--      <el-radio-group v-model="data.omics">-->
      <!--        <el-radio-button label="Transcriptome" value="Transcriptome"/>-->
      <!--        <el-radio-button label="Metabolome" value="Metabolome"/>-->
      <!--        <el-radio-button label="Acetylome" value="Acetylome"/>-->
      <!--        <el-radio-button label="Proteome" value="Proteome"/>-->
      <!--      </el-radio-group>-->
      <el-select v-model="data.omics" placeholder="please select Omics" @change="handleOmicAndTissueChange">
        <el-option label="Transcriptome" value="Transcriptome"/>
        <el-option label="Metabolome" value="Metabolome"/>
        <el-option label="Acetylome" value="Acetylome"/>
        <el-option label="Proteome" value="Proteome"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-select v-model="data.tissue" clearable placeholder="please select Tissue" @change="handleOmicAndTissueChange">
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
import {watch, reactive, ref, onMounted} from 'vue'
import {fetchOmicsData, fetchTissueData, fetchGeneData} from '@/apis/apis'
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

// onMounted(() => {
//   fetchOmicsData();
// })

// const handleOmicChange = () => {
//   console.log('Selected omics:', data.omics)
//   fetchOmicsData({omics: data.omics})
//       .then(response => {
//         console.log('left', response.tissue_count)
//         tissues.value = response.tissue_count
//         emits('getOmics', response)
//         genes.name = genenames.Mus.genenames//写死的Mus
//         console.log('left', response)
//       })
//       .catch(error => {
//         console.log(error);
//       })
// }

const handleOmicAndTissueChange = () => {
  console.log('Selected omics:', data.omics)
  console.log('Selected tissue:', data.tissue)
  if (data.tissue === undefined || data.tissue === '') {
    emits('getTissue', data.tissue, {})
    fetchOmicsData({omics: data.omics})
        .then(response => {
          console.log('left', response.tissue_count)
          tissues.value = response.tissue_count
          emits('getOmics', response)
          genes.name = genenames.Mus.genenames//写死的Mus
          console.log('left', response)
        })
        .catch(error => {
          console.log(error);
        })
  } else {
    fetchTissueData({omics: data.omics, tissue: data.tissue})
        .then(response => {
          emits('getTissue', data.tissue, response)
        })
        .catch(error => {
          console.log(error);
        })
  }

}

// watch(() => data.tissue, (newValue, oldValue) => {
//   if (newValue === undefined) {
//     emits('getTissue', data.tissue, {})
//
//   } else {
//     axios.get(`/api/omics/tissue`, {params: {omics: data.omics, tissue: data.tissue}})
//         .then(response => {
//           emits('getTissue', data.tissue, response.data.data)
//         })
//         .catch(error => {
//           console.error(error);
//         })
//   }
//
// })

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

const handleGeneSelect = (item) => {
  console.log('handleGeneSelect', item)
  data.gene = item.value
  console.log(data.omics, data.tissue, data.gene)
  fetchGeneData({omics: data.omics, tissue: data.tissue || null, gene: data.gene})
      .then(response => {
        emits('getGene', data.gene, response)
      })
      .catch(error => {
        console.error(error);
      })
  // axios.get(`/api/omics/tissue/gene`, {params: {omics: data.omics, tissue: data.tissue || null, gene: data.gene}})
  //     .then(response => {
  //       console.log('leftGene', response.data.data);
  //       emits('getGene', data.gene, response.data.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
}
watch(() => data.gene, (newValue, oldValue) => {
  console.log('watch-newgene', newValue)
  console.log('watch-oldgene', oldValue)
  if (newValue === '' && data.tissue !== '') {
    emits('getGene', data.gene, {})
  } else if (newValue === '' && data.tissue === '') {
    console.log('GGG')
  }
})
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