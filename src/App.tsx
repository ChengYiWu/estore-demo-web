import { useState } from "react";
import { Alert, App as AntApp } from "antd";
import type { UploadFile } from "@components/Uploader";
import Uploader from "@components/Uploader";
import token from "@/tokens";
import UserTable from "./pages/User/AllUsers/AllUsers";
import AdminLayout from "./layouts/AdminLayout";
import "./global.css";
import Layout from "./layouts";

localStorage.setItem("token", token);

const ProductUploader = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "83285990-7b2b-467c-b2b9-03b9b427196b",
      name: "josh-gordon-pR166OP_l6g-unsplash.jpg",
      status: "done",
      thumbUrl: "https://estorefordev.blob.core.windows.net/files/tmp/83285990-7b2b-467c-b2b9-03b9b427196b.jpg",
    },
  ]);

  return <Uploader value={fileList} onChange={(fileList) => setFileList(fileList)} action="/products/upload" />;
};

function App() {
  return (
    <AntApp>
      {/* <Alert.ErrorBoundary message="Some Error Occure" description="call admin">
        <UserTable />
      </Alert.ErrorBoundary>
      <ProductUploader /> */}
      <Layout />
    </AntApp>
  );
}

export default App;
