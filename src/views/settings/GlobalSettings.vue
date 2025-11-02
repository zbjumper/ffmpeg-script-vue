<!-- 全局设置样板 -->
<template>
  <el-row :gutter="0">
    <el-col :span="6">
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        default-active="convert"
      >
        <el-menu-item index="convert">
          <span>转换任务默认参数</span>
        </el-menu-item>
        <el-menu-item index="rename">
          <span>重命名任务默认参数</span>
        </el-menu-item>
        <el-menu-item index="snapshot">
          <span>截图任务默认参数</span>
        </el-menu-item>
        <el-menu-item index="concat">
          <span>拼接任务默认参数</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <template v-if="showPanel === 'convert'"><GlobalConvertSettings /></template>
      <template v-else-if="showPanel === 'rename'"><GlobalRenameSettings /></template>
      <template v-else-if="showPanel === 'snapshot'">截图任务默认参数设置面板</template>
      <template v-else-if="showPanel === 'concat'">拼接任务默认参数设置面板</template>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GlobalConvertSettings from "@/views/settings/items/GlobalConvertSettings.vue";
import GlobalRenameSettings from "@/views/settings/items/GlobalRenameSettings.vue";

const showPanel = ref<"convert" | "snapshot" | "concat" | "rename">("convert");

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  showPanel.value = key as "convert" | "snapshot" | "concat" | "rename";
};
</script>

<style scoped lang="scss"></style>
