<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">

    <el-form-item label="Species">
      <el-select v-model="form.species" placeholder="please select omics">
        <el-option label="Human" value="Transcriptome"/>
        <el-option label="Mus" value="Metabolome"/>

      </el-select>
    </el-form-item>
    <el-form-item label="Omics">
      <el-select v-model="form.omics" placeholder="please select omics">
        <el-option label="Transcriptome" value="Transcriptome"/>
        <el-option label="Metabolome" value="Metabolome"/>
        <el-option label="Acetylome" value="Acetylome"/>
        <el-option label="Proteome" value="Proteome"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Tissue">
      <el-select v-model="form.tissue" placeholder="please select tissue">
        <el-option label="Transcriptome" value="Transcriptome"/>
        <el-option label="Metabolome" value="Metabolome"/>
        <el-option label="Acetylome" value="Acetylome"/>
        <el-option label="Proteome" value="Proteome"/>
      </el-select>
    </el-form-item>


    <el-form-item label="Genes">
      <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="querySearch"
          clearable
          placeholder="Please Input"
          @select="handleSelect"
      />
    </el-form-item>

    <el-form-item justify="center">
      <el-button type="primary" @click="onSubmit" style="margin: 0 auto;">Search</el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>

import {reactive, onMounted, ref} from 'vue'

// do not use same name with ref
const form = reactive({
  name: [],
  omics: '',
  tissue: '',
  species: ''

})

const onSubmit = () => {
  console.log('submit!')
}


interface RestaurantItem {
  value: string
  link: string
}

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    {value: 'vue', link: 'https://github.com/vuejs/vue'},
    {value: 'element', link: 'https://github.com/ElemeFE/element'},
    {value: 'cooking', link: 'https://github.com/ElemeFE/cooking'},
    {value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui'},
    {value: 'vuex', link: 'https://github.com/vuejs/vuex'},
    {value: 'vue-router', link: 'https://github.com/vuejs/vue-router'},
    {value: 'babel', link: 'https://github.com/babel/babel'},
  ]
}
const handleSelect = (item: RestaurantItem) => {
  console.log(item)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>
