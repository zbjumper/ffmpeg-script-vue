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
          <el-switch v-model="startTimeEnable" />
          <time-selector
            v-if="startTimeEnable && file.startTime"
            v-model="file.startTime"
          />
        </div>
      </el-form-item>

      <!-- 当开始时间开启时，显示设定结束时间 -->
      <el-form-item label="设定结束时间" v-if="startTimeEnable">
        <div class="flex flex-row items-center">
          <el-switch v-model="endTimeEnable" />
          <time-selector
            v-if="endTimeEnable && file.endTime"
            v-model="file.endTime"
          />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TimeSelector from "@/components/TimeSelector.vue";
import { getDefaultOutputFilePath } from "@/utils/file";
import type { ConvertParameter } from "@/core/task";

const file = defineModel<ConvertParameter>({
  type: Object,
  required: true,
});
// const props = defineProps<{
//   file: SingleFileModel;
// }>();

// const file = ref(props.file);

const onInputFileBlur = () => {
  if (file.value.inputPath && !file.value.outputPath) {
    file.value.outputPath = getDefaultOutputFilePath(file.value.inputPath);
  }
};

// watch(
//   () => props.file,
//   (newFile) => {
//     file.value = newFile;
//   }
// );

const startTimeEnable = ref({
  getter: () => !!file.value.startTime,
  setter: (val: boolean) => {
    if (val) {
      file.value.startTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    } else {
      delete file.value.startTime;
      delete file.value.endTime;
    }
  },
})

const endTimeEnable = ref({
  getter: () => !!file.value.endTime,
  setter: (val: boolean) => {
    if (val) {
      file.value.endTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    } else {
      delete file.value.endTime;
    }
  },
});
</script>

<style scoped lang="scss"></style>
