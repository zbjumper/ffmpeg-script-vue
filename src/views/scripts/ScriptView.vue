<!-- 脚本表单 -->
<template>
  <div class="w-[1280px]">
    <el-form label-width="120px" class="m-4">
      <el-form-item label="操作内容" prop="">
        <div class="flex flex-row justify-start">
          <el-dropdown split-button type="primary" @command="handleCommand">
            添加转换任务
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="choose-files">选择文件(支持多选)</el-dropdown-item>
                <el-dropdown-item command="manual-add">手动添加</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button class="ml-2" type="primary" @click="handleRenameTask"
            >添加重命名任务</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="任务列表" required>
        <div class="flex items-center flex-wrap">
          <template
            v-if="scriptStore.files.length > 0"
            v-for="file in scriptStore.files"
            :key="file.id"
          >
            <ConvertTaskThumbnail
              :file="file"
              @click="showDrawer(scriptStore.files.indexOf(file))"
            />
          </template>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onCopyScript"
          :disabled="scriptStore.outputScript.length == 0"
          >复制到剪切板</el-button
        >
        <el-button @click="scriptStore.reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div>{{ scriptStore.outputScript }}</div>
    <el-dialog
      v-if="inEditingFile"
      title="新建/编辑"
      width="600px"
      v-model="isDrawerShow"
      @close="() => {}"
    >
      <ConvertTaskEditor :task="inEditingFile" @update="onUpdateTask" @delete="onDelete" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useScriptStore } from "@/store/";
import ConvertTaskEditor from "../tasks/convert/ConvertTaskEditor.vue";
import ConvertTaskThumbnail from "../tasks/convert/ConvertTaskThumbnail.vue";
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import { getDefaultOutputFilePath } from "@/utils/file";
import type { ConvertTask } from "@/core/task";
import { defaultConvertGlobalParameter } from "@/constant";

const scriptStore = useScriptStore();

const isDrawerShow = ref(false);
const inEditingFile = ref<ConvertTask | null>(null);

const showDrawer = (index: number) => {
  if (index >= 0 && index < scriptStore.files.length) {
    inEditingFile.value = scriptStore.files[index]!;
  } else {
    inEditingFile.value = {
      id: uuid(),
      type: "convert",
      inputPath: "",
      outputPath: "",
      ...defaultConvertGlobalParameter,
    };
  }
  isDrawerShow.value = true;
};

const onUpdateTask = (file: ConvertTask) => {
  const idx = scriptStore.files.findIndex((f) => f.id === file.id);
  if (idx >= 0) {
    // 修改已有的文件
    scriptStore.files[idx] = file;
  } else {
    // 添加新的文件
    scriptStore.files.splice(scriptStore.files.length - 1, 0, file);
  }
  isDrawerShow.value = false;
};

const onDelete = (file: ConvertTask) => {
  const idx = scriptStore.files.findIndex((f) => f.id === file.id);
  if (idx >= 0) {
    scriptStore.files.splice(idx, 1);
  }
  isDrawerShow.value = false;
};

const onCopyScript = () => {
  // 将命令拷贝到剪切板
  navigator.clipboard
    .writeText(scriptStore.outputScript)
    .then(() => {
      ElMessage.success("已复制到剪切板");
    })
    .catch(() => {
      ElMessage.error("复制失败，请手动复制");
    });
};

const handleCommand = (command: string) => {
  if (command === "choose-files") {
    onChooseFiles();
  } else if (command === "manual-add") {
    showDrawer(-1);
  }
};

const handleRenameTask = () => {
  // scriptStore.addRenameTask();
};

const onChooseFiles = () => {
  window
    .showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: "媒体文件",
          accept: {
            "video/*": [".mp4", ".mkv", ".avi", ".mov", ".flv", ".wmv"],
          },
        },
      ],
    } as any)
    .then(async (fileHandles: any) => {
      for (const fileHandle of fileHandles) {
        const file = await fileHandle.getFile();
        if (file) {
          const item: ConvertTask = {
            id: uuid(),
            type: "convert",
            inputPath: file.name,
            outputPath: getDefaultOutputFilePath(file.name),
            ...defaultConvertGlobalParameter,
          };
          scriptStore.files.push(item);
        }
      }
    })
    .catch((err: any) => {
      console.log("用户取消选择文件", err);
    });
};
</script>

<style scoped lang="scss"></style>
