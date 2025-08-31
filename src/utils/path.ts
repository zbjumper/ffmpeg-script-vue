
/**
 * 简单的路径工具函数，适用于浏览器环境
 */

/**
 * 检查路径是否为绝对路径
 * @param filepath 文件路径
 * @returns 是否为绝对路径
 */
export function isAbsolute(filepath: string): boolean {
  // Unix/Linux/macOS 绝对路径以 / 开头
  // Windows 绝对路径以驱动器字母开头，如 C:
  return /^([a-zA-Z]:|\/)/.test(filepath);
}

/**
 * 规范化路径，移除多余的斜杠和点
 * @param filepath 文件路径
 * @returns 规范化后的路径
 */
export function normalize(filepath: string): string {
  const isAbsolutePath = isAbsolute(filepath);
  const segments = filepath.split(/[\/\\]+/).filter(segment => segment !== '' && segment !== '.');
  
  const normalizedSegments: string[] = [];
  
  for (const segment of segments) {
    if (segment === '..') {
      if (normalizedSegments.length > 0 && normalizedSegments[normalizedSegments.length - 1] !== '..') {
        normalizedSegments.pop();
      } else if (!isAbsolutePath) {
        normalizedSegments.push('..');
      }
    } else {
      normalizedSegments.push(segment);
    }
  }
  
  let result = normalizedSegments.join('/');
  
  if (isAbsolutePath) {
    result = '/' + result;
  }
  
  return result || '.';
}

/**
 * 获取 targetFilePath 相对于 basePath 的相对路径
 * @param basePath 基路径，如 /Downloads/
 * @param targetFilePath 目标文件路径，如 /Downloads/output/target.mp4
 * @returns 相对路径，如 output/target.mp4
 */
export function getRelativePath(basePath: string, targetFilePath: string): string {
  const normalizedBase = normalize(basePath);
  const normalizedTarget = normalize(targetFilePath);
  
  // 如果目标路径不是绝对路径，直接返回
  if (!isAbsolute(normalizedTarget)) {
    return normalizedTarget;
  }
  
  // 如果基路径不是绝对路径，无法计算相对路径
  if (!isAbsolute(normalizedBase)) {
    return normalizedTarget;
  }
  
  const baseSegments = normalizedBase.split('/').filter(s => s !== '');
  const targetSegments = normalizedTarget.split('/').filter(s => s !== '');
  
  // 找到共同的前缀
  let commonLength = 0;
  while (
    commonLength < baseSegments.length &&
    commonLength < targetSegments.length &&
    baseSegments[commonLength] === targetSegments[commonLength]
  ) {
    commonLength++;
  }
  
  // 计算需要向上的层数
  const upLevels = baseSegments.length - commonLength;
  
  // 构建相对路径
  const upParts = Array(upLevels).fill('..');
  const downParts = targetSegments.slice(commonLength);
  
  const relativeParts = [...upParts, ...downParts];
  
  return relativeParts.length > 0 ? relativeParts.join('/') : '.';
}