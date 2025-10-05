import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { defaultConvertGlobalParameter } from "@/constant";
import { computeTimeOptions } from "@/utils/time";
import { computeVideoSizeOptions } from "@/utils/video";
import type { GlobalConvertParameter, TaskSingleton } from "@/core/task";
import { match } from "ts-pattern";

export const useScriptStore = defineStore("script", () => {
  const tasks = ref<TaskSingleton[]>([]);

  const globalConvertParameter = ref<GlobalConvertParameter>(defaultConvertGlobalParameter);

  const reset = () => {
    tasks.value = [];
    globalConvertParameter.value = defaultConvertGlobalParameter;
  };

  const outputScript = computed(() => {
    const shells = tasks.value.map((singleton) => {
      return match(singleton)
        .with({ type: "convert" }, (convertTask) => {
          return [
            [
              `ffmpeg`,
              computeTimeOptions(convertTask.startTime, convertTask.endTime),
              `-i "${convertTask.inputPath}"`,
              computeVideoSizeOptions(globalConvertParameter.value.clarity),
              `-c:v ${globalConvertParameter.value.videoCodec}`,
              `-preset slow`,
              `-crf ${globalConvertParameter.value.crf}`,
              `-c:a ${globalConvertParameter.value.audioCodec}`,
              `-b:a 128k`,
              globalConvertParameter.value.overwrite ? `-y` : null,
              `"${convertTask.outputPath}"`,
            ]
              .filter((item) => item != null)
              .join(" "),
            globalConvertParameter.value.removeOrigin ? `rm "${convertTask.inputPath}"` : null,
          ]
            .filter((item) => item != null)
            .flatMap((item) => item!)
            .join(" && ");
        })
        .exhaustive();
    });

    return shells.join(" && ");
  });

  return {
    tasks,
    globalConvertParameter,
    outputScript,
    reset,
  };
});
