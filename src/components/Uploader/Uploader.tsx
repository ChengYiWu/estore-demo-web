import type { UploadProps, UploadFile as AntUploadFile } from "antd";
import { Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

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

const Uploader = (props: UploaderProps) => {
  const { name = "file", value, onChange, action, headers } = props;

  // const props: UploadProps<UploadFileResponse> = {
  //   name: "file",
  //   action: "https://localhost:7061/api/products/upload",
  //   headers: {
  //     authorization: "Bearer " + localStorage.getItem("token"),
  //   },
  //   onChange({ file, fileList }) {
  //     if (file.status !== "uploading") {
  //       console.log(file, fileList);
  //     }
  //     if (file.status === "done") {
  //       message.success(`${file.name} file uploaded successfully`);
  //     }

  //     setFileList(fileList);
  //   },
  // };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange: UploadProps<UploadFileResponse>["onChange"] = ({ file, fileList }) => {
    if (file.status === "uploading") {
      console.info("uploading : ", { file, fileList, percent: file.percent });
    }

    if (file.status === "done") {
      console.info("done : ", { file, fileList });
    }

    if (file.status === "error") {
      console.error("error : ", { file, fileList });
    }

    onChange(fileList);

    console.log("oncahgne :>> ", { file, fileList });
  };

  return (
    <Upload
      name={name}
      fileList={value}
      onChange={handleChange}
      action={`${import.meta.env.VITE_APP_BASE_API}${action}`}
      headers={{
        authorization: "Bearer " + localStorage.getItem("token"),
        ...headers,
      }}
      listType="picture-card"
    >
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    </Upload>
  );
};

export default Uploader;
