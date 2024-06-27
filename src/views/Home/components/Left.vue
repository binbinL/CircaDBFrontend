<template>
  <div class="container">

    <div class="vertical-radio-group">
      <el-select v-model="species" placeholder="please select Species">
        <el-option label="Human" value="Human"/>
        <el-option label="Mus" value="Mus"/>
      </el-select>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-radio-group v-model="omics">
        <el-radio-button label="Transcriptome" value="Transcriptome"/>
        <el-radio-button label="Metabolome" value="Metabolome"/>
        <el-radio-button label="Acetylome" value="Acetylome"/>
        <el-radio-button label="Proteome" value="Proteome"/>
      </el-radio-group>
    </div>

    <div style="margin-top: 20px" class="vertical-radio-group">
      <el-select v-model="tissue" placeholder="please select Tissue">
        <el-option label="Liver" value="Human"/>
        <el-option label="Brain" value="Mus"/>
      </el-select>
    </div>


  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'


const omics = ref('Transcriptome')
const species = ref('Mus')
const tissue = ref('Human')

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