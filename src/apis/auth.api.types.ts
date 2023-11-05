interface Role {
  name: string;
}

interface AuthUser {
  id: string,
  userName: string,
  email: string,
  roles: Role[]
}

interface loginResponse {
  token: string;
  refreshToken: string;
  user: AuthUser
}

interface loginRequest {
  email: string;
  password: string;
}

export type { loginResponse, loginRequest, AuthUser };
