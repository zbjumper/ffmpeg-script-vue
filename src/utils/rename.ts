/**
 * 计算重命名输出路径
 * 
 * 根据提供的重命名规则，生成一个包含sed命令的shell表达式，用于对输入路径进行批量重命名操作。
 * 该函数会将输入路径和替换规则组合成一个可执行的shell命令字符串。
 * 
 * @param inputPath - 输入文件路径
 * @param rules - 重命名规则数组，每个规则包含from（源模式）和to（目标模式）字段
 * @param rules.from - 需要被替换的正则表达式模式
 * @param rules.to - 替换后的目标字符串
 * @returns 返回包含sed命令的shell表达式字符串，用于执行路径重命名
 * 
 * @example
 * ```typescript
 * const rules = [
 *   { from: 'old', to: 'new' },
 *   { from: '\\d+', to: 'number' }
 * ];
 * const result = computeRenameOutputPath('/path/to/old_file123.txt', rules);
 * // 返回: $(echo $(echo "/path/to/old_file123.txt" | sed -E 's/old/new/g') | sed -E 's/\d+/number/g')
 * ```
 */
export const computeRenameOutputPath = (
  inputPath: string,
  rules: { from: string; to: string }[]
): string => {
  let outputPathExpression = `${inputPath}`;
  rules.forEach((rule) => {
    outputPathExpression = outputPathExpression.replace(rule.from, rule.to);
  });
  return outputPathExpression;
};