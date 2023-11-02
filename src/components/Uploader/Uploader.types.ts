import type { UploadFile as AntUploadFile } from "antd";

export interface UploadFileResponse {
  uniqId: string;
  oriFileName: string;
  fileName: string;
  uri: string;
}

export interface UploadFile<T extends UploadFileResponse = UploadFileResponse> extends AntUploadFile<T> {}

export interface UploaderProps {
  name?: string;
  action: string;
  headers?: Record<string, string>;
  value: UploadFile[];
  onChange: (value: UploadFile[]) => void;
}
