/**
 * 全局转换参数
 */
type GlobalConvertOptions = {
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
}