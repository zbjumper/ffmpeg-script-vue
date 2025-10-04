import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { defaultConvertGlobalParameter } from "@/constant";
import { computeTimeOptions } from "@/utils/time";
import { computeVideoSizeOptions } from "@/utils/video";
import type { GlobalConvertParameter, TaskSingleton } from "@/core/task";

export const useScriptStore = defineStore("script", () => {
  const files = ref<TaskSingleton[]>([]);

  const globalOptions = ref<GlobalConvertParameter>(defaultConvertGlobalParameter);

  const reset = () => {
    files.value = [];
    globalOptions.value = defaultConvertGlobalParameter;
  };

  const outputScript = computed(() => {
    // You may need to define startTimeEnable, endTimeEnable, startTime, endTime, crf, etc.
    // For now, only basic script generation is implemented.
    return files.value
      .map((file) => {
        let params = [
          `ffmpeg`,
          `-i "${file.inputPath}"`,
          computeVideoSizeOptions(globalOptions.value.clarity),
          `-c:v ${globalOptions.value.videoCodec}`,
          `-preset slow`,
          `-crf ${globalOptions.value.crf}`,
          `-c:a ${globalOptions.value.audioCodec}`,
          `-b:a 128k`,
          computeTimeOptions(file.startTime, file.endTime),
          globalOptions.value.overwrite ? `-y` : null,
          `"${file.outputPath}"`,
        ];
        console.info(params);

        let shells = [params.filter((item) => item != null).join(" ")];
        if (globalOptions.value.removeOrigin) {
          shells.push(`rm "${file.inputPath}"`);
        }
        return shells.join(" && ");
      })
      .join(" && ");
  });

  return {
    files,
    globalOptions,
    outputScript,
    reset,
  };
});
