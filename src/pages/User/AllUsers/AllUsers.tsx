import { Skeleton } from "antd";
import useUsers from "./useUsers";

const UserTable = () => {
  const { isError, error, isLoading, data } = useUsers();

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <div>
      <p>All Users</p>
      {isLoading ? (
        <Skeleton paragraph />
      ) : (
        <ul>
          {data?.items.map((user) => (
            <li key={user.id}>{user.userName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTable;
