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
  startTime?: TimeModel;

  /**
   * 结束时间选择器是否启用
   */
  endTimeEnable: boolean;

  /**
   * 结束时间
   */
  endTime?: TimeModel;
}

interface TimeModel {
  hours: 0;
  minutes: 0;
  seconds: 0;
  milliseconds: 0;
}

interface ControlOptionsModel {
  id: string;
  /**
   * 手动添加
   */
  modelType: "control";
}

type FileListItemModel = SingleFileModel | ControlOptionsModel;

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
   * 清晰度
   */
  clarity: "default" | "720P" | "1080P";

  /**
   * 静默覆盖同名文件
   */
  overwrite: boolean;

  /**
   * 是否移除源文件
   */
  removeOrigin: boolean;
};

type VideoCodec = "libx264" | "libx265";
// | "libvpx-vp9"
// | "libaom-av1"
// | "mpeg4"
// | "h264_nvenc"
// | "hevc_nvenc"
// | "vp8_nvenc"
// | "vp9_nvenc"
// | "av1_nvenc";
