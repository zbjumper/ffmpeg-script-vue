type VideoCodec = "copy" | "libx264" | "libx265";
// | "libvpx-vp9"
// | "libaom-av1"
// | "mpeg4"
// | "h264_nvenc"
// | "hevc_nvenc"
// | "vp8_nvenc"
// | "vp9_nvenc"
// | "av1_nvenc";

type AudioCodec = "copy" | "aac" | "mp3";

type Clarity = "default" | "720P" | "1080P";

/**
 * 时间点
 */
interface TimePoint {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}