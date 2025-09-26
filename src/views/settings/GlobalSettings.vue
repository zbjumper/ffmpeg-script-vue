<!-- 全局设置样板 -->
<template>
  <el-row :gutter="0">
    <el-col :span="4">
      <el-menu
        mode="vertical"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        default-active="convert"
      >
        <el-menu-item index="convert">
          <span>转换参数</span>
        </el-menu-item>
        <el-menu-item index="snapshot">
          <span>截图参数</span>
        </el-menu-item>
        <el-menu-item index="concat">
          <span>拼接参数</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <template v-if="showPanel === 'convert'"><GlobalConvertSettings /></template>
      <template v-else-if="showPanel === 'snapshot'">截图参数设置面板</template>
      <template v-else-if="showPanel === 'concat'">拼接参数设置面板</template>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GlobalConvertSettings from '@/views/settings/items/GlobalConvertSettings.vue';

const showPanel = ref<'convert' | 'snapshot' | 'concat'>('convert');

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  showPanel.value = key as 'convert' | 'snapshot' | 'concat';
};
</script>

<style scoped lang="scss"></style>
