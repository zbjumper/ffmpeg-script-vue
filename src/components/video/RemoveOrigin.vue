<!-- 移除源文件编辑项 -->
<template>
  <el-form-item label="移除源文件">
    <el-switch v-model="model" />
  </el-form-item>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped lang="scss"></style>
