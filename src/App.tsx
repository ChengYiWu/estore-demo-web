import { useEffect, useState } from "react";
import Uploader, { UploadFile } from "./components/Uploader/Uploader";
import "./App.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NzVhYzRmZC1hM2E0LTQ0NmMtOWEyYS1jNWFjM2RhMmIzNjMiLCJuYW1lIjoiQ2hyaXNBZG1pbiIsImVtYWlsIjoiY2hyaXNAZXhhbXBsZS5jb20iLCJleHAiOjE3Mjk3NDgxNzMsImp0aSI6IjZjZmRiOTkxLTUwYTAtNGI5YS1hNjYzLTRiNjAwNzA2ZjkxOCIsIm5iZiI6MTY5ODIxMjE3MywiaWF0IjoxNjk4MjEyMTczLCJpc3MiOiJFU3RvcmVEZW1vIn0.aPVnqt5fqn7qumNQJ7Yp2Qu_6UBZfV_c2vDtqqDCc_I";

interface GetAllUsersResponse {
  items: [
    {
      id: string;
      userName: string;
      email: string;
      roles: [
        {
          name: string;
        },
      ];
    },
  ];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

localStorage.setItem("token", token);

const UserTable = () => {
  const [result, setResult] = useState<GetAllUsersResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://localhost:7061/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(await response.json());
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>All Users</p>
      {result && JSON.stringify(result)}
    </div>
  );
};

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
      <UserTable />
      <ProductUploader />
    </>
  );
}

export default App;
