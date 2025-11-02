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
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件路径" required>
        <el-input
          :model-value="computeRenameOutputPath(task.inputPath, scriptStore.globalRenameParameter.rules)"
          :disabled="true"
          placeholder="请输入文件名称，如果是相对路径，则识别为相对于当前工作路径"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" @click="onSave">保存并关闭</el-button>
      <el-button type="danger" @click="onDelete">删除该项</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { RenameTask } from "@/core/task";
import { computeRenameOutputPath } from "@/utils/rename";
import { useScriptStore } from "@/store";

const scriptStore = useScriptStore();
const props = defineProps<{
  task: RenameTask;
}>();

const task = ref(props.task);

const emits = defineEmits<{
  (e: "update", value: RenameTask): void;
  (e: "delete", value: RenameTask): void;
}>();

// const onInputFileBlur = () => {
//   if (task.value.inputPath && !task.value.outputPath) {
//     task.value.outputPath = getDefaultOutputFilePath(task.value.inputPath);
//   }
// };

const onSave = () => {
  emits("update", task.value);
};

const onDelete = () => {
  emits("delete", task.value);
};
</script>

<style scoped lang="scss"></style>
