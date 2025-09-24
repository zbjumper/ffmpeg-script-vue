<script setup lang="ts">
import ScriptView from "@/views/scripts/ScriptView.vue";
import MainHeader from "@/views/MainHeader.vue";
</script>

<template>
  <el-container>
    <el-header><main-header></main-header></el-header>
    <el-main><script-view /></el-main>
    <!-- <el-footer>footer</el-footer> -->
  </el-container>
  <!-- <script-view /> -->
</template>

<style scoped></style>
