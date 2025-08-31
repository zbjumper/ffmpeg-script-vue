interface Window {
  /**
   * 显示一个允许用户选择一个目录的目录选择器
   * @param options 参数
   */
  showDirectoryPicker(
    options: ShowDirectoryPickerOptions
  ): Promise<FileSystemDirectoryHandle>;

  showOpenFilePicker(
    options: ShowOpenFilePickerOptions
  ): Promise<FileSystemFileHandle[]>;
}

type ShowDirectoryPickerOptions = {
  startIn?:
    | "desktop"
    | "documents"
    | "downloads"
    | "music"
    | "pictures"
    | "videos";
  mode?: "readwrite" | "read";
  id?: string;
};

type ShowOpenFilePickerOptions = {
  id?: string;
  multiple?: boolean;
  startIn?:
    | "desktop"
    | "documents"
    | "downloads"
    | "music"
    | "pictures"
    | "videos";
  types?: Array<{
    description: string;
    accept: {
      // "image/*": string[];
      // "text/*": string[];
      "application/*": string[];
      // "video/*": string[];
      // "audio/*": string[];
      // "application/pdf": string[];
      // "application/zip": string[];
      // "application/x-zip-compressed": string[];
      // "application/x-zip": string[];
      // "application/x-zip-compressed": string[];
      // "application/x-compress": string[];
      // "application/x-compressed": string[];
      // "application/x-compress-zip": string[];
      // "application/x-compress-zip-compressed": string[];
      // "application/x-compress-zip-compressed": string[];
      // "application/x-compress-zip-compressed": string[];
    };
  }>;
};
