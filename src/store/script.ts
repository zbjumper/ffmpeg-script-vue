import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { defaultConvertGlobalParameter, defaultRenameGlobalParameter } from "@/constant";
import { computeTimeOptions } from "@/utils/time";
import { computeVideoSizeOptions } from "@/utils/video";
import type { GlobalConvertParameter, SingletonTask } from "@/core/task";
import { match, P } from "ts-pattern";
import type { GlobalRenameParameter } from "@/core/task/rename";
import { computeRenameOutputPath } from "@/utils/rename";

export const useScriptStore = defineStore("script", () => {
  const tasks = ref<SingletonTask[]>([]);

  const globalConvertParameter = ref<GlobalConvertParameter>(defaultConvertGlobalParameter);
  const globalRenameParameter = ref<GlobalRenameParameter>(defaultRenameGlobalParameter);

  const reset = () => {
    tasks.value = [];
    globalConvertParameter.value = defaultConvertGlobalParameter;
    globalRenameParameter.value = defaultRenameGlobalParameter;
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
        .with({ type: "rename" }, (renameTask) => {
          let result = match(renameTask)
            .with({ rules: P.array() }, (task) =>
              computeRenameOutputPath(renameTask.inputPath, task.rules)
            )
            .otherwise(() => renameTask.inputPath);
          return `mv "${renameTask.inputPath}" "${result}"`;
        })
        .exhaustive();
    });

    return shells.join(" && ");
  });

  return {
    tasks,
    globalConvertParameter,
    globalRenameParameter,
    outputScript,
    reset,
  };
});
