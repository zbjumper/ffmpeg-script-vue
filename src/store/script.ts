import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { v4 as uuid } from "uuid";

export const useScriptStore = defineStore("script", () => {
  const files = ref<FileListItemModel[]>([
    { id: uuid(), modelType: "control" },
  ]);

  const globalOptions = ref<GlobalOptions>({
    crf: 23,
    videoCodec: "libx264",
    overwrite: true,
    removeOrigin: false,
  });

  const reset = () => {
    files.value = [{ id: uuid(), modelType: "control" }];
    globalOptions.value = {
      crf: 23,
      videoCodec: "libx264",
      overwrite: false,
      removeOrigin: false,
    };
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
          `-c:v ${globalOptions.value.videoCodec}`,
          `-preset slow`,
          `-crf ${globalOptions.value.crf}`,
          `-c:a aac`,
          `-b:a 128k`,
          globalOptions.value.overwrite ? `-y` : null,
          `"${file.outputPath}"`,
        ];
        console.info(params);

        let shells = [params.filter((item) => item != null).join(" ")];
        if (
          globalOptions.value.removeOrigin
        ) {
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
