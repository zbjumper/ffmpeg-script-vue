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

  /**
   * 是否移除原文件
   */
  removeOrigin: boolean;
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

type CommonOptions = {
  crf: number;
}