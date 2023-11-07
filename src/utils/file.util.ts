import UploadedFile from "@/types/commons/UploadedFile";
import type { UploadFile } from "antd";
import { difference } from "lodash";

const fileUtil = {
  transferAntFilesToOriAndUploadedFiles: (files: UploadFile[] = []): [string[], UploadedFile[]] => {
    // uid 為 rc-upload 開頭即 Antd Upload 產生的 id
    const newFiles = files.filter((file) => file.uid.startsWith("rc-upload"));
    const oriFiles = difference(files, newFiles);
    const oriFileIds = oriFiles.map((file) => file.uid);
    const uploadedFiles = newFiles
      .filter(({ status }) => status === "done")
      .map((file) => {
        return {
          oriFileName: file.name,
          tmpFileName: file.response?.fileName || "__client_unknown",
        };
      });
    return [oriFileIds, uploadedFiles];
  },
};

export default fileUtil;
