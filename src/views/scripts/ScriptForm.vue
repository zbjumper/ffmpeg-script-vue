<!-- 脚本表单 -->
<template>
  <div class="w-[640px]">
    <el-form>
      <el-form-item label="输入视频文件文件名">
        <el-input
          v-model="form.inputFileName"
          placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件文件名">
        <el-input
          v-model="form.outputFileName"
          placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onCopyScript">复制到剪切板</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div>{{ output }}</div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, reactive } from "vue";

const form = reactive({
  inputFileName: "",
  outputFileName: "",
});

const onCopyScript = () => {
  // 将命令拷贝到剪切板
  navigator.clipboard.writeText(output.value);
  ElMessage.success("已复制到剪切板");
};
const resetForm = () => {
  form.inputFileName = "";
  form.outputFileName = "";
};

const output = computed(() => {
  if (form.inputFileName || form.outputFileName) {
    return `ffmpeg -i ${form.inputFileName} -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k -y ${form.outputFileName}`;
  } else {
    return "";
  }
});
</script>

<style scoped lang="scss"></style>
