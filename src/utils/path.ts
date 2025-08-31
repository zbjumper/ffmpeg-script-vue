
import path from 'path-browserify';

/**
 * 获取 targetFilePath 相对于 basePath 的相对路径
 * @param basePath 基路径，如 /Downloads/
 * @param targetFilePath 目标文件路径，如 /Downloads/output/target.mp4
 * @returns 相对路径，如 output/target.mp4
 */
export function getRelativePath(basePath: string, targetFilePath: string): string {
  return path.relative(basePath, targetFilePath);
}