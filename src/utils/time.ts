import type { TimePoint } from "@/core/basic";

/**
 * 将时间模型格式化为 FFmpeg 时间格式 (hh:mm:ss.SSS)
 * @param time 时间模型
 * @returns 格式化的时间字符串
 */
export const formatTime = (time?: TimePoint): string => {
  if (time) {
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds.toString().padStart(2, '0');
    const milliseconds = time.milliseconds.toString().padStart(3, '0');
    
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  } else {
    return "--:--:--.---";
  }
};

/**
 * 计算时间参数
 * @param start 开始时间
 * @param end 结束时间
 * @returns 时间参数字符串，如果 start 和 end 都为空则返回 null
 */
export const computeTimeOptions = (start?: TimePoint, end?: TimePoint): string | null => {
  // 如果 start 和 end 都为空，返回 null
  if (!start && !end) {
    return null;
  }
  
  // 如果只有 start 有值
  if (start && !end) {
    return `-ss ${formatTime(start)}`;
  }
  
  // 如果 start 和 end 都有值
  if (start && end) {
    return `-ss ${formatTime(start)} -to ${formatTime(end)}`;
  }
  
  // 如果只有 end 有值（这种情况根据需求不处理，返回 null）
  return null;
}