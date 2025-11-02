<!-- 单个视屏的概览 -->
<template>
  <div
    class="w-[280px] h-[100px] border border-gray-300 rounded-lg flex-col items-center justify-center mx-2 mb-2 cursor-pointer hover:bg-gray-100 text-xs p-2 overflow-scroll"
    @click="$emit('click')"
  >
    <div class="text-red-400">{{ file.inputPath }}</div>
    <div class="text-green-600">
      {{ computeRenameOutputPath(file.inputPath, scriptStore.globalRenameParameter.rules) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RenameParameter } from "@/core/task/rename";
import { useScriptStore } from "@/store";
import { computeRenameOutputPath } from "@/utils/rename";

defineProps<{
  file: RenameParameter;
}>();

defineEmits<{
  (e: "click"): void;
}>();

const scriptStore = useScriptStore();
</script>

<style scoped lang="scss"></style>
