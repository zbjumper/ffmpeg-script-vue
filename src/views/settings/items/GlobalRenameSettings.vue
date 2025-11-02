<!-- “重命名参数”全局设置 -->
<template>
  <div>
    <el-form label-width="150px">
      <el-form-item label="替换规则">
        <div class="flex flex-col">
          <div v-for="(rule, index) in scriptStore.globalRenameParameter.rules" :key="index">
            <el-input v-model="rule.from" placeholder="请输入需要被替换的内容" />
            <el-input v-model="rule.to" placeholder="请输入替换后的内容" />
            <el-button @click="removeReplaceRule(index)">删除</el-button>
          </div>
          <el-button @click="addReplaceRule">添加替换规则</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useScriptStore } from "@/store";
import { ElForm, ElFormItem, ElButton, ElInput } from "element-plus";

defineOptions({
  name: "GlobalRenameSettings",
});

const scriptStore = useScriptStore();

const addReplaceRule = () => {
  scriptStore.globalRenameParameter.rules.push({ from: "", to: "" });
};

const removeReplaceRule = (index: number) => {
  scriptStore.globalRenameParameter.rules.splice(index, 1);
};
</script>

<style scoped lang="scss"></style>
