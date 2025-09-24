<!-- “转换参数”全局设置 -->
<template>
  <div>
    <el-form label-width="150px">
      <el-form-item label="视频编码格式">
        <el-radio-group v-model="scriptStore.globalOptions.videoCodec">
          <el-radio-button value="copy">保持原样</el-radio-button>
          <el-radio-button value="libx264">H.264</el-radio-button>
          <el-radio-button value="libx265">H.265</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="CRF">
        <el-slider
          v-model="scriptStore.globalOptions.crf"
          class="ml-4"
          :min="18"
          :max="28"
          show-input
        />
      </el-form-item>
      <el-form-item label="视频清晰度">
        <el-radio-group v-model="scriptStore.globalOptions.clarity">
          <el-radio-button value="default">保持原样</el-radio-button>
          <el-radio-button value="720P">720P</el-radio-button>
          <el-radio-button value="1080P">1080P</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="音频编码格式">
        <el-radio-group v-model="scriptStore.globalOptions.audioCodec">
          <el-radio-button value="copy">保持原样</el-radio-button>
          <el-radio-button value="aac">AAC</el-radio-button>
          <el-radio-button value="mp3">MP3</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="静默覆盖同名文件">
        <el-switch v-model="scriptStore.globalOptions.overwrite" />
      </el-form-item>
      <el-form-item label="移除源文件">
        <el-switch v-model="scriptStore.globalOptions.removeOrigin" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useScriptStore } from "@/store";

defineOptions({
  name: "GlobalConvertSettings",
});

const scriptStore = useScriptStore();
</script>

<style scoped lang="scss"></style>
