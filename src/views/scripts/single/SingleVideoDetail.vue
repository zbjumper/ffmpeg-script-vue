<!-- 单视频文件详情页 -->
<template>
  <div>
    <el-form
      ref="form"
      :model="file"
      label-width="180px"
      label-position="top"
      require-asterisk-position="right"
      class="m-4"
    >
      <el-form-item label="输入视频文件路径" required>
        <el-input
          v-model="file.inputPath"
          placeholder="请输入文件路径，如果是相对路径，则识别为相对于当前工作路径"
          @blur="onInputFileBlur"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件路径" required>
        <el-input
          v-model="file.outputPath"
          placeholder="请输入文件名称，如果是相对路径，则识别为相对于当前工作路径"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="设定开始时间">
        <div class="flex flex-row items-center">
          <el-switch v-model="file.startTimeEnable" />
          <time-selector
            v-if="file.startTimeEnable && file.startTime"
            v-model="file.startTime"
          />
        </div>
      </el-form-item>

      <!-- 当开始时间开启时，显示设定结束时间 -->
      <el-form-item label="设定结束时间" v-if="file.startTimeEnable">
        <div class="flex flex-row items-center">
          <el-switch v-model="file.endTimeEnable" />
          <time-selector
            v-if="file.endTimeEnable && file.endTime"
            v-model="file.endTime"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emit('changed', file)"
          >保存并关闭</el-button
        >
        <el-button type="danger" @click="emit('delete', file)">删除该项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import TimeSelector from "@/components/TimeSelector.vue";
import { getDefaultOutputFilePath } from "@/utils/file";

const props = defineProps<{
  file: SingleFileModel;
}>();

const emit = defineEmits<{
  (e: "changed", file: SingleFileModel): void;
  (e: "delete", file: SingleFileModel): void;
}>();

const file = ref(props.file);

const onInputFileBlur = () => {
  if (file.value.inputPath && !file.value.outputPath) {
    file.value.outputPath = getDefaultOutputFilePath(file.value.inputPath);
  }
};

watch(
  () => props.file,
  (newFile) => {
    file.value = newFile;
  }
);

watch(
  () => file.value.startTimeEnable,
  (enable) => {
    if (enable && !file.value.startTime) {
      file.value.startTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }
  }
);

watch(
  () => file.value.endTimeEnable,
  (enable) => {
    if (enable && !file.value.endTime) {
      file.value.endTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }
  }
);
</script>

<style scoped lang="scss"></style>
