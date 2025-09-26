interface SingleFileModel {
  id: string;

  modelType: "file";

  /**
   * 输入文件路径
   */
  inputPath: string;

  /**
   * 输出文件路径
   */
  outputPath: string;

  /**
   * 开始时间选择器是否启用
   */
  startTimeEnable: boolean;

  /**
   * 开始时间
   */
  startTime?: TimePoint;

  /**
   * 结束时间选择器是否启用
   */
  endTimeEnable: boolean;

  /**
   * 结束时间
   */
  endTime?: TimePoint;
}

/**
 * 全局参数
 */
type GlobalOptions = {
  /**
   * 视频参数
   */
  crf: number;

  /**
   * 视频编码器
   */
  videoCodec: VideoCodec;

  /**
   * 音频编码器
   */
  audioCodec: AudioCodec;

  /**
   * 清晰度
   */
  clarity: Clarity;

  /**
   * 静默覆盖同名文件
   */
  overwrite: boolean;

  /**
   * 是否移除源文件
   */
  removeOrigin: boolean;
};
