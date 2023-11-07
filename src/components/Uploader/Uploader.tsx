import type { UploadProps } from "antd";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { FileMimeType, UploaderProps, UploadFileResponse } from "./Uploader.types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { isNil } from "lodash";
import { antdUtils } from "@/utils/antd.util";

export const FileType: FileMimeType = {
  JPEG: "image/jpeg",
  JPG: "image/jpg",
  PNG: "image/png",
  GIF: "image/gif",
};

const FileTypeKeyValueTransform = Object.entries(FileType).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const Uploader = ({
  name = "file",
  value = [],
  onChange,
  action,
  headers,
  uploadBtnText = "上傳",
  max,
  maxFileSize,
  allowedFileTypes,
}: UploaderProps) => {
  const user = useCurrentUser();

  const handleChange: UploadProps<UploadFileResponse>["onChange"] = ({ file, fileList }) => {
    if (file.status === "error") {
      antdUtils.message?.error(`${file.name} 上傳失敗`);
      return;
    }

    onChange && onChange(fileList);
  };

  return (
    <Upload
      name={name}
      fileList={value || []}
      onChange={handleChange}
      action={`${import.meta.env.VITE_APP_BASE_API}${action}`}
      headers={{
        ...(user?.token ? { authorization: "Bearer " + user?.token } : {}),
        ...headers,
      }}
      listType="picture-card"
      beforeUpload={(file) => {
        // 檔案大小限制
        if (!isNil(maxFileSize)) {
          if (file.size > maxFileSize) {
            antdUtils.message?.error(`檔案過大，請勿超過 ${maxFileSize / 1024} MB`);
            return Upload.LIST_IGNORE;
          }
        }

        // 檔案類型限制
        if (!isNil(allowedFileTypes)) {
          const fileType = file.type;
          if (!allowedFileTypes.includes(fileType)) {
            const allowedFileTypeKeys = allowedFileTypes.map((type) => FileTypeKeyValueTransform[type]);
            antdUtils.message?.error(`不允許的檔案格式，請上傳 ${allowedFileTypeKeys.join(", ")}`);
            return Upload.LIST_IGNORE;
          }
        }

        return true;
      }}
    >
      {/* {(isNil(max) || (value && value.filter((val) => val.status != "error").length < max)) && ( */}
      {(isNil(max) || value?.length < max) && (
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            {uploadBtnText}
          </div>
        </div>
      )}
    </Upload>
  );
};

export default Uploader;
