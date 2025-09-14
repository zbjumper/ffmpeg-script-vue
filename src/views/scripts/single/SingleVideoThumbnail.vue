<!-- 单个视屏的概览 -->
<template>
  <div
    class="w-[280px] h-[100px] border border-gray-300 rounded-lg flex-col items-center justify-center mx-2 mb-2 cursor-pointer hover:bg-gray-100 text-xs p-2 overflow-scroll"
    @click="$emit('click')"
  >
    <div class="text-red-400">{{ file.inputPath }}</div>
    <div class="text-green-600">{{ file.outputPath }}</div>
    <div v-if="(file.startTimeEnable && file.startTime) || (file.endTimeEnable && file.endTime)">
      {{ formatTime(file.startTime) }}&nbsp;<->&nbsp;{{ formatTime(file.endTime) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from "@/utils/time";

defineProps<{
  file: SingleFileModel;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style scoped lang="scss"></style>
