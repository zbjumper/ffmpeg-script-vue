<!-- 单视频文件详情页 -->
<template>
  <div>
    <el-form
      ref="form"
      :model="task"
      label-width="180px"
      label-position="top"
      require-asterisk-position="right"
      class="m-4"
    >
      <el-form-item label="输入视频文件路径" required>
        <el-input
          v-model="task.inputPath"
          placeholder="请输入文件路径，如果是相对路径，则识别为相对于当前工作路径"
          @blur="onInputFileBlur"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件路径" required>
        <el-input
          v-model="task.outputPath"
          placeholder="请输入文件名称，如果是相对路径，则识别为相对于当前工作路径"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="设定开始时间">
        <div class="flex flex-row items-center">
          <el-switch v-model="startTimeEnable" />
          <time-selector v-if="startTimeEnable && task.startTime" v-model="task.startTime" />
        </div>
      </el-form-item>

      <!-- 当开始时间开启时，显示设定结束时间 -->
      <el-form-item label="设定结束时间" v-if="startTimeEnable">
        <div class="flex flex-row items-center">
          <el-switch v-model="endTimeEnable" />
          <time-selector v-if="endTimeEnable && task.endTime" v-model="task.endTime" />
        </div>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" @click="onSave">保存并关闭</el-button>
      <el-button type="danger" @click="onDelete">删除该项</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import TimeSelector from "@/components/TimeSelector.vue";
import { getDefaultOutputFilePath } from "@/utils/file";
import type { ConvertTask } from "@/core/task";

const props = defineProps<{
  task: ConvertTask;
}>();

const task = ref(props.task);

const emits = defineEmits<{
  (e: "update", value: ConvertTask): void;
  (e: "delete", value: ConvertTask): void;
}>();

const onInputFileBlur = () => {
  if (task.value.inputPath && !task.value.outputPath) {
    task.value.outputPath = getDefaultOutputFilePath(task.value.inputPath);
  }
};

const startTimeEnable = computed({
  get: () => !!task.value.startTime,
  set: (val: boolean) => {
    if (val) {
      task.value.startTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    } else {
      delete task.value.startTime;
      delete task.value.endTime;
    }
  },
});

const endTimeEnable = computed({
  get: () => !!task.value.endTime,
  set: (val: boolean) => {
    if (val) {
      task.value.endTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    } else {
      delete task.value.endTime;
    }
  },
});

const onSave = () => {
  emits("update", task.value);
};

const onDelete = () => {
  emits("delete", task.value);
};
</script>

<style scoped lang="scss"></style>
