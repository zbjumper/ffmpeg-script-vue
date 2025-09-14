export const computeVideoSizeOptions = (
  clarity: "default" | "720P" | "1080P"
): string | null => {
  switch (clarity) {
    case "720P":
      return "-vf scale=-2:720";
    case "1080P":
      return "-vf scale=-2:1080";
    default:
      return null;
  }
};
