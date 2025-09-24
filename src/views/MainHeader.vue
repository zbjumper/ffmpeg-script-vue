<!-- 顶部 -->
<template>
  <div class="flex flex-row items-center">
    <div>脚本</div>
    <el-button class="!ml-4" plain @click="dialogFormVisible = true"> 全局设置 </el-button>

    <el-dialog
      title="全局设置"
      v-model="dialogFormVisible"
      width="50%"
      :before-close="
        () => {
          dialogFormVisible = false;
        }
      "
    >
      <global-settings />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GlobalSettings from "./settings/GlobalSettings.vue";

const dialogFormVisible = ref(false);
</script>

<style scoped lang="scss"></style>
