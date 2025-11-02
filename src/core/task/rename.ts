export type ReplaceRule = {
  /**
   * 需要被替换的内容，支持正则表达式
   */
  from: string;

  /**
   * 替换后的内容
   */
  to: string;
}

/**
 * 全局重命名参数
 */
export type GlobalRenameParameter = {
  type: "rename";
  rules: ReplaceRule[];
}

/**
 * 重命名任务需要的参数
 */
export type RenameParameter = Partial<GlobalRenameParameter> & {
  /**
   * 文件输入路径
   */
  inputPath: string;

  // /**
  //  * 文件输出路径
  //  */
  // outputPath: string;
};

/**
 * 重命名任务
 */
export type RenameTask = RenameParameter & {
  id: string;

  type: "rename";
};