<!-- “转换参数”全局设置 -->
<template>
  <div>
    <el-form label-width="150px">
      <video-codec v-model="scriptStore.globalOptions.videoCodec" />
      <crf v-model="scriptStore.globalOptions.crf" />
      <clarity v-model="scriptStore.globalOptions.clarity" />
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
import VideoCodec from "@/components/video/VideoCodec.vue";
import Crf from "@/components/video/Crf.vue";
import Clarity from "@/components/video/Clarity.vue";

defineOptions({
  name: "GlobalConvertSettings",
});

const scriptStore = useScriptStore();
</script>

<style scoped lang="scss"></style>
