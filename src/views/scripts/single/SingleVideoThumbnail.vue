<!-- 单个视屏的概览 -->
<template>
  <div
    class="w-[280px] h-[100px] border border-gray-300 rounded-lg flex-col items-center justify-center mx-2 cursor-pointer hover:bg-gray-100 text-xs p-2 overflow-scroll"
    @click="$emit('click')"
  >
    <div class="text-red-400">{{ file.inputPath }} </div>
    <div class="text-green-600">{{ file.outputPath }}</div>
    <div v-if="file.startTime || file.endTime">
      {{
        file.startTime
          ? `${file.startTime.hours
              .toString()
              .padStart(2, "0")}:${file.startTime.minutes
              .toString()
              .padStart(2, "0")}:${file.startTime.seconds
              .toString()
              .padStart(2, "0")}.${file.startTime.milliseconds
              .toString()
              .padStart(3, "0")}`
          : "--:--:--.---"
      }}&nbsp;-&nbsp;{{
        file.endTime
          ? `${file.endTime.hours
              .toString()
              .padStart(2, "0")}:${file.endTime.minutes
              .toString()
              .padStart(2, "0")}:${file.endTime.seconds
              .toString()
              .padStart(2, "0")}.${file.endTime.milliseconds
              .toString()
              .padStart(3, "0")}`
          : "--:--:--.---"
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  file: SingleFileModel;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style scoped lang="scss"></style>
