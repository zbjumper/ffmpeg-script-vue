<!-- 脚本表单 -->
<template>
  <div class="w-[1280px]">
    <el-form label-width="180px" class="m-4">
      <el-form-item label="文件列表" required>
        <div class="flex items-center flex-wrap">
          <template
            v-if="scriptStore.files.length > 0"
            v-for="file in scriptStore.files"
            :key="file.id"
          >
            <div
              v-if="file.modelType == 'control'"
              class="mx-2 mb-2 w-[280px] h-[100px] border border-gray-300 rounded-lg flex flex-col items-center justify-center"
            >
              <div>
                <el-button type="primary" icon="Upload" @click="onChooseFiles"
                  >选择文件</el-button
                >
              </div>
              <div>
                <el-button
                  type="primary"
                  color="pink"
                  icon="Plus"
                  @click="showDrawer(-1)"
                  >手动添加</el-button
                >
              </div>
            </div>
            <!-- 单个视频的缩略图 -->
            <single-video-thumbnail
              v-else
              :file="file"
              @click="showDrawer(scriptStore.files.indexOf(file))"
            />
          </template>
        </div>
      </el-form-item>
      <el-form-item label="全局默认通用参数">
        <div class="flex flex-row items-center mb-2 w-full flex-nowrap">
          <div class="grow border border-gray-300 rounded-lg p-4">
            <div>视频参数</div>
            <el-select
              v-model="scriptStore.globalOptions.videoCodec"
              placeholder="选择视频编解码器"
              style="width: 200px"
            >
              <el-option label="H.264 (libx264)" value="libx264" />
              <el-option label="H.265 (libx265)" value="libx265" />
              <!-- <el-option label="AV1 (libaom-av1)" value="libaom-av1" />
              <el-option label="VP9 (libvpx-vp9)" value="libvpx-vp9" /> -->
            </el-select>
            <div class="flex flex-row items-center mt-4">
              <div>CRF</div>
              <el-slider
                v-model="scriptStore.globalOptions.crf"
                class="ml-4"
                :min="18"
                :max="28"
                show-input
              />
            </div>
          </div>
          <div class="grow border border-gray-300 rounded-lg p-4 ml-4">
            <div>音频参数</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="静默覆盖同名文件">
        <el-switch v-model="scriptStore.globalOptions.overwrite" />
      </el-form-item>
      <el-form-item label="移除源文件">
        <div>
          <el-switch v-model="scriptStore.globalOptions.removeOrigin" />
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
    <el-drawer
      v-model="isDrawerShow"
      :size="'960px'"
      :with-header="false"
      direction="rtl"
    >
      <SingleVideoDetail
        v-if="inEditingFile"
        :file="inEditingFile"
        @changed="onEditorChanged"
        @delete="onDelete"
      />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useScriptStore } from "@/store/";
import SingleVideoDetail from "./single/SingleVideoDetail.vue";
import SingleVideoThumbnail from "./single/SingleVideoThumbnail.vue";
import { ref } from "vue";
import { v4 as uuid } from "uuid";
import { getDefaultOutputFilePath } from "@/utils/file";

const scriptStore = useScriptStore();

const isDrawerShow = ref(false);
const inEditingFile = ref<SingleFileModel | null>(null);

const showDrawer = (index: number) => {
  if (index >= 0) {
    inEditingFile.value = scriptStore.files[index] as SingleFileModel;
  } else {
    inEditingFile.value = {
      id: uuid(),
      inputPath: "",
      outputPath: "",
      modelType: "file",
      startTimeEnable: false,
      endTimeEnable: false,
    };
  }
  isDrawerShow.value = true;
};

const onEditorChanged = (file: SingleFileModel) => {
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

const onDelete = (file: SingleFileModel) => {
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
          scriptStore.files.splice(scriptStore.files.length - 1, 0, {
            id: uuid(),
            inputPath: file.name,
            outputPath: getDefaultOutputFilePath(file.name),
            modelType: "file",
            isAdd: false,
            startTimeEnable: false,
            endTimeEnable: false,
            removeOrigin: false,
            commonOptions: {},
          } as SingleFileModel);
        }
      }
    })
    .catch((err: any) => {
      console.log("用户取消选择文件", err);
    });
};
</script>

<style scoped lang="scss"></style>
