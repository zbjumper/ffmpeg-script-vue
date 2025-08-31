import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { v4 as uuid } from "uuid";

export const useScriptStore = defineStore("script", () => {
  const files = ref<FileListItemModel[]>([
    { id: uuid(), modelType: "control" },
  ]);

  const commonOptions = ref<CommonOptions>({
    crf: 23,
    videoCodec: "libx264",
  });

  const reset = () => {
    files.value = [{ id: uuid(), modelType: "control" }];
    commonOptions.value = { crf: 23, videoCodec: "libx264" };
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
          `-c:v ${file.commonOptions?.videoCodec || commonOptions.value.videoCodec}`,
          `-preset slow`,
          `-crf ${commonOptions.value.crf}`,
          `-c:a aac`,
          `-b:a 128k`,
          `-y "${file.outputPath}"`,
        ];

        let shells = [params.join(" ")];
        if (file.removeOrigin) {
          shells.push(`rm "${file.inputPath}"`);
        }
        return shells.join(" && ");
      })
      .join(" && ");
  });

  return {
    files,
    commonOptions,
    outputScript,
    reset,
  };
});
