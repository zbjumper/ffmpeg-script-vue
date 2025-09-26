<!-- 时间选择器 -->
<template>
  <div class="flex items-center">
    <el-input-number
      v-model="modelValue.hours"
      :min="0"
      :max="23"
      placeholder="小时"
      size="small"
      class="ml-2"
    />
    :
    <el-input-number
      v-model="modelValue.minutes"
      :min="0"
      :max="59"
      placeholder="分钟"
      size="small"
    />
    :
    <el-input-number
      v-model="modelValue.seconds"
      :min="0"
      :max="59"
      placeholder="秒"
      size="small"
    />
    .
    <el-input-number
      v-model="modelValue.milliseconds"
      :min="0"
      :max="999"
      placeholder="毫秒"
      size="small"
    />
  </div>
</template>

<script setup lang="ts">


defineProps<{
  modelValue: TimePoint;
}>();
</script>

<style scoped lang="scss"></style>
