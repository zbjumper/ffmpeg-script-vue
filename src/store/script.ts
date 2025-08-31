import { getRelativePath } from "@/utils/path";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useScriptStore = defineStore("script", () => {
  const cwd = ref("");
  const inputFileName = ref("");
  const outputFileName = ref("");

  const startTimeEnable = ref(false);
  const startTime = ref<TimeModel>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const endTimeEnable = ref(false);
  const endTime = ref<TimeModel>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const crf = ref(23);

  const reset = () => {
    inputFileName.value = "";
    outputFileName.value = "";
    startTimeEnable.value = false;
    startTime.value = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    endTimeEnable.value = false;
    endTime.value = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    crf.value = 23;
  };

  const outputScript = computed(() => {
    if (inputFileName.value || outputFileName.value) {
      let params = [
        `ffmpeg`,
        `-i "${getRelativePath(cwd.value, inputFileName.value)}"`,
        startTimeEnable.value
          ? `-ss ${String(startTime.value.hours).padStart(2, "0")}:${String(
              startTime.value.minutes
            ).padStart(2, "0")}:${String(startTime.value.seconds).padStart(
              2,
              "0"
            )}.${String(startTime.value.milliseconds).padStart(3, "0")}`
          : null,
        // 只有开始时间开启且结束时间开启时，拼接 -to
        startTimeEnable.value && endTimeEnable.value
          ? `-to ${String(endTime.value.hours).padStart(2, "0")}:${String(
              endTime.value.minutes
            ).padStart(2, "0")}:${String(endTime.value.seconds).padStart(
              2,
              "0"
            )}.${String(endTime.value.milliseconds).padStart(3, "0")}`
          : null,
        `-c:v libx264`,
        `-preset slow`,
        `-crf ${crf.value}`,
        `-c:a aac`,
        `-b:a 128k`,
        `-y "${outputFileName.value}"`,
      ];

      return params.filter((item) => item != null).join(" ");
    } else {
      return "";
    }
  });

  const onSelectCwd = (newCwd: string) => {
    cwd.value = newCwd;
  }

  return {
    cwd,
    inputFileName,
    outputFileName,
    startTimeEnable,
    startTime,
    endTimeEnable,
    endTime,
    crf,
    outputScript,
    reset,
    onSelectCwd,
  };
});
