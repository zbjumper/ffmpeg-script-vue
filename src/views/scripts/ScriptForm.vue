<!-- 脚本表单 -->
<template>
  <div class="w-[1280px]">
    <el-form label-width="180px" class="m-4">
      <el-form-item label="当前工作路径">
        <el-input
          v-model="scriptStore.cwd"
          placeholder="请输入当前工作路径"
          clearable
          class="flex-1 mr-2"
        ></el-input>
      </el-form-item>
      <el-form-item label="输入视频文件文件名" required>
        <el-input
          v-model="scriptStore.inputFileName"
          placeholder="请输入文件名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件文件名">
        <el-input
          v-model="scriptStore.outputFileName"
          placeholder="请输入文件名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="设定开始时间">
        <div>
          <el-switch v-model="scriptStore.startTimeEnable" />
          <time-selector
            v-if="scriptStore.startTimeEnable"
            v-model="scriptStore.startTime"
          />
        </div>
      </el-form-item>

      <!-- 当开始时间开启时，显示设定结束时间 -->
      <el-form-item label="设定结束时间" v-if="scriptStore.startTimeEnable">
        <div>
          <el-switch v-model="scriptStore.endTimeEnable" />
          <time-selector
            v-if="scriptStore.endTimeEnable"
            v-model="scriptStore.endTime"
          />
        </div>
      </el-form-item>
      <el-form-item label="CRF">
        <el-slider v-model="scriptStore.crf" :min="18" :max="28" show-input />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCopyScript">复制到剪切板</el-button>
        <el-button @click="scriptStore.reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div>{{ scriptStore.outputScript }}</div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import TimeSelector from "@/components/TimeSelector.vue";
import { useScriptStore } from "@/store/";

const scriptStore = useScriptStore();

const onCopyScript = () => {
  // 将命令拷贝到剪切板
  navigator.clipboard.writeText(scriptStore.outputScript);
  ElMessage("已复制到剪切板");
};
</script>

<style scoped lang="scss"></style>
