import type { UploadFile as AntUploadFile } from "antd";

interface UploadFileResponse {
  uniqId: string;
  oriFileName: string;
  fileName: string;
  uri: string;
}

interface UploadFile<T extends UploadFileResponse = UploadFileResponse> extends AntUploadFile<T> {}

interface UploaderProps {
  name?: string;
  action: string;
  headers?: Record<string, string>;
  value?: UploadFile[];
  onChange?: (value: UploadFile[]) => void;
  uploadBtnText?: string;
  max?: number;
  maxFileSize?: number; // Byte
  allowedFileTypes?: string[];
}

type FileMimeType = {
  JPEG: string;
  JPG: string;
  PNG: string;
  GIF: string;
}

export type { UploadFileResponse, UploadFile, UploaderProps, FileMimeType };
