interface Role {
  id: string;
  name: string;
}

interface UserResponse {
  id: string;
  userName: string;
  email: string;
  roles: Role[];
}

interface getUsersResponse {
  items: UserResponse[];
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type { getUsersResponse, UserResponse as getUserResponse };
