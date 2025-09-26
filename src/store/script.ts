import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { defaultGlobalOptions } from "@/constant";
import { computeTimeOptions } from "@/utils/time";
import { computeVideoSizeOptions } from "@/utils/video";

export const useScriptStore = defineStore("script", () => {
  const files = ref<SingleFileModel[]>([]);

  const globalOptions = ref<GlobalOptions>(defaultGlobalOptions);

  const reset = () => {
    files.value = [];
    globalOptions.value = defaultGlobalOptions;
  };

  const outputScript = computed(() => {
    // You may need to define startTimeEnable, endTimeEnable, startTime, endTime, crf, etc.
    // For now, only basic script generation is implemented.
    return files.value
      .filter((file) => file.modelType == "file")
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
          computeTimeOptions(
            file.startTimeEnable ? file.startTime : undefined,
            file.endTimeEnable ? file.endTime : undefined
          ),
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
