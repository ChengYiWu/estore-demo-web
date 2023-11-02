import { useState } from "react";
import { Alert } from "antd";
import type { UploadFile } from "@components/Uploader";
import Uploader from "@components/Uploader";
import Layout from "./Layout";
import token from "@/tokens";
import UserTable from "./pages/Users/AllUsers/AllUsers";

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
    <>
      {/* <Alert.ErrorBoundary message="Some Error Occure" description="call admin">
        <UserTable />
      </Alert.ErrorBoundary>
      <ProductUploader /> */}
      <Layout />
    </>
  );
}

export default App;
