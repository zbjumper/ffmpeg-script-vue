<!-- CRF -->
<template>
  <el-form-item label="CRF">
    <el-slider v-model="model" class="ml-4" :min="18" :max="28" show-input />
  </el-form-item>
</template>

<script setup lang="ts">

const model = defineModel<number>();
</script>

<style scoped lang="scss"></style>
