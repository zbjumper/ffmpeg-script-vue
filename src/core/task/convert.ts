import type { AudioCodec, TimePoint, VideoCodec } from "@/core/basic";

export type GlobalConvertParameter = {
  type: "convert";
  /**
   * 视频编码器
   */
  videoCodec: VideoCodec;

  /**
   * 视频质量，默认 23，范围 0-51，值越小质量越好，文件越大
   */
  crf: number;

  /**
   * 视频清晰度
   */
  clarity: "default" | "720P" | "1080P";

  /**
   * 音频编码器
   */
  audioCodec: AudioCodec;

  /**
   * 是否覆盖输出文件
   */
  overwrite: boolean;

  /**
   * 是否删除源文件
   */
  removeOrigin: boolean;
};

/**
 * 转换任务需要的参数
 */
export type ConvertParameter = Partial<GlobalConvertParameter> & {
  /**
   * 文件输入路径
   */
  inputPath: string;

  /**
   * 文件输出路径
   */
  outputPath: string;

  /**
   * 开始时间，单位毫秒
   */
  startTime?: TimePoint;

  /**
   * 结束时间，单位毫秒
   */
  endTime?: TimePoint;
};

/**
 * 转换任务
 */
export type ConvertTask = ConvertParameter & {
  id: string;

  /**
   * 任务类型为转换
   */
  type: "convert";
};
