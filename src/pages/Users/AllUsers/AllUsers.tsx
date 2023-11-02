import { UserApi } from "@/apis";
import { useEffect, useState } from "react";

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

const UserTable = () => {
  const [result, setResult] = useState<GetAllUsersResponse>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserApi.GetAllUsers();
        setResult(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <p>All Users</p>
      {result && JSON.stringify(result)}
    </div>
  );
};

export default UserTable;
