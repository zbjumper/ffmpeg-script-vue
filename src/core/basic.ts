/**
 * 支持的视频编码格式
 */
export type VideoCodec = "copy" | "libx264" | "libx265";
// | "libvpx-vp9"
// | "libaom-av1"
// | "mpeg4"
// | "h264_nvenc"
// | "hevc_nvenc"
// | "vp8_nvenc"
// | "vp9_nvenc"
// | "av1_nvenc";

/**
 * 支持的音频编码格式
 */
export type AudioCodec = "copy" | "aac" | "mp3";

/**
 * 清晰度
 */
export type Clarity = "default" | "720P" | "1080P";

/**
 * 时间点
 */
export interface TimePoint {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}