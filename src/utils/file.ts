/**
 * 根据源文件文件名，生成输出文件路径
 * @param inputFilePath 输入文件路径
 * @param extra 额外添加到文件名中的字符串，默认 "ff"
 * @returns 输出文件路径
 */
export const getDefaultOutputFilePath = (inputFilePath: string, extra: string = "ff") => {
  // 在文件后缀前面加`extra`， 例如 `example.mp4` => `example.ff.mp4`
  const dotIndex = inputFilePath.lastIndexOf(".");
  if (dotIndex === -1) {
    return `${inputFilePath}.${extra}`;
  } else {
    const name = inputFilePath.substring(0, dotIndex);
    const ext = inputFilePath.substring(dotIndex); // 包含点
    return `${name}.${extra}${ext}`;
  }
};
