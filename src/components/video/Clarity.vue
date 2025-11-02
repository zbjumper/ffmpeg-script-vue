<!-- 视频清晰度 -->
<template>
  <el-form-item label="视频清晰度">
    <el-radio-group v-model="model">
      <el-radio-button value="default">保持原样</el-radio-button>
      <el-radio-button value="720P">720P</el-radio-button>
      <el-radio-button value="1080P">1080P</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import type { Clarity } from '@/core/basic';

const model = defineModel<Clarity>();
</script>

<style scoped lang="scss"></style>
