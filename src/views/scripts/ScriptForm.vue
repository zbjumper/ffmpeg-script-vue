<!-- 脚本表单 -->
<template>
  <div class="w-[640px]">
    <el-form>
      <el-form-item label="输入视频文件文件名">
        <el-input
          v-model="form.inputFileName"
          placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="输出视频文件文件名">
        <el-input
          v-model="form.outputFileName"
          placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="设定开始时间">
        <!-- <el-input
          v-model="form.outputFileName"
          placeholder="请输入文件名称"
        ></el-input> -->
        <div>
          <el-switch v-model="form.startTime.enable" />
          <template v-if="form.startTime.enable">
            <el-input-number
              v-model="form.startTime.hour"
              :min="0"
              :max="23"
              :disabled="!form.startTime.enable"
              placeholder="小时"
              size="small"
              class="ml-2"
            />
            :
            <el-input-number
              v-model="form.startTime.minute"
              :min="0"
              :max="59"
              :disabled="!form.startTime.enable"
              placeholder="分钟"
              size="small"
            />
            :
            <el-input-number
              v-model="form.startTime.second"
              :min="0"
              :max="59"
              :disabled="!form.startTime.enable"
              placeholder="秒"
              size="small"
            />
            .
            <el-input-number
              v-model="form.startTime.millisecond"
              :min="0"
              :max="999"
              :disabled="!form.startTime.enable"
              placeholder="毫秒"
              size="small"
            />
          </template>
        </div>
      </el-form-item>

      <!-- 当开始时间开启时，显示设定结束时间 -->
      <el-form-item label="设定结束时间" v-if="form.startTime.enable">
        <div>
          <el-switch v-model="form.endTime.enable" />
          <template v-if="form.endTime.enable">
            <el-input-number
              v-model="form.endTime.hour"
              :min="0"
              :max="23"
              :disabled="!form.endTime.enable"
              placeholder="小时"
              size="small"
              class="ml-2"
            />
            :
            <el-input-number
              v-model="form.endTime.minute"
              :min="0"
              :max="59"
              :disabled="!form.endTime.enable"
              placeholder="分钟"
              size="small"
            />
            :
            <el-input-number
              v-model="form.endTime.second"
              :min="0"
              :max="59"
              :disabled="!form.endTime.enable"
              placeholder="秒"
              size="small"
            />
            .
            <el-input-number
              v-model="form.endTime.millisecond"
              :min="0"
              :max="999"
              :disabled="!form.endTime.enable"
              placeholder="毫秒"
              size="small"
            />
          </template>
        </div>
      </el-form-item>
      <el-form-item label="CRF">
        <el-slider v-model="form.crf" min="18" max="28" show-input />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCopyScript">复制到剪切板</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div>{{ output }}</div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, reactive } from "vue";

const form = reactive({
  inputFileName: "",
  outputFileName: "",
  startTime: {
    enable: false,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  endTime: {
    enable: false,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  crf: 23,
});

const onCopyScript = () => {
  // 将命令拷贝到剪切板
  navigator.clipboard.writeText(output.value);
  ElMessage.success("已复制到剪切板");
};
const resetForm = () => {
  form.inputFileName = "";
  form.outputFileName = "";
  form.startTime.enable = false;
  form.startTime.hour = 0;
  form.startTime.minute = 0;
  form.startTime.second = 0;
  form.startTime.millisecond = 0;
  form.endTime.enable = false;
  form.endTime.hour = 0;
  form.endTime.minute = 0;
  form.endTime.second = 0;
  form.endTime.millisecond = 0;
};

const output = computed(() => {
  if (form.inputFileName || form.outputFileName) {
    let params = [
      `ffmpeg`,
      `-i "${form.inputFileName}"`,
      form.startTime.enable
        ? `-ss ${String(form.startTime.hour).padStart(2, "0")}:${String(
            form.startTime.minute
          ).padStart(2, "0")}:${String(form.startTime.second).padStart(
            2,
            "0"
          )}.${String(form.startTime.millisecond).padStart(3, "0")}`
        : null,
      // 只有开始时间开启且结束时间开启时，拼接 -to
      form.startTime.enable && form.endTime.enable
        ? `-to ${String(form.endTime.hour).padStart(2, "0")}:${String(
            form.endTime.minute
          ).padStart(2, "0")}:${String(form.endTime.second).padStart(
            2,
            "0"
          )}.${String(form.endTime.millisecond).padStart(3, "0")}`
        : null,
      `-c:v libx264`,
      `-preset slow`,
      `-crf ${form.crf}`,
      `-c:a aac`,
      `-b:a 128k`,
      `-y "${form.outputFileName}"`,
    ];

    return params.filter((item) => item != null).join(" ");
  } else {
    return "";
  }
});
</script>

<style scoped lang="scss"></style>
