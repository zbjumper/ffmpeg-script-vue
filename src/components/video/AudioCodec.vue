<!-- 音频编码格式 -->
<template>
  <el-form-item label="音频编码格式">
    <el-radio-group v-model="model">
      <el-radio-button value="copy">保持原样</el-radio-button>
      <el-radio-button value="aac">AAC</el-radio-button>
      <el-radio-button value="mp3">MP3</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
const model = defineModel<AudioCodec>();
</script>

<style scoped lang="scss"></style>
