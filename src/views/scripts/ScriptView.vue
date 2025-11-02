<!-- 脚本表单 -->
<template>
  <div class="w-full">
    <el-form label-width="120px" class="m-4">
      <el-form-item label="操作内容" prop="">
        <div class="flex flex-row justify-start">
          <el-dropdown split-button type="primary" @command="handleConvertTask">
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
            v-if="scriptStore.tasks.length > 0"
            v-for="(task, index) in scriptStore.tasks"
            :key="task.id"
          >
            <template v-if="task.type == 'convert'">
              <ConvertTaskThumbnail :file="task" @click="showEditorDialog(index)" />
            </template>
            <template v-if="task.type == 'rename'">
              <RenameTaskThumbnail :file="task" @click="showEditorDialog(index)" />
            </template>
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
      v-if="editingTask"
      title="新建/编辑"
      width="600px"
      v-model="showEditingDialog"
      @close="() => {}"
    >
      <template v-if="editingTask.type == 'convert'">
        <ConvertTaskEditor :task="editingTask" @update="onUpdateTask" @delete="onDeleteTask" />
      </template>
      <template v-if="editingTask.type == 'rename'">
        <RenameTaskEditor :task="editingTask" @update="onUpdateTask" @delete="onDeleteTask" />
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useScriptStore } from "@/store/";
import ConvertTaskEditor from "../tasks/convert/ConvertTaskEditor.vue";
import RenameTaskEditor from "../tasks/rename/RenameTaskEditor.vue";
import ConvertTaskThumbnail from "../tasks/convert/ConvertTaskThumbnail.vue";
import RenameTaskThumbnail from "../tasks/rename/RenameTaskThumbnail.vue";
import { computed, ref } from "vue";
import { v4 as uuid } from "uuid";
import { getDefaultOutputFilePath } from "@/utils/file";
import type { ConvertTask, RenameTask, SingletonTask } from "@/core/task";
import { defaultConvertGlobalParameter, defaultRenameGlobalParameter } from "@/constant";
import { match } from "ts-pattern";

const scriptStore = useScriptStore();

const editingTask = ref<SingletonTask | null>(null);

const showEditingDialog = computed({
  get: () => editingTask.value !== null,
  set: (val: boolean) => {
    if (!val) {
      editingTask.value = null;
    }
  },
});

const showEditorDialog = (index: number) => {
  if (index >= 0 && index < scriptStore.tasks.length) {
    editingTask.value = scriptStore.tasks[index]!;
  } else {
    editingTask.value = {
      id: uuid(),
      inputPath: "",
      outputPath: "",
      ...defaultConvertGlobalParameter,
    };
  }
};

const onUpdateTask = (file: SingletonTask) => {
  const idx = scriptStore.tasks.findIndex((f) => f.id === file.id);
  if (idx >= 0) {
    // 修改已有的文件
    scriptStore.tasks[idx] = file;
  } else {
    // 添加新的文件
    scriptStore.tasks.splice(scriptStore.tasks.length - 1, 0, file);
  }
  editingTask.value = null;
};

const onDeleteTask = (file: SingletonTask) => {
  const idx = scriptStore.tasks.findIndex((f) => f.id === file.id);
  if (idx >= 0) {
    scriptStore.tasks.splice(idx, 1);
  }
  editingTask.value = null;
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

const handleConvertTask = (command: string) => {
  if (command === "choose-files") {
    onChooseFiles("convert");
  } else if (command === "manual-add") {
    showEditorDialog(-1);
  }
};

const handleRenameTask = () => {
  onChooseFiles("rename");
};

const onChooseFiles = (taskType: "convert" | "rename") => {
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
          const task = match<"convert" | "rename", SingletonTask>(taskType)
            .with("convert", () => {
              const item: ConvertTask = {
                id: uuid(),
                inputPath: file.name,
                outputPath: getDefaultOutputFilePath(file.name),
                ...defaultConvertGlobalParameter,
              };
              return item;
            })
            .with("rename", () => {
              const item: RenameTask = {
                id: uuid(),
                inputPath: file.name,
                ...defaultRenameGlobalParameter,
              };
              return item;
            })
            .exhaustive();

          scriptStore.tasks.push(task);
        }
      }
    })
    .catch((err: any) => {
      console.log("用户取消选择文件", err);
    });
};
</script>

<style scoped lang="scss"></style>
