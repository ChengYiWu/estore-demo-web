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

interface CreateUserRequest {
  userName: string;
  email: string;
  password: string;
  roleNames: string[];
}

interface UpdateUserRequest {
  userName: string;
  roleNames: string[];
}

export type { getUsersResponse, UserResponse as getUserResponse, CreateUserRequest, UpdateUserRequest };
