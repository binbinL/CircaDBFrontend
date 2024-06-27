<template>
  <div class="container">

    <div class="vertical-radio-group">
      <el-select v-model="data.species" placeholder="please select Species">
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

        <!--                <el-option label="Liver" value="Liver"/>-->
        <!--                <el-option label="Brain" value="Brain"/>-->
      </el-select>
    </div>

    <!--    <div style="margin-top: 20px" class="vertical-radio-group">-->
    <!--      <el-autocomplete-->
    <!--          v-model="form.name"-->
    <!--          :fetch-suggestions="querySearch"-->
    <!--          clearable-->
    <!--          placeholder="Please Input"-->
    <!--          @select="handleSelect"-->
    <!--      />-->
    <!--    </div>-->


  </div>
</template>

<script lang="ts" setup>
import {watch, reactive, ref} from 'vue'
import axios from 'axios'

const data = reactive({
  species: 'Mus',
  omics: 'Transcriptome',
  tissue: 'Liver'
})

const tissues = ref({})

watch(() => data.species, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
watch(() => data.omics, (newValue, oldValue) => {
  console.log(newValue, oldValue)
  axios.get(`/api/${data.omics}`)
      .then(response => {
        console.log(response.data);
        tissues.value = response.data
      })
      .catch(error => {
        console.error(error);
      })
})
watch(() => data.tissue, (newValue, oldValue) => {
  console.log(newValue, oldValue)
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