<!--  -->
<template>
  <el-form-item label="静默覆盖同名文件">
    <el-switch v-model="model" />
  </el-form-item>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped lang="scss"></style>
