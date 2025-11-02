<!-- 视频编码格式选择 -->
<template>
  <el-form-item label="视频编码格式">
    <el-radio-group v-model="model">
      <el-radio-button value="copy">保持原样</el-radio-button>
      <el-radio-button value="libx264">H.264</el-radio-button>
      <el-radio-button value="libx265">H.265</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import type { VideoCodec } from '@/core/basic';

defineOptions({
  name: "VideoCodec",
});

const model = defineModel<VideoCodec>();
</script>

<style scoped lang="scss"></style>
