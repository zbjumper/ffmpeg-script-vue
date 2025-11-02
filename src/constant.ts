import type { GlobalConvertParameter } from "@/core/task";
import type { GlobalRenameParameter } from "./core/task/rename";

/**
 * 转换任务，默认全局参数
 */
export const defaultConvertGlobalParameter: GlobalConvertParameter = {
  type: "convert",
  crf: 23,
  videoCodec: "copy",
  overwrite: true,
  removeOrigin: false,
  clarity: "default",
  audioCodec: "copy",
};

export const defaultRenameGlobalParameter: GlobalRenameParameter = {
  type: "rename",
  rules: [],
};
